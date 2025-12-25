/**
 * Converts Google Drive share links to iframe preview URLs
 * Simple and reliable - uses /preview endpoint
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
 * Convert to iframe preview URL
 * @param {string} input - Google Drive share link or file ID
 * @returns {string} - Preview URL for iframe
 */
export function getPreviewUrl(input) {
  const fileId = extractDriveFileId(input);
  
  if (!fileId) {
    return '';
  }

  return `https://drive.google.com/file/d/${fileId}/preview`;
}
