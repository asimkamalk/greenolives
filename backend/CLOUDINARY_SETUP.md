# Cloudinary Setup Guide

## Why This Fix?

Your images were disappearing because:

1. **Ephemeral Storage**: Render.com (your hosting platform) wipes the `uploads/` folder on server restarts
2. **Local File Storage**: Images were stored locally and lost when server restarted
3. **Database References**: Database only stored filenames, not the actual images

## Solution: Cloudinary Cloud Storage

Cloudinary provides persistent cloud storage for your images, ensuring they never disappear.

## Setup Steps

### 1. Create Cloudinary Account

- Go to [cloudinary.com](https://cloudinary.com)
- Sign up for a free account
- Get your credentials from the dashboard

### 2. Environment Variables

Add these to your `.env` file in the backend directory:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Deploy

- Push your changes to your repository
- Render will automatically redeploy with the new configuration

## How It Works Now

1. **Image Upload**: Images are temporarily stored locally, then uploaded to Cloudinary
2. **Database Storage**: Full Cloudinary URLs are stored in the database
3. **Image Display**: Frontend checks if image URL starts with 'http' to determine source
4. **Backward Compatibility**: Old local images still work during transition
5. **Cleanup**: Local temporary files are automatically deleted after upload

## Benefits

- ✅ **Images never disappear** - Stored in cloud
- ✅ **Better performance** - CDN delivery
- ✅ **Automatic optimization** - Cloudinary optimizes images
- ✅ **Scalable** - No storage limits
- ✅ **Backup** - Images are safely stored in cloud

## Migration

Existing items with local images will continue to work. New items will use Cloudinary. You can optionally migrate existing images by re-uploading them.

## Troubleshooting

If you see errors:

1. Check your Cloudinary credentials
2. Ensure environment variables are set correctly
3. Check the server logs for specific error messages
