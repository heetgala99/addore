import axios from 'axios';

/**
 * Google Sheets Service
 * Fetches product data from Google Sheets
 * Supports both public CSV endpoint and API key authentication
 */

const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

/**
 * Fetch data from Google Sheets using CSV endpoint (public sheets)
 * @returns {Promise<Array>} - Array of product objects
 */
async function fetchFromCSV() {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;
  
  try {
    const response = await axios.get(csvUrl, {
      responseType: 'text',
    });

    return parseCSV(response.data);
  } catch (error) {
    console.error('Error fetching CSV from Google Sheets:', error);
    throw new Error('Failed to fetch data from Google Sheets');
  }
}

/**
 * Fetch data from Google Sheets using API (with API key)
 * @returns {Promise<Array>} - Array of product objects
 */
async function fetchFromAPI() {
  if (!GOOGLE_SHEETS_API_KEY) {
    throw new Error('Google Sheets API key is not configured');
  }

  const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/Sheet1?key=${GOOGLE_SHEETS_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    return parseAPIResponse(response.data);
  } catch (error) {
    console.error('Error fetching from Google Sheets API:', error);
    throw new Error('Failed to fetch data from Google Sheets API');
  }
}

/**
 * Parse CSV data into array of objects
 * @param {string} csvText - CSV text content
 * @returns {Array} - Array of product objects
 */
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  // Parse header row
  const headers = parseCSVLine(lines[0]);
  const headerMap = {};
  headers.forEach((header, index) => {
    headerMap[header.trim().toLowerCase()] = index;
  });

  // Parse data rows
  const products = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0) continue;

    const product = {};
    Object.keys(headerMap).forEach(key => {
      const index = headerMap[key];
      let value = values[index] || '';
      
      // Remove quotes if present
      value = value.replace(/^"|"$/g, '');
      
      // Convert to appropriate type
      if (key === 'id' || key === 'price' || key === 'original_price' || key === 'discount_percent') {
        value = value ? parseFloat(value) : 0;
      } else if (key === 'featured') {
        value = value.toLowerCase() === 'true' || value === '1';
      }
      
      product[key] = value;
    });

    if (product.id || product.name) {
      products.push(product);
    }
  }

  return products;
}

/**
 * Parse CSV line handling quoted values
 * @param {string} line - CSV line
 * @returns {Array} - Array of values
 */
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current);
  return values;
}

/**
 * Parse Google Sheets API response
 * @param {object} data - API response data
 * @returns {Array} - Array of product objects
 */
function parseAPIResponse(data) {
  if (!data.values || data.values.length === 0) {
    return [];
  }

  const headers = data.values[0].map(h => h.trim().toLowerCase());
  const products = [];

  for (let i = 1; i < data.values.length; i++) {
    const row = data.values[i];
    if (row.length === 0) continue;

    const product = {};
    headers.forEach((header, index) => {
      let value = row[index] || '';
      
      // Convert to appropriate type
      if (header === 'id' || header === 'price' || header === 'original_price' || header === 'discount_percent') {
        value = value ? parseFloat(value) : 0;
      } else if (header === 'featured') {
        value = value.toString().toLowerCase() === 'true' || value === '1' || value === 1;
      }
      
      product[header] = value;
    });

    if (product.id || product.name) {
      products.push(product);
    }
  }

  return products;
}

/**
 * Fetch products from Google Sheets
 * Tries API first, falls back to CSV if API key is not available
 * @returns {Promise<Array>} - Array of product objects
 */
export async function fetchProductsFromSheets() {
  try {
    // Try API first if API key is available
    if (GOOGLE_SHEETS_API_KEY) {
      return await fetchFromAPI();
    } else {
      // Fall back to CSV endpoint for public sheets
      return await fetchFromCSV();
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

