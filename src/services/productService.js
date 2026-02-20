import { getDirectImageUrl } from '../utils/imageUtils';

/**
 * Product Service
 * Handles product data normalization, caching, and filtering
 */

let productsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Normalize product data from Google Sheets
 * @param {Array} rawProducts - Raw product data from sheets
 * @returns {Array} - Normalized product objects
 */
export function normalizeProducts(rawProducts) {
  return rawProducts.map(product => {
    // Get image source - prefer image_id, fallback to image_url
    const imageSource = product.image_id || product.image_url || product.imageurl || '';
    
    // Convert to direct image URL (fast, lightweight, no iframe needed)
    const imageUrl = getDirectImageUrl(imageSource);

    // Calculate discount if not provided
    let discountPercent = product.discount_percent || product.discountpercent || 0;
    if (!discountPercent && product.original_price && product.price) {
      const original = parseFloat(product.original_price);
      const current = parseFloat(product.price);
      if (original > current) {
        discountPercent = Math.round(((original - current) / original) * 100);
      }
    }

    const rawStockPending = product.stock_pending || 0;
    const stockPending = parseInt(rawStockPending, 10)

    return {
      id: product.id || product.ID || '',
      name: product.name || product.Name || '',
      category: product.category || product.Category || '',
      price: parseFloat(product.price || product.Price || 0),
      originalPrice: parseFloat(product.original_price || product.originalprice || product.price || 0),
      discountPercent: parseFloat(discountPercent || 0),
      imageUrl: imageUrl,
      description: product.description || product.Description || '',
      featured: product.featured === true || product.featured === 'TRUE' || product.featured === 'true' || product.featured === 1,
      stockPending,
    };
  });
}

/**
 * Get all products (from cache or fetch)
 * @param {Function} fetchFunction - Function to fetch products if not cached
 * @returns {Promise<Array>} - Array of normalized products
 */
export async function getProducts(fetchFunction) {
  const now = Date.now();
  
  // Return cached data if available and not expired
  if (productsCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }

  // Fetch and normalize products
  const rawProducts = await fetchFunction();
  productsCache = normalizeProducts(rawProducts);
  cacheTimestamp = now;

  return productsCache;
}

/**
 * Get featured products
 * @param {Array} products - All products
 * @returns {Array} - Featured products
 */
export function getFeaturedProducts(products) {
  return products.filter(product => product.featured);
}

/**
 * Filter products by category
 * @param {Array} products - All products
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered products
 */
export function filterByCategory(products, category) {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Filter products by price range
 * @param {Array} products - All products
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} - Filtered products
 */
export function filterByPriceRange(products, minPrice, maxPrice) {
  return products.filter(product => {
    const price = product.price;
    return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
  });
}

/**
 * Filter products by discount
 * @param {Array} products - All products
 * @param {number} minDiscount - Minimum discount percentage
 * @returns {Array} - Filtered products
 */
export function filterByDiscount(products, minDiscount) {
  if (!minDiscount) {
    return products;
  }
  return products.filter(product => product.discountPercent >= minDiscount);
}

/**
 * Search products by name or description
 * @param {Array} products - All products
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered products
 */
export function searchProducts(products, searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') {
    return products;
  }

  const term = searchTerm.toLowerCase().trim();
  return products.filter(product => {
    const name = (product.name || '').toLowerCase();
    const description = (product.description || '').toLowerCase();
    return name.includes(term) || description.includes(term);
  });
}

/**
 * Sort products
 * @param {Array} products - Products to sort
 * @param {string} sortBy - Sort option
 * @returns {Array} - Sorted products
 */
export function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name_asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'discount_desc':
      return sorted.sort((a, b) => b.discountPercent - a.discountPercent);
    default:
      return sorted;
  }
}

/**
 * Get unique categories from products
 * @param {Array} products - All products
 * @returns {Array} - Unique categories
 */
export function getCategories(products) {
  const categories = new Set();
  products.forEach(product => {
    if (product.category) {
      categories.add(product.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Clear products cache
 */
export function clearCache() {
  productsCache = null;
  cacheTimestamp = null;
}

