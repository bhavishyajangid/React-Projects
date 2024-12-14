// Import necessary modules
import express from 'express';
import cors from 'cors';  // Import CORS middleware
import fetch from 'node-fetch';  // Import fetch for making requests to third-party services like Twilio

// Initialize the express app
const app = express();
const PORT = 5000;

// Middleware: CORS and JSON parsing
app.use(cors());  // This will allow cross-origin requests
app.use(express.json());  // This will allow the server to parse JSON request bodies

// POST route to send OTP
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body; // Extract phone number from the request body
  
  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number is required.' });
  }

  try {
    // Replace these with your Twilio details
    const TWILIO_ACCOUNT_SID = 'your_account_sid';  // Your Twilio Account SID
    const TWILIO_AUTH_TOKEN = 'your_auth_token';    // Your Twilio Auth Token
    const VERIFY_SERVICE_SID = 'your_verify_service_sid'; // Your Twilio Verify Service SID

    // Use Twilio API to send the OTP
    const response = await fetch(`https://verify.twilio.com/v2/Services/${VERIFY_SERVICE_SID}/Verifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: phoneNumber,  // The phone number to send OTP to
        Channel: 'sms',   // Specify the SMS channel
      }),
      auth: `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`,
    });

    const data = await response.json();
    if (data.status === 'pending') {
      return res.json({ success: true, message: 'OTP sent successfully.' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ success: false, message: 'Error sending OTP.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
