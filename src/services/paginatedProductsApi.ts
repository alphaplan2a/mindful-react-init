import axios from 'axios';
import { Product } from '../types/product';
import { API_ENDPOINTS } from '../config/apiConfig';

export const fetchPaginatedProducts = async (
  page: number = 1,
  limit: number = 10,
  nbItems: number = 10
): Promise<{
  products: Product[];
  totalPages?: number;
  currentPage?: number;
}> => {
  try {
    console.log('Fetching products with params:', { page, limit, nbItems });

    const url = new URL(API_ENDPOINTS.getArticles);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('nb_items_passed', nbItems.toString());

    console.log('Final API URL:', url.toString());

    const response = await axios.get(url.toString());

    if (response.data.status === 'success') {
      const products = response.data.products
        .filter(product => product.qnty_product !== "0" && parseInt(product.qnty_product) > 0)
        .map(product => ({
          id: parseInt(product.id_product),
          name: product.nom_product,
          material: product.type_product,
          color: product.color_product,
          price: parseFloat(product.price_product) || 0.0,
          image: `${url.origin}/${product.img_product}?format=webp&quality=60`,
          image2: product.img2_product ? `${url.origin}/${product.img2_product}?format=webp&quality=60` : undefined,
          image3: product.img3_product ? `${url.origin}/${product.img3_product}?format=webp&quality=60` : undefined,
          image4: product.img4_product ? `${url.origin}/${product.img4_product}?format=webp&quality=60` : undefined,
          description: product.description_product,
          status: product.status_product,
          reference: product.reference_product,
          itemGroup: product.itemgroup_product,
          relatedProducts: product.related_products,
          colorProduct: product.color_product,
          discount_product: product.discount_product || "",
          type_product: product.type_product,
          category_product: product.category_product,
          itemgroup_product: product.itemgroup_product,
          sizes: {
            s: parseInt(product.s_size) || 0,
            m: parseInt(product.m_size) || 0,
            l: parseInt(product.l_size) || 0,
            xl: parseInt(product.xl_size) || 0,
            xxl: parseInt(product.xxl_size) || 0,
            "3xl": parseInt(product["3xl_size"]) || 0,
            "48": parseInt(product["48_size"]) || 0,
            "50": parseInt(product["50_size"]) || 0,
            "52": parseInt(product["52_size"]) || 0,
            "54": parseInt(product["54_size"]) || 0,
            "56": parseInt(product["56_size"]) || 0,
            "58": parseInt(product["58_size"]) || 0,
          },
          quantity: parseInt(product.qnty_product) || 0,
        }));

      console.log('Fetched products count:', products.length);

      return {
        products,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage
      };
    }
    throw new Error(`Failed to fetch products: ${response.data.status}`);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};