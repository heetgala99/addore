import { useState } from 'react';
import styles from './ImageLoader.module.css';

/**
 * Image Loader Component
 * Uses direct img tags for fast, lightweight loading
 * No iframes - better performance and no CSP issues
 */
export default function ImageLoader({ 
  src, 
  alt = '', 
  className = '',
  placeholder,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!src || src.trim() === '') {
    return (
      <div className={`${styles.placeholder} ${className}`}>
        <span>No image</span>
      </div>
    );
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`${styles.placeholder} ${className}`}>
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <img
        src={src}
        alt={alt || 'Product image'}
        className={`${styles.image} ${isLoading ? styles.hidden : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
