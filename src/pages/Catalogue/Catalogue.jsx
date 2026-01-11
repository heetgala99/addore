import { useState, useEffect, useMemo } from 'react';
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
  Collapse,
} from 'antd';
import { SearchOutlined, ClearOutlined, FilterOutlined } from '@ant-design/icons';
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
 * Product grid with collapsible filters
 */
export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    products,
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

  // Calculate the actual price range from ALL products (not filtered)
  const actualPriceRange = useMemo(() => {
    if (products.length === 0) return [0, 100000];
    const prices = products.map(p => p.price).filter(p => p > 0);
    if (prices.length === 0) return [0, 100000];
    return [
      Math.floor(Math.min(...prices)),
      Math.ceil(Math.max(...prices))
    ];
  }, [products]);

  // Initialize price range value when products load
  const [priceRangeValue, setPriceRangeValue] = useState([0, 100000]);
  const [priceRangeInitialized, setPriceRangeInitialized] = useState(false);

  useEffect(() => {
    if (products.length > 0 && !priceRangeInitialized) {
      setPriceRangeValue([actualPriceRange[0], actualPriceRange[1]]);
      setPriceRangeInitialized(true);
    }
  }, [products.length, actualPriceRange, priceRangeInitialized]);

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
  };

  const handlePriceRangeAfterChange = (value) => {
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
    setPriceRangeValue([actualPriceRange[0], actualPriceRange[1]]);
    setSearchParams({});
  };

  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minDiscount !== null ||
    filters.searchTerm !== '';

  // Filter panel content
  const filterContent = (
    <div className={styles.filtersContent}>
      <Row gutter={[16, 16]}>
        {/* Search */}
        <Col xs={24} sm={12} md={6}>
          <div className={styles.filterItem}>
            <Title level={5}>Search</Title>
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined />}
              value={filters.searchTerm}
              onChange={handleSearch}
              allowClear
            />
          </div>
        </Col>

        {/* Category Filter */}
        <Col xs={24} sm={12} md={6}>
          <div className={styles.filterItem}>
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
        </Col>

        {/* Price Range */}
        <Col xs={24} sm={12} md={6}>
          <div className={styles.filterItem}>
            <Title level={5}>Price Range</Title>
            <Slider
              range
              min={actualPriceRange[0]}
              max={actualPriceRange[1]}
              value={priceRangeValue}
              onChange={handlePriceRangeChange}
              onChangeComplete={handlePriceRangeAfterChange}
              tooltip={{
                formatter: (value) => `₹${value?.toLocaleString('en-IN') || 0}`
              }}
            />
            <div className={styles.priceDisplay}>
              ₹{priceRangeValue[0].toLocaleString('en-IN')} - ₹{priceRangeValue[1].toLocaleString('en-IN')}
            </div>
          </div>
        </Col>

        {/* Discount Filter */}
        <Col xs={24} sm={12} md={6}>
          <div className={styles.filterItem}>
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
        </Col>
      </Row>

      {/* Reset Filters - At Bottom */}
      {hasActiveFilters && (
        <div className={styles.resetButtonContainer}>
          <Button
            icon={<ClearOutlined />}
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );

  // Collapse items
  const collapseItems = [
    {
      key: 'filters',
      label: (
        <span className={styles.filterHeader}>
          <FilterOutlined /> Filters
        </span>
      ),
      children: filterContent,
    },
  ];

  return (
    <div className={styles.catalogue}>
      <div className={styles.container}>
        <Title level={1} className={styles.pageTitle}>
          Our Catalogue
        </Title>

        {/* Collapsible Filters */}
        <Collapse
          items={collapseItems}
          defaultActiveKey={['filters']}
          className={styles.filtersCollapse}
          expandIconPosition="end"
        />

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

        {/* Products Grid */}
        {loading ? (
          <Row gutter={[16, 16]}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <SkeletonLoader count={1} />
              </Col>
            ))}
          </Row>
        ) : paginatedProducts.length > 0 ? (
          <>
            <Row gutter={[16, 16]}>
              {paginatedProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
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
