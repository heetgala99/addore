import { Skeleton } from 'antd';

/**
 * Skeleton Loader for Product Grid
 */
export default function SkeletonLoader({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <Skeleton.Image 
            active 
            style={{ width: '100%', height: 300 }} 
          />
          <Skeleton 
            active 
            paragraph={{ rows: 2 }} 
            style={{ marginTop: 16 }} 
          />
        </div>
      ))}
    </>
  );
}

