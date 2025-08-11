import { v2 as cloudinary } from 'cloudinary';

// Debug: Check if environment variables are loaded
console.log('Cloudinary Config - Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('Cloudinary Config - API Key:', process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'NOT SET');
console.log('Cloudinary Config - API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'NOT SET');

// Check if all required environment variables are present
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Cloudinary environment variables are missing!');
    console.error('Please check your .env file or Render environment variables');
    throw new Error('Cloudinary environment variables not configured');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('✅ Cloudinary configured successfully');

export default cloudinary;
