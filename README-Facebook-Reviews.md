# Facebook Reviews Integration Setup

This guide will help you set up dynamic Facebook reviews for your Gus's Hot Dog King website.

## Overview

The Facebook reviews integration automatically fetches and displays reviews/recommendations from your Facebook page, replacing the hardcoded reviews with real-time data.

## Prerequisites

1. **Facebook Developer Account**: You need a Facebook developer account
2. **Facebook App**: A Facebook app to access the Graph API
3. **Page Access Token**: An access token for your Facebook page

## Step-by-Step Setup

### 1. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as the app type
4. Fill in your app details and create the app

### 2. Add Facebook Login Product

1. In your app dashboard, click "Add Product"
2. Add "Facebook Login" product
3. Configure the basic settings

### 3. Get Your App Credentials

1. In your app dashboard, go to "Settings" → "Basic"
2. Note down your **App ID** and **App Secret**

### 4. Generate Page Access Token

1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click "Generate Access Token"
4. Grant the necessary permissions:
   - `pages_read_engagement` (to read page data)
   - `pages_show_list` (to access page information)
5. Copy the generated access token

### 5. Configure the Integration

1. Open `facebook-config.js` in your project
2. Update the following values:
   ```javascript
   const FacebookConfig = {
     appId: 'YOUR_ACTUAL_APP_ID',
     appSecret: 'YOUR_ACTUAL_APP_SECRET', 
     pageId: 'Gusshotdogking', // Your Facebook page username
     accessToken: 'YOUR_ACTUAL_ACCESS_TOKEN',
     // ... other settings
   };
   ```

### 6. Test the Integration

1. Open your website in a browser
2. Check the browser console for any error messages
3. The Facebook reviews section should now display dynamic content

## File Structure

- `facebook-config.js` - Configuration file with your API credentials
- `facebook-reviews.js` - Main JavaScript file that handles the API calls and display
- `index.html` - Updated HTML with dynamic review containers

## How It Works

1. **Caching**: Reviews are cached in localStorage for 5 minutes to reduce API calls
2. **Fallback**: If the API fails, it shows the original hardcoded content
3. **Error Handling**: Graceful error handling with user-friendly messages
4. **Responsive**: Works on all device sizes

## API Endpoints Used

- **Ratings**: `/page-id/ratings` - Gets page ratings and reviews
- **Recommendations**: `/page-id/recommendations` - Gets page recommendations as fallback

## Troubleshooting

### Common Issues

1. **"Access token not configured"**
   - Check that you've updated `facebook-config.js` with your access token

2. **"Unable to load Facebook reviews"**
   - Verify your access token is valid and has the correct permissions
   - Check that your Facebook page ID is correct

3. **CORS errors in console**
   - Facebook API calls are made from the client side, which should work fine

4. **No reviews showing**
   - Your Facebook page might not have public reviews
   - Check the fallback content is working

### Debug Mode

To enable debug logging, add this to your browser console:
```javascript
localStorage.setItem('facebook-debug', 'true');
```

## Security Notes

⚠️ **Important**: Never commit your actual Facebook app secret or access token to version control. The `facebook-config.js` file should be added to your `.gitignore` file.

## Rate Limits

Facebook has rate limits on their API:
- 200 calls per user per hour for most endpoints
- The caching system helps stay within these limits

## Maintenance

- **Access Token Expiry**: Facebook access tokens can expire. You may need to regenerate them periodically
- **API Version Updates**: Facebook occasionally deprecates API versions. Check their [changelog](https://developers.facebook.com/docs/graph-api/changelog) for updates

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Facebook app settings and permissions
3. Test your access token in the Graph API Explorer
4. Check Facebook's [API documentation](https://developers.facebook.com/docs/pages-api)

## Alternative Solutions

If the Facebook Graph API doesn't work for your needs, consider:
- Using Facebook's embedded page plugin
- Manually updating reviews periodically
- Using a third-party review aggregation service

