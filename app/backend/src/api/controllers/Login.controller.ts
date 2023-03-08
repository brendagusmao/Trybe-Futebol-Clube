import { Request, Response } from 'express';
import { jwtCreate } from '../auth/Jwt';
import LoginService from '../services/Login.service';

class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userToken = await this.service.login({ email, password });

    if (!userToken) return res.status(400).json({ message: 'All fields must be filled' });

    const { id, username } = userToken;
    const token = jwtCreate({ id, username });

    return res.status(200).json({ token });
  };
}

export default LoginController;
