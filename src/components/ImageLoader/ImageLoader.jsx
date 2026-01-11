import { useState, useEffect } from 'react';
import styles from './ImageLoader.module.css';

/**
 * Image Loader Component
 * Uses direct img tags with retry logic for better reliability
 * Handles rate limiting and errors gracefully
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
  const [retryCount, setRetryCount] = useState(0);
  const [imageSrc, setImageSrc] = useState(src);

  // Reset state when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
    setImageSrc(src);
  }, [src]);

  if (!src || src.trim() === '') {
    return (
      <div className={`${styles.placeholder} ${className}`}>
        <span>No image</span>
      </div>
    );
  }

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    // Retry up to 2 times with exponential backoff
    if (retryCount < 2) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Force reload by appending timestamp
        setImageSrc(`${src}${src.includes('?') ? '&' : '?'}t=${Date.now()}`);
        setIsLoading(true);
      }, delay);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`${styles.placeholder} ${className}`}>
        <span>Image unavailable</span>
        <div className={styles.errorHint}>
          Image may be temporarily unavailable
        </div>
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
        src={imageSrc}
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
