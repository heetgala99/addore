import { memo } from 'react';
import { Card, Tag, Typography } from 'antd';
import ImageLoader from '../ImageLoader/ImageLoader';
import styles from './ProductCard.module.css';

const { Title, Text } = Typography;

/**
 * Product Card Component
 * Displays product information in a card format
 * Memoized to prevent unnecessary re-renders
 */
function ProductCard({ product, onClick }) {
  const hasDiscount = product.discountPercent > 0;
  const originalPrice = product.originalPrice || product.price;

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const rawStockPending = product.stockPending ?? 0;
  const parsedStockPending = parseInt(rawStockPending, 10);
  const stockPending = Number.isFinite(parsedStockPending) ? parsedStockPending : 0;
  const hasStock = stockPending > 0;
  const stockLabel = hasStock ? `Only ${stockPending} left` : 'Out of stock';
  const stockColor = hasStock ? 'green' : 'blue';

  return (
    <Card
      hoverable
      className={styles.productCard}
      cover={
        <div className={styles.imageWrapper}>
          <ImageLoader
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
            placeholder={true}
          />
          {hasDiscount && (
            <Tag color="red" className={styles.discountTag}>
              {product.discountPercent}% OFF
            </Tag>
          )}
        </div>
      }
      onClick={handleClick}
    >
      <div className={styles.cardContent}>
        <Title level={5} className={styles.productName} ellipsis>
          {product.name}
        </Title>
        
        <div className={styles.metaRow}>
          {product.category && (
            <Tag color="gold" className={styles.categoryTag}>
              {product.category}
            </Tag>
          )}
          <Tag color={stockColor} className={styles.stockTag}>
            {stockLabel}
          </Tag>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <Text strong className={styles.currentPrice}>
              ₹{product.price.toLocaleString('en-IN')}
            </Text>
            {hasDiscount && originalPrice > product.price && (
              <Text delete className={styles.originalPrice}>
                ₹{originalPrice.toLocaleString('en-IN')}
              </Text>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(ProductCard);

