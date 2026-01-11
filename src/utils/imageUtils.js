/**
 * Converts Google Drive share links to direct image URLs
 * Uses lh3.googleusercontent.com endpoint for publicly shared files
 */

/**
 * Extract file ID from various Google Drive link formats
 * @param {string} url - Google Drive share link or file ID
 * @returns {string|null} - File ID or null if not found
 */
export function extractDriveFileId(url) {
  if (!url || url.trim() === '') return null;

  const trimmedUrl = url.trim();

  // If it's already just a file ID (no URL), return it
  if (!trimmedUrl.includes('/') && !trimmedUrl.includes('?')) {
    return trimmedUrl;
  }

  // Match patterns for Google Drive URLs
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,  // /file/d/FILE_ID/...
    /[?&]id=([a-zA-Z0-9_-]+)/,       // ?id=FILE_ID or &id=FILE_ID
    /\/d\/([a-zA-Z0-9_-]+)/,         // /d/FILE_ID/...
  ];

  for (const pattern of patterns) {
    const match = trimmedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Convert to direct image URL using Google Drive thumbnail endpoint
 * @param {string} input - Google Drive share link or file ID
 * @param {number} size - Size parameter (not used, kept for compatibility)
 * @returns {string} - Direct image URL
 */
export function getDirectImageUrl(input, size = 800) {
  const fileId = extractDriveFileId(input);
  
  if (!fileId) {
    return '';
  }

  // Use lh3.googleusercontent.com endpoint for publicly shared files
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

/**
 * Get preview URL (legacy - for backward compatibility)
 * @param {string} input - Google Drive share link or file ID
 * @returns {string} - Direct image URL
 */
export function getPreviewUrl(input) {
  return getDirectImageUrl(input);
}
