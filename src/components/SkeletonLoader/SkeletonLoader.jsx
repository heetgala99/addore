import { Skeleton, Card } from 'antd';
import styles from './SkeletonLoader.module.css';

/**
 * Skeleton Loader for Product Grid
 * Displays skeleton cards in a grid layout matching ProductCard
 * Can render a single card or multiple cards
 */
export default function SkeletonLoader({ count = 1 }) {
  const cards = Array.from({ length: count }).map((_, index) => (
    <Card key={index} className={styles.skeletonCard} hoverable={false}>
      <div className={styles.imageWrapper}>
        <Skeleton.Image 
          active 
          className={styles.skeletonImage}
        />
      </div>
      <div className={styles.skeletonContent}>
        <Skeleton 
          active 
          title={{ width: '80%' }}
          paragraph={{ rows: 2, width: ['100%', '60%'] }}
        />
        <Skeleton.Button active size="small" style={{ width: 100, marginTop: 8 }} />
      </div>
    </Card>
  ));

  return count === 1 ? cards[0] : <>{cards}</>;
}

