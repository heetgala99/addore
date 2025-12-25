import { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Typography, 
  Input, 
  Select, 
  Slider, 
  Button, 
  Alert,
  Empty,
  Pagination,
} from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { SORT_OPTIONS, PRODUCTS_PER_PAGE } from '../../utils/constants';
import styles from './Catalogue.module.css';

const { Title } = Typography;
const { Option } = Select;

/**
 * Catalogue Page
 * Product grid with filters, search, and pagination
 */
export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    filteredProducts, 
    categories, 
    loading, 
    error, 
    filters, 
    updateFilter,
    resetFilters 
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      updateFilter('category', category);
    }
  }, [searchParams, updateFilter]);

  // Get price range from products
  const priceRange = filteredProducts.length > 0
    ? [
        Math.min(...filteredProducts.map(p => p.price)),
        Math.max(...filteredProducts.map(p => p.price))
      ]
    : [0, 1000];

  const [priceRangeValue, setPriceRangeValue] = useState([
    filters.minPrice || priceRange[0],
    filters.maxPrice || priceRange[1]
  ]);

  // Pagination
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRangeValue(value);
    updateFilter('minPrice', value[0]);
    updateFilter('maxPrice', value[1]);
  };

  const handleSearch = (e) => {
    updateFilter('searchTerm', e.target.value);
  };

  const handleCategoryChange = (value) => {
    updateFilter('category', value);
    setSearchParams({ category: value });
  };

  const handleSortChange = (value) => {
    updateFilter('sortBy', value);
  };

  const handleResetFilters = () => {
    resetFilters();
    setPriceRangeValue(priceRange);
    setSearchParams({});
  };

  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minDiscount !== null ||
    filters.searchTerm !== '';

  return (
    <div className={styles.catalogue}>
      <div className={styles.container}>
        <Title level={1} className={styles.pageTitle}>
          Our Catalogue
        </Title>

        <Row gutter={[24, 24]}>
          {/* Filters Sidebar */}
          <Col xs={24} lg={6}>
            <div className={styles.filtersPanel}>
              <Title level={4}>Filters</Title>

              {/* Search */}
              <div className={styles.filterSection}>
                <Title level={5}>Search</Title>
                <Input
                  placeholder="Search products..."
                  prefix={<SearchOutlined />}
                  value={filters.searchTerm}
                  onChange={handleSearch}
                  allowClear
                />
              </div>

              {/* Category Filter */}
              <div className={styles.filterSection}>
                <Title level={5}>Category</Title>
                <Select
                  value={filters.category}
                  onChange={handleCategoryChange}
                  style={{ width: '100%' }}
                >
                  <Option value="all">All Categories</Option>
                  {categories.map(cat => (
                    <Option key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Price Range */}
              <div className={styles.filterSection}>
                <Title level={5}>Price Range</Title>
                <Slider
                  range
                  min={priceRange[0]}
                  max={priceRange[1]}
                  value={priceRangeValue}
                  onChange={handlePriceRangeChange}
                  marks={{
                    [priceRange[0]]: `$${priceRange[0]}`,
                    [priceRange[1]]: `$${priceRange[1]}`,
                  }}
                />
                <div className={styles.priceDisplay}>
                  ${priceRangeValue[0].toFixed(2)} - ${priceRangeValue[1].toFixed(2)}
                </div>
              </div>

              {/* Discount Filter */}
              <div className={styles.filterSection}>
                <Title level={5}>Minimum Discount</Title>
                <Select
                  value={filters.minDiscount || null}
                  onChange={(value) => updateFilter('minDiscount', value)}
                  style={{ width: '100%' }}
                  allowClear
                  placeholder="Any discount"
                >
                  <Option value={10}>10% or more</Option>
                  <Option value={20}>20% or more</Option>
                  <Option value={30}>30% or more</Option>
                  <Option value={50}>50% or more</Option>
                </Select>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <Button
                  icon={<ClearOutlined />}
                  onClick={handleResetFilters}
                  style={{ width: '100%', marginTop: 16 }}
                >
                  Reset Filters
                </Button>
              )}
            </div>
          </Col>

          {/* Products Grid */}
          <Col xs={24} lg={18}>
            {/* Sort and Results Count */}
            <div className={styles.toolbar}>
              <div className={styles.resultsCount}>
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <span>
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <Select
                value={filters.sortBy}
                onChange={handleSortChange}
                style={{ width: 200 }}
              >
                <Option value={SORT_OPTIONS.NAME_A_TO_Z}>Name: A to Z</Option>
                <Option value={SORT_OPTIONS.NAME_Z_TO_A}>Name: Z to A</Option>
                <Option value={SORT_OPTIONS.PRICE_LOW_TO_HIGH}>Price: Low to High</Option>
                <Option value={SORT_OPTIONS.PRICE_HIGH_TO_LOW}>Price: High to Low</Option>
                <Option value={SORT_OPTIONS.DISCOUNT_HIGH}>Highest Discount</Option>
              </Select>
            </div>

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
                  <Col xs={24} sm={12} md={8} xl={6} key={index}>
                    <SkeletonLoader count={1} />
                  </Col>
                ))}
              </Row>
            ) : paginatedProducts.length > 0 ? (
              <>
                <Row gutter={[16, 16]}>
                  {paginatedProducts.map((product) => (
                    <Col xs={24} sm={12} md={8} xl={6} key={product.id}>
                      <ProductCard
                        product={product}
                        onClick={handleProductClick}
                      />
                    </Col>
                  ))}
                </Row>

                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <Pagination
                      current={currentPage}
                      total={filteredProducts.length}
                      pageSize={PRODUCTS_PER_PAGE}
                      onChange={setCurrentPage}
                      showSizeChanger={false}
                      showTotal={(total) => `Total ${total} products`}
                    />
                  </div>
                )}
              </>
            ) : (
              <Empty
                description="No products found matching your filters"
                style={{ marginTop: 48 }}
              >
                {hasActiveFilters && (
                  <Button onClick={handleResetFilters}>
                    Clear Filters
                  </Button>
                )}
              </Empty>
            )}
          </Col>
        </Row>
      </div>

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

