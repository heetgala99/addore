import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { Row, Col, Typography, Button, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { ROUTES } from '../../utils/constants';
import styles from './Home.module.css';

const { Title, Paragraph } = Typography;

/**
 * Home Page
 * Features hero section with image carousel, featured products, and category highlights
 */
export default function Home() {
  const navigate = useNavigate();
  const { products, featuredProducts, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get unique images from products for the carousel
  const carouselImages = _.filter(_.uniqBy(
    _.map(
      _.filter(
        products,
        p => p.featured,
        p => p.imageUrl && p.imageUrl.trim() !== ''),
        p => ({
          url: p.imageUrl,
          name: p.name,
          id: p.id
        }),
    ),'url'
  ));

  // Auto-advance carousel
  useEffect(() => {
    if (carouselImages.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(prev => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  }, [carouselImages.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const categories = _.uniq(_.map(products, product => product.category));

  return (
    <div className={styles.home}>
      {/* Hero Section with Carousel */}
      <section className={styles.heroSection}>
        {/* Background Carousel */}
        <div className={styles.carouselContainer}>
          {carouselImages.length > 0 ? (
            <>
              {carouselImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`${styles.carouselSlide} ${index === currentSlide ? styles.active : ''}`}
                >
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className={styles.carouselImage}
                  />
                </div>
              ))}
              
              {/* Carousel Controls */}
              <button 
                className={`${styles.carouselButton} ${styles.prevButton}`}
                onClick={handlePrevSlide}
                aria-label="Previous slide"
              >
                <LeftOutlined />
              </button>
              <button 
                className={`${styles.carouselButton} ${styles.nextButton}`}
                onClick={handleNextSlide}
                aria-label="Next slide"
              >
                <RightOutlined />
              </button>

              {/* Carousel Indicators */}
              <div className={styles.carouselIndicators}>
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.carouselPlaceholder} />
          )}
        </div>

        {/* Hero Content Overlay */}
        <div className={styles.heroOverlay}>
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
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <div 
                key={category}
                className={styles.categoryCard}
                onClick={() => navigate(`${ROUTES.CATALOGUE}?category=${category.toLowerCase()}`)}
              >
                <Title level={4}>{category}</Title>
                <Button type="link">Explore →</Button>
              </div>
            ))}
          </div>
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
