import conf from "../config/config";

export async function validateAdminPassword(email, password){
  try {
    const response = await fetch(`${conf.appwriteUrl}/v1/account/sessions/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': conf.appwriteProjectId,
      },
      body: JSON.stringify({ email, password }),
      credentials: 'omit', // Prevents it from affecting the session
    });

    return response.ok;
  } catch (err) {
    console.error("Password validation failed:", err);
    return false
  }
}