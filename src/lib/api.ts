import axios from 'axios';

// Strapi API configuration - server-side only
const STRAPI_URL = process.env.STRAPI_HOST_ADDRESS || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_TOKEN;

// Debug logging
console.log('Strapi Configuration:');
console.log('STRAPI_HOST_ADDRESS:', process.env.STRAPI_HOST_ADDRESS);
console.log('Using STRAPI_URL:', STRAPI_URL);
console.log('API_TOKEN exists:', !!API_TOKEN);

// Create axios instance for Strapi API
export const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
  // Add timeout
  timeout: 10000,
});

// Helper function to extract data from Strapi response
export const extractStrapiData = <T>(response: any): T => {
  return response.data?.data || response.data;
};

// Helper function to extract attributes from Strapi response
export const extractStrapiAttributes = <T>(response: any): T => {
  const data = extractStrapiData(response);
  if (Array.isArray(data)) {
    return data.map(item => item.attributes) as T;
  }
  return ((data as any).attributes as T);
};

// Common API functions
export const api = {
  // Get all items of a content type
  getMany: async <T>(endpoint: string): Promise<T[]> => {
    try {
      console.log(`Fetching: ${strapiApi.defaults.baseURL}/${endpoint}`);
      const response = await strapiApi.get(endpoint);
      return response.data.data;
    } catch (error: any) {
      console.error(`Error fetching ${endpoint}:`, error);
      console.error('Error details:', {
        message: error?.message || 'Unknown error',
        code: error?.code || 'Unknown code',
        config: {
          baseURL: strapiApi.defaults.baseURL,
          url: endpoint
        }
      });
      return [];
    }
  },
  getSingle: async <T>(endpoint: string): Promise<T | null> => {
    try {
      const response = await strapiApi.get(endpoint);
      return response.data.data as T;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return null;
    }
  },

  // Get a single item by ID
  getById: async <T>(endpoint: string, id: string | number): Promise<T | null> => {
    try {
      const response = await strapiApi.get(`${endpoint}/${id}`);
      return extractStrapiAttributes<T>(response);
    } catch (error) {
      console.error(`Error fetching ${endpoint}/${id}:`, error);
      return null;
    }
  },

  // Get items with filters
  getWithFilters: async <T>(endpoint: string, filters: Record<string, any>): Promise<T[]> => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      
      const response = await strapiApi.get(`${endpoint}?${params.toString()}`);
      return extractStrapiAttributes<T[]>(response);
    } catch (error) {
      console.error(`Error fetching ${endpoint} with filters:`, error);
      return [];
    }
  },

  // Post data to create new items
  post: async <T>(endpoint: string, data: any): Promise<T | null> => {
    try {
      const response = await strapiApi.post(endpoint, data);
      return extractStrapiAttributes<T>(response);
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      return null;
    }
  },
}; 