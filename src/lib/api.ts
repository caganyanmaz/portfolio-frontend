import axios from 'axios';

// Strapi API configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Create axios instance for Strapi API
export const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
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
  return (data as any)?.attributes as T;
};

// Common API functions
export const api = {
  // Get all items of a content type
  getAll: async <T>(endpoint: string): Promise<T[]> => {
    try {
      const response = await strapiApi.get(endpoint);
      return extractStrapiAttributes<T[]>(response);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
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