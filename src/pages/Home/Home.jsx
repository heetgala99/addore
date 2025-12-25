import { useState } from 'react';
import { Row, Col, Typography, Button, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { ROUTES, CATEGORIES } from '../../utils/constants';
import styles from './Home.module.css';

const { Title, Paragraph } = Typography;

/**
 * Home Page
 * Features hero section, featured products, and category highlights
 */
export default function Home() {
  const navigate = useNavigate();
  const { featuredProducts, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const categories = Object.values(CATEGORIES);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <Title level={1} className={styles.heroTitle}>
            Discover Exquisite Jewellery
          </Title>
          <Paragraph className={styles.heroSubtitle}>
            Timeless elegance meets modern design. Explore our curated collection 
            of handcrafted jewellery pieces.
          </Paragraph>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate(ROUTES.CATALOGUE)}
            className={styles.heroButton}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Title level={2} className={styles.sectionTitle}>
            Featured Products
          </Title>
          <Paragraph className={styles.sectionSubtitle}>
            Handpicked selections from our collection
          </Paragraph>

          {error && (
            <Alert
              message="Error Loading Products"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
              closable
            />
          )}

          {loading ? (
            <Row gutter={[16, 16]}>
              {Array.from({ length: 8 }).map((_, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <SkeletonLoader count={1} />
                </Col>
              ))}
            </Row>
          ) : featuredProducts.length > 0 ? (
            <Row gutter={[16, 16]}>
              {featuredProducts.slice(0, 8).map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={handleProductClick}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <div className={styles.emptyState}>
              <Paragraph>No featured products available at the moment.</Paragraph>
            </div>
          )}

          {!loading && featuredProducts.length > 8 && (
            <div className={styles.viewAllButton}>
              <Button 
                type="default" 
                size="large"
                onClick={() => navigate(ROUTES.CATALOGUE)}
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Category Highlights */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Title level={2} className={styles.sectionTitle}>
            Shop by Category
          </Title>
          <Row gutter={[16, 16]}>
            {categories.map((category) => (
              <Col xs={24} sm={12} md={8} key={category}>
                <div 
                  className={styles.categoryCard}
                  onClick={() => navigate(`${ROUTES.CATALOGUE}?category=${category.toLowerCase()}`)}
                >
                  <Title level={4}>{category}</Title>
                  <Button type="link">Explore →</Button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

