import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchProductsFromSheets } from '../services/googleSheetsService';
import { 
  getProducts, 
  getFeaturedProducts,
  filterByCategory,
  filterByPriceRange,
  filterByDiscount,
  searchProducts,
  sortProducts,
  getCategories,
} from '../services/productService';

/**
 * Custom hook for managing products data
 * Provides loading, error states, and filtering/sorting functionality
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: null,
    maxPrice: null,
    minDiscount: null,
    searchTerm: '',
    sortBy: 'name_asc',
  });

  // Fetch products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await getProducts(fetchProductsFromSheets);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Get featured products
  const featuredProducts = useMemo(() => {
    return getFeaturedProducts(products);
  }, [products]);

  // Get filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    filtered = filterByCategory(filtered, filters.category);

    // Apply price range filter
    filtered = filterByPriceRange(filtered, filters.minPrice, filters.maxPrice);

    // Apply discount filter
    filtered = filterByDiscount(filtered, filters.minDiscount);

    // Apply search filter
    filtered = searchProducts(filtered, filters.searchTerm);

    // Apply sorting
    filtered = sortProducts(filtered, filters.sortBy);

    return filtered;
  }, [products, filters]);

  // Get unique categories
  const categories = useMemo(() => {
    return getCategories(products);
  }, [products]);

  // Update filter
  const updateFilter = useCallback((filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      category: 'all',
      minPrice: null,
      maxPrice: null,
      minDiscount: null,
      searchTerm: '',
      sortBy: 'name_asc',
    });
  }, []);

  // Get product by ID
  const getProductById = useCallback((id) => {
    return products.find(product => product.id === id || product.id.toString() === id.toString());
  }, [products]);

  return {
    products,
    featuredProducts,
    filteredProducts,
    categories,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    getProductById,
  };
}

