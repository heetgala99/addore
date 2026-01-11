import { Modal, Typography, Tag, Row, Col, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ImageLoader from '../ImageLoader/ImageLoader';
import styles from './ProductModal.module.css';

const { Title, Text, Paragraph } = Typography;

/**
 * Product Detail Modal Component
 * Displays full product information in a modal
 */
export default function ProductModal({ product, open, onClose }) {
  if (!product) return null;

  const hasDiscount = product.discountPercent > 0;
  const originalPrice = product.originalPrice || product.price;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      className={styles.productModal}
      centered
      closeIcon={null}
    >
      {/* Custom Close Button */}
      <Button
        type="primary"
        danger
        icon={<CloseOutlined />}
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close modal"
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className={styles.imageContainer}>
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
        </Col>
        
        <Col xs={24} md={12}>
          <div className={styles.productInfo}>
            <Title level={2} className={styles.productName}>
              {product.name}
            </Title>

            {product.category && (
              <Tag color="blue" className={styles.categoryTag}>
                {product.category}
              </Tag>
            )}

            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                <Text strong className={styles.currentPrice}>
                  ₹{product.price.toLocaleString('en-IN')}
                </Text>
                {hasDiscount && originalPrice > product.price && (
                  <>
                    <Text delete className={styles.originalPrice}>
                      ₹{originalPrice.toLocaleString('en-IN')}
                    </Text>
                    <Text className={styles.savings}>
                      Save ₹{(originalPrice - product.price).toLocaleString('en-IN')}
                    </Text>
                  </>
                )}
              </div>
            </div>

            {product.description && (
              <div className={styles.descriptionSection}>
                <Title level={4}>Description</Title>
                <Paragraph className={styles.description}>
                  {product.description}
                </Paragraph>
              </div>
            )}

            <div className={styles.productId}>
              <Text type="secondary">Product ID: {product.id}</Text>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
