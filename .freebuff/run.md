# E-commerce Dev Server

## How to reproduce the artifacts

1. Ensure `.env` exists in the project root with the required keys:
   - `VITE_APPWRITE_URL`
   - `VITE_APPWRITE_PROJECT_ID`
   - `VITE_APPWRITE_DATABASE_ID`
   - `VITE_APPWRITE_CART_COLLECTION_ID`
   - `VITE_APPWRITE_AUTHDB_COLLECTION_ID`
   - `VITE_APPWRITE_PRODUCT_COLLECTION_ID`
   - `VITE_APPWRITE_ORDERS_COLLECTION_ID`
   - `VITE_APPWRITE_BUCKET_ID`

   Copy from a working checkout if needed.

2. Dependencies are already installed in `node_modules/`. If missing, run:
   ```
   cd E-commerce
   npm install
   ```

## How to run the server

```
cd E-commerce
npx vite --host 0.0.0.0
```

The server starts on **http://localhost:5173** by default. Logs are written to `.freebuff/preview-*.log`.
