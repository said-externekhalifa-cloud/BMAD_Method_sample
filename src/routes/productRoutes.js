const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - stock
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID auto-généré du produit.
 *         name:
 *           type: string
 *           description: Le nom du produit.
 *         description:
 *           type: string
 *           description: La description du produit.
 *         price:
 *           type: number
 *           format: float
 *           description: Le prix du produit.
 *         stock:
 *           type: integer
 *           description: La quantité en stock.
 *         category:
 *           type: string
 *           description: La catégorie du produit.
 *       example:
 *         id: 1
 *         name: "Ordinateur Portable"
 *         description: "Un ordinateur portable puissant pour le développement."
 *         price: 1200.50
 *         stock: 15
 *         category: "Électronique"
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API pour la gestion des produits
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retourne la liste de tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: La liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.route('/')
  .get(productController.getAllProducts)
  /**
   * @swagger
   * /api/products:
   *   post:
   *     summary: Crée un nouveau produit
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       201:
   *         description: Le produit a été créé avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: Erreur de requête.
   */
  .post(productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupère un produit par son ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du produit
 *     responses:
 *       200:
 *         description: La description du produit par ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Le produit n'a pas été trouvé.
 */
router.route('/:id')
  .get(productController.getProductById)
  /**
   * @swagger
   * /api/products/{id}:
   *   put:
   *     summary: Met à jour un produit par son ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: L'ID du produit
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       200:
   *         description: Le produit a été mis à jour.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Le produit n'a pas été trouvé.
   *       400:
   *         description: Erreur de requête.
   */
  .put(productController.updateProduct)
  /**
   * @swagger
   * /api/products/{id}:
   *   delete:
   *     summary: Supprime un produit par son ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: L'ID du produit
   *     responses:
   *       204:
   *         description: Le produit a été supprimé.
   *       404:
   *         description: Le produit n'a pas été trouvé.
   */
  .delete(productController.deleteProduct);

module.exports = router;
