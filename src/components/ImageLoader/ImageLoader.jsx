import { useState, useEffect, useRef } from 'react';
import { Skeleton } from 'antd';
import styles from './ImageLoader.module.css';

/**
 * Optimized Image Loader Component
 * Implements lazy loading, skeleton placeholder, and error handling
 */
export default function ImageLoader({ 
  src, 
  alt = '', 
  className = '',
  width,
  height,
  placeholder = true,
  ...props 
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!placeholder) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [placeholder]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <div 
        className={`${styles.errorPlaceholder} ${className}`}
        style={{ width, height }}
      >
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`${styles.imageContainer} ${className}`}
      style={{ width, height }}
    >
      {loading && placeholder && (
        <Skeleton.Image 
          active 
          style={{ 
            width: width || '100%', 
            height: height || 'auto',
            minHeight: height || 200,
          }} 
        />
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={styles.image}
          style={{
            display: loading ? 'none' : 'block',
            width: width || '100%',
            height: height || 'auto',
          }}
          {...props}
        />
      )}
    </div>
  );
}

