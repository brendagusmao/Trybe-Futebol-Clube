import { Router } from 'express';
import TeamController from '../api/controllers/Team.controller';

const teamController = new TeamController();
const router = Router();

router.get('/', teamController.getAllTeam);

export default router;
