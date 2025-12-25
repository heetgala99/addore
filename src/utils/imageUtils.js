/**
 * Converts Google Drive share links to direct image URLs
 * Supports multiple Google Drive link formats
 */

/**
 * Extract file ID from various Google Drive link formats
 * @param {string} url - Google Drive share link
 * @returns {string|null} - File ID or null if not found
 */
export function extractDriveFileId(url) {
  if (!url) return null;

  // Handle direct file ID
  if (!url.includes('http')) {
    return url;
  }

  // Format 1: https://drive.google.com/file/d/FILE_ID/view
  // Format 2: https://drive.google.com/open?id=FILE_ID
  // Format 3: https://drive.google.com/uc?id=FILE_ID
  // Format 4: https://docs.google.com/document/d/FILE_ID/edit

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Convert Google Drive share link to direct image URL
 * @param {string} shareLink - Google Drive share link
 * @param {object} options - Options for image URL
 * @param {number} options.width - Optional width parameter
 * @param {number} options.height - Optional height parameter
 * @returns {string} - Direct image URL
 */
export function convertDriveToImageUrl(shareLink, options = {}) {
  const fileId = extractDriveFileId(shareLink);
  
  if (!fileId) {
    console.warn('Could not extract file ID from URL:', shareLink);
    return shareLink; // Return original if conversion fails
  }

  // Base URL for direct image access
  let imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  // Add size parameters if provided
  if (options.width) {
    imageUrl += `&w=${options.width}`;
  }
  if (options.height) {
    imageUrl += `&h=${options.height}`;
  }

  return imageUrl;
}

/**
 * Generate optimized image URLs for different screen sizes
 * @param {string} shareLink - Google Drive share link
 * @returns {object} - Object with different size URLs
 */
export function getOptimizedImageUrls(shareLink) {
  const fileId = extractDriveFileId(shareLink);
  
  if (!fileId) {
    return {
      thumbnail: shareLink,
      small: shareLink,
      medium: shareLink,
      large: shareLink,
    };
  }

  return {
    thumbnail: `https://drive.google.com/uc?export=view&id=${fileId}&w=200`,
    small: `https://drive.google.com/uc?export=view&id=${fileId}&w=400`,
    medium: `https://drive.google.com/uc?export=view&id=${fileId}&w=800`,
    large: `https://drive.google.com/uc?export=view&id=${fileId}&w=1200`,
  };
}

