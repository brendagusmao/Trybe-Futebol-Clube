import { Router } from 'express';
import MatchesController from '../api/controllers/Matches.controller';

const matchesController = new MatchesController();
const router = Router();

router.get('/', matchesController.getAllTeam);

export default router;
