// Création d'une instance d'Axios pré-configurée
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonctions exportées pour interagir avec l'API des produits
const api = {
  getProducts: () => {
    return apiClient.get('/products');
  },
  createProduct: (productData) => {
    return apiClient.post('/products', productData);
  },
  getProductById: (id) => {
    return apiClient.get(`/products/${id}`);
  },
  updateProduct: (id, productData) => {
    return apiClient.put(`/products/${id}`, productData);
  },
  deleteProduct: (id) => {
    return apiClient.delete(`/products/${id}`);
  },
};
