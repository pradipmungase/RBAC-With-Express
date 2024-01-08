import express from 'express';
import userController from '../Controllers/userController.js';
const router = express.Router();

router.post('/createUser',userController.createUser);
router.post('/loginUser',userController.loginUser);
router.post('/getUser',userController.getUser);

export default router;