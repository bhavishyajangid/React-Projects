import { Client, Databases, ID, Query } from "appwrite";
import conf from "../config/config";
import storageService from "./storage";


class ProductService {
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
    }


    // ===========================
    // Create Product (Images First, then DB)
    // ===========================

    async createProduct({ images, productName, description, category, subCategory, sellingPrice, productPrice, inventory, sizes, bestseller }) {

        // Step 1: Filter out null/empty slots — only keep actual File objects
        const validFiles = images.filter((img) => img !== null && img instanceof File);

        if (validFiles.length === 0) {
            throw new Error("At least one image is required");
        }

        // Step 2: Upload all images to the bucket
        const uploadedFiles = []; // track successfully uploaded file IDs for cleanup

        try {
            for (const file of validFiles) {
                const uploaded = await storageService.uploadImage(file);
                uploadedFiles.push(uploaded.$id);
            }
        } catch (error) {
            // Some images failed — clean up any that were already uploaded
            console.error("Image upload failed:", error);

            await this._cleanupImages(uploadedFiles);

            throw new Error(error.message || "Failed to upload images. Product was not saved.");
        }


        // Step 3: Build the image URL array from uploaded file IDs
        const imageUrls = uploadedFiles.map((fileId) => {
            const url = storageService.getImageView(fileId);
            return String(url);
        });


        // Step 4: Save the product to the database
        try {
            const product = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                ID.unique(),
                {
                    productName,
                    description,
                    category,
                    subCategory,
                    sellingPrice,
                    productPrice,
                    inventory,
                    sizes,
                    bestseller,
                    images: imageUrls,
                }
            );

            return product;

        } catch (error) {
            // DB save failed — clean up all uploaded images so we don't leave orphans
            console.error("Database save failed:", error);

            await this._cleanupImages(uploadedFiles);

            throw new Error(error.message || "Failed to save product to database. Uploaded images have been cleaned up.");
        }
    }


    // ===========================
    // Update Product
    // ===========================

    async updateProduct(productId, { images, productName, description, category, subCategory, sellingPrice, productPrice, inventory, sizes, bestseller }, oldImageUrls = []) {

        const newUploadedFileIds = [];
        const finalImageUrls = [];

        try {
            // Process each image slot
            for (const img of images) {
                if (img instanceof File) {
                    // New file — upload it
                    const uploaded = await storageService.uploadImage(img);
                    newUploadedFileIds.push(uploaded.$id);

                    const url = storageService.getImageView(uploaded.$id);
                    finalImageUrls.push(String(url));

                } else if (typeof img === "string" && img.length > 0) {
                    // Existing URL — keep it
                    finalImageUrls.push(img);

                }
                // null/empty slots are skipped
            }
        } catch (error) {
            console.error("Image upload failed during update:", error);

            await this._cleanupImages(newUploadedFileIds);

            throw new Error(error.message || "Failed to upload new images. Product was not updated.");
        }


        // Save updated product to database
        try {
            const product = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                productId,
                {
                    productName,
                    description,
                    category,
                    subCategory,
                    sellingPrice,
                    productPrice,
                    inventory,
                    sizes,
                    bestseller,
                    images: finalImageUrls,
                }
            );

            // Success — delete old images that were replaced
            const replacedUrls = oldImageUrls.filter((url) => !finalImageUrls.includes(url));
            const replacedFileIds = replacedUrls.map((url) => this._extractFileIdFromUrl(url)).filter(Boolean);

            await this._cleanupImages(replacedFileIds);

            return product;

        } catch (error) {
            console.error("Database update failed:", error);

            // Clean up newly uploaded images since DB update failed
            await this._cleanupImages(newUploadedFileIds);

            throw new Error(error.message || "Failed to update product. New images have been cleaned up.");
        }
    }


    // ===========================
    // Delete Product
    // ===========================

    async deleteProduct(productId) {
        try {
            // First get the product to know which images to delete
            const product = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                productId
            );

            // Delete the document from DB
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                productId
            );

            // Clean up associated images from the bucket
            if (product.images && product.images.length > 0) {
                const fileIds = product.images
                    .map((url) => this._extractFileIdFromUrl(url))
                    .filter(Boolean);

                await this._cleanupImages(fileIds);
            }

            return true;

        } catch (error) {
            console.error("Delete Product Error:", error);
            throw new Error(error.message || "Failed to delete product");
        }
    }


    // ===========================
    // Get Single Product
    // ===========================

    async getProduct(productId) {
        try {
            const product = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                productId
            );

            return product;
        } catch (error) {
            console.error("Get Product Error:", error);
            throw new Error(error.message || "Failed to fetch product");
        }
    }


    // ===========================
    // Get All Products
    // ===========================

    async getAllProducts(queries = []) {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                queries
            );

            return response;
        } catch (error) {
            console.error("List Products Error:", error);
            throw new Error(error.message || "Failed to fetch products");
        }
    }


    // ===========================
    // Get Bestseller Products
    // ===========================

    async getBestsellerProducts(limit = 10) {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                [
                    Query.equal("bestseller", true),
                    Query.limit(limit),
                ]
            );

            return response.documents;
        } catch (error) {
            console.error("Bestseller Products Error:", error);
            throw new Error(error.message || "Failed to fetch bestseller products");
        }
    }


    // ===========================
    // Get Total Product Count
    // ===========================

    async getTotalProductCount() {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProductCollectionId,
                [Query.limit(1)]
            );

            return response.total ?? 0;
        } catch (error) {
            console.error("Product Count Error:", error);
            return 0;
        }
    }


    // ===========================
    // Helper: Cleanup uploaded images
    // ===========================

    async _cleanupImages(fileIds) {
        for (const fileId of fileIds) {
            try {
                await storageService.deleteImage(fileId);
            } catch (cleanupError) {
                console.warn(`Failed to cleanup image ${fileId}:`, cleanupError.message);
                // Don't throw — best effort cleanup
            }
        }
    }


    // ===========================
    // Helper: Extract file ID from Appwrite URL
    // ===========================

    _extractFileIdFromUrl(url) {
        try {
            // Appwrite file view URLs look like:
            // https://cloud.appwrite.io/v1/storage/buckets/{bucketId}/files/{fileId}/view
            const parts = url.split("/files/");
            if (parts.length > 1) {
                return parts[1].split("/")[0];
            }
            return null;
        } catch {
            return null;
        }
    }
}


const productService = new ProductService();

export default productService;
