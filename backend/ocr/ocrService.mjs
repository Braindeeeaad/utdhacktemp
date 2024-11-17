import vision from '@google-cloud/vision';
import dotenv from 'dotenv';

dotenv.config();

// For debugging purposes
const validateCredentials = () => {
  const requiredEnvVars = [
    'GOOGLE_CLOUD_PROJECT_ID',
    'GOOGLE_CLOUD_PRIVATE_KEY_ID',
    'GOOGLE_CLOUD_PRIVATE_KEY',
    'GOOGLE_CLOUD_CLIENT_EMAIL'
  ];

  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

const getClient = () => {
  try {
    validateCredentials();

    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
      private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      client_id: '',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLOUD_CLIENT_EMAIL}`
    };

    return new vision.ImageAnnotatorClient({ credentials });
  } catch (error) {
    console.error('Error initializing Vision client:', error);
    throw error;
  }
};

export const performOCR = async (imageBuffer) => {
  try {
    const client = getClient();
    
    // Convert buffer to base64 if needed
    const request = {
      image: {
        content: imageBuffer.toString('base64')
      }
    };

    const [result] = await client.textDetection(request);
    const detections = result.textAnnotations;
    
    if (!detections || detections.length === 0) {
      return { success: false, error: 'No text detected in the image' };
    }

    // The first element contains the entire text
    const text = detections[0].description;
    return { success: true, text };
  } catch (error) {
    console.error('Google Cloud Vision API Error:', error);
    return { success: false, error: error.message || 'Failed to process image' };
  }
};