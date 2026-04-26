document.addEventListener('DOMContentLoaded', () => {
  const productTableContainer = document.getElementById('product-table-container');
  const productForm = document.getElementById('product-form');
  const loadingIndicator = document.getElementById('loading-indicator');
  const productModal = new bootstrap.Modal(document.getElementById('productModal'));
  const productModalLabel = document.getElementById('productModalLabel');

  // Fonction pour afficher les produits et mettre à jour le graphique
  async function fetchAndDisplayProducts() {
    loadingIndicator.style.display = 'block';
    productTableContainer.innerHTML = '';

    try {
      const response = await api.getProducts();
      const products = response.data;

      // Agréger les stocks par catégorie pour le graphique
      const aggregatedData = products.reduce((acc, product) => {
        const category = product.category || 'Sans catégorie'; // Gérer les produits sans catégorie
        if (!acc[category]) {
          acc[category] = { category: category, stock: 0 };
        }
        acc[category].stock += product.stock;
        return acc;
      }, {});
      const chartData = Object.values(aggregatedData);

      // Mettre à jour le graphique avec les données agrégées
      updateChart(chartData);

      if (products.length === 0) {
          productTableContainer.innerHTML = '<p class="text-center">Aucun produit à afficher pour le moment.</p>';
      } else {
          const table = document.createElement('table');
          table.className = 'table table-striped table-hover';
          table.innerHTML = `
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          `;
          const tbody = table.querySelector('tbody');
          products.forEach(product => {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price} €</td>
                <td>${product.stock}</td>
                <td>
                  <button class="btn btn-sm btn-warning edit-btn" data-id="${product.id}">Modifier</button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${product.id}">Supprimer</button>
                </td>
              `;
              tbody.appendChild(tr);
          });
          productTableContainer.appendChild(table);
      }
    } catch (error) {
      productTableContainer.innerHTML = '<p class="text-center text-danger">Impossible de charger les produits.</p>';
      console.error('Erreur lors de la récupération des produits:', error);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }

  // Ouvre le modal en mode "Ajout"
  document.getElementById('addProductBtn').addEventListener('click', () => {
      productModalLabel.textContent = 'Ajouter un Nouveau Produit';
      productForm.reset();
      document.getElementById('product-id').value = '';
  });

  // Gestion de la soumission du formulaire (Création ou Mise à jour)
  productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const productId = document.getElementById('product-id').value;
      const productData = {
          name: document.getElementById('name').value,
          description: document.getElementById('description').value,
          price: parseFloat(document.getElementById('price').value),
          stock: parseInt(document.getElementById('stock').value),
          category: document.getElementById('category').value,
      };

      try {
          if (productId) {
              await api.updateProduct(productId, productData);
          } else {
              await api.createProduct(productData);
          }
          
          productModal.hide();
          await fetchAndDisplayProducts();
      } catch (error) {
          console.error('Erreur:', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
      }
  });

  // Gestion des clics sur les boutons Modifier et Supprimer
  productTableContainer.addEventListener('click', async (e) => {
      const target = e.target;
      const id = target.dataset.id;

      if (target.classList.contains('edit-btn')) {
          try {
              const response = await api.getProductById(id);
              const product = response.data;

              productModalLabel.textContent = 'Modifier le Produit';
              document.getElementById('product-id').value = product.id;
              document.getElementById('name').value = product.name;
              document.getElementById('description').value = product.description;
              document.getElementById('price').value = product.price;
              document.getElementById('stock').value = product.stock;
              document.getElementById('category').value = product.category;

              productModal.show();
          } catch(error) {
              console.error('Erreur lors de la récupération du produit:', error);
              alert('Impossible de charger les données du produit.');
          }
      }

      if (target.classList.contains('delete-btn')) {
          if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
              try {
                  await api.deleteProduct(id);
                  await fetchAndDisplayProducts();
              } catch (error) {
                  console.error('Erreur lors de la suppression:', error);
                  alert('Une erreur est survenue lors de la suppression.');
              }
          }
      }
  });

  // Charger les produits au chargement de la page
  fetchAndDisplayProducts();
});
