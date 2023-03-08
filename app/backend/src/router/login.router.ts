import { Router } from 'express';
import validateFields from '../api/middlewares/login.middleware';
import LoginController from '../api/controllers/Login.controller';

const loginController = new LoginController();
const router = Router();

router.post('/', validateFields, loginController.Login);

export default router;
