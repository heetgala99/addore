import styles from './ImageLoader.module.css';

/**
 * Simple Image Loader using Google Drive iframe
 * Uses /preview endpoint - most reliable method
 */
export default function ImageLoader({ 
  src, 
  alt = '', 
  className = '',
  placeholder,
  ...props 
}) {
  if (!src || src.trim() === '') {
    return (
      <div className={`${styles.placeholder} ${className}`}>
        <span>No image</span>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <iframe
        src={src}
        title={alt || 'Product image'}
        className={styles.iframe}
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      />
    </div>
  );
}
