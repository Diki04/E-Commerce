import express from 'express'
import { protectedMiddleware, ownerMiddleware } from '../middlewares/authMiddleware.js'
import {CreateProduct, AllProduct,DetailProduct, UpdateProduct, DeleteProduct, FileUpload } from '../controllers/ProductController.js'
import { upload } from '../utils/uploadFileHandler.js'

const router = express.Router()

// CRUD Product

// Create Data Product
// POST /api/v1/products
// middleware owner
router.post('/',protectedMiddleware, ownerMiddleware, CreateProduct )

// Read Data Product
// GET /api/v1/products
router.get('/', AllProduct )

// Detail Data Product
// GET /api/v1/products/:id
router.get('/:id', DetailProduct )

// Update Data Product
// PUT /api/v1/products/:id
// middleware owner
router.put('/:id',protectedMiddleware, ownerMiddleware, UpdateProduct )

// Delete Data Product
// DELETE /api/v1/products/:id
// middleware owner
router.delete('/:id',protectedMiddleware, ownerMiddleware, DeleteProduct )

// File Upload Data Product
// POST /api/v1/products/file-upload
// middleware owner
router.post('/file-upload',protectedMiddleware, ownerMiddleware, upload.single('image'), FileUpload )

export default router