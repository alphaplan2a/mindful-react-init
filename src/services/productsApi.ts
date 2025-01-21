import axios from 'axios';
import { Product } from '../types/product';
import { API_ENDPOINTS } from '../config/apiConfig';

const transformProductData = (productData: any, baseUrl: string): Product => ({
  id: parseInt(productData.id_product),
  name: productData.nom_product,
  material: productData.type_product,
  color: productData.color_product,
  price: parseFloat(productData.price_product) || 0.0,
  image: `${baseUrl}/${productData.img_product}?format=webp&quality=70`,
  image2: productData.img2_product ? `${baseUrl}/${productData.img2_product}?format=webp&quality=70` : undefined,
  image3: productData.img3_product ? `${baseUrl}/${productData.img3_product}?format=webp&quality=70` : undefined,
  image4: productData.img4_product ? `${baseUrl}/${productData.img4_product}?format=webp&quality=70` : undefined,
  description: productData.description_product,
  status: productData.status_product,
  reference: productData.reference_product,
  itemGroup: productData.itemgroup_product,
  relatedProducts: productData.related_products,
  colorProduct: productData.color_product,
  discount_product: productData.discount_product || "",
  sizes: {
    s: parseInt(productData.s_size) || 0,
    m: parseInt(productData.m_size) || 0,
    l: parseInt(productData.l_size) || 0,
    xl: parseInt(productData.xl_size) || 0,
    xxl: parseInt(productData.xxl_size) || 0,
    "3xl": parseInt(productData["3xl_size"]) || 0,
    "48": parseInt(productData["48_size"]) || 0,
    "50": parseInt(productData["50_size"]) || 0,
    "52": parseInt(productData["52_size"]) || 0,
    "54": parseInt(productData["54_size"]) || 0,
    "56": parseInt(productData["56_size"]) || 0,
    "58": parseInt(productData["58_size"]) || 0,
  },
  quantity: parseInt(productData.qnty_product) || 0,
  type_product: productData.type_product,
  category_product: productData.category_product,
  itemgroup_product: productData.itemgroup_product,
});

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching all products...');
    const timestamp = new Date().getTime();
    const response = await axios.get(`${API_ENDPOINTS.getArticles}?timestamp=${timestamp}`);
    const baseUrl = new URL(API_ENDPOINTS.getArticles).origin;

    console.log('API Response:', response.data);

    if (response.data.status === 'success' && Array.isArray(response.data.products)) {
      return response.data.products
        .filter(product => product.qnty_product !== "0" && parseInt(product.qnty_product) > 0)
        .map(product => transformProductData(product, baseUrl));
    }

    throw new Error(`Failed to fetch products: ${response.data.status}`);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchSingleProduct = async (productId: number): Promise<Product> => {
  try {
    console.log(`Fetching single product with ID: ${productId}`);
    const timestamp = new Date().getTime();
    const response = await axios.get(
      `${API_ENDPOINTS.getArticles}?id_product=${productId}&timestamp=${timestamp}`
    );
    const baseUrl = new URL(API_ENDPOINTS.getArticles).origin;

    console.log('Single product API Response:', response.data);

    if (response.data.status === 'success' && Array.isArray(response.data.products) && response.data.products.length > 0) {
      const product = response.data.products[0];
      return transformProductData(product, baseUrl);
    }

    throw new Error(`Product not found with ID: ${productId}`);
  } catch (error) {
    console.error('Error fetching single product:', error);
    throw error;
  }
};