import { Router } from 'express';
import LeaderboardController from '../api/controllers/Leaderboard.controller';

const boardController = new LeaderboardController();
const router = Router();

router.get('/home', boardController.leaderboardHome);

export default router;
