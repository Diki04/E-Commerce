import express from 'express'
import { protectedMiddleware, ownerMiddleware } from '../middlewares/authMiddleware.js'
import {CreateOrder, AllOrder, DetailOrder, CurrentUserOrder} from '../controllers/OrderController.js'

const router = express.Router()

//Post api/v1/order
// cuman diakses user auth
router.post('/', protectedMiddleware, CreateOrder)

// Get api/v1/order
// cuman diakses user role admin
router.get('/', protectedMiddleware, ownerMiddleware, AllOrder)

// Get api/v1/order/:id
// cuman diakses user role admin
router.get('/:id', protectedMiddleware, ownerMiddleware, DetailOrder)

// Get api/v1/order/current/user
// cuman diakses user auth
router.get('/current/user', protectedMiddleware, CurrentUserOrder)


export default router