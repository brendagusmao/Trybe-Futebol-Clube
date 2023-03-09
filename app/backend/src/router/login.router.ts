import { Router } from 'express';
import validateFields from '../api/middlewares/login.middleware';
import LoginController from '../api/controllers/Login.controller';
import { jwtValidate } from '../api/auth/Jwt';

const loginController = new LoginController();
const router = Router();

router.post('/', validateFields, loginController.Login);
router.get('/role', jwtValidate, loginController.ValidateToken);

export default router;
