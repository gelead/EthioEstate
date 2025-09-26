// routes/userRoutes.js
import express from 'express';
import { createUser, bookVisit, cancelBooking, getAllBooking, toFavourite, getAllFavourite } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/bookVisit/:id', bookVisit);
router.post('/getAllBooking', getAllBooking);
router.post('/removeBooking/:id', cancelBooking);
router.post('/addtoFavourite/:id', toFavourite )
router.post('/allFavourite', getAllFavourite)

export default router;
