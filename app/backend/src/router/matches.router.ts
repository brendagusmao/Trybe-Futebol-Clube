import { Router } from 'express';
import MatchesController from '../api/controllers/Matches.controller';
import { jwtValidate } from '../api/auth/Jwt';

const matchesController = new MatchesController();
const router = Router();

router.get('/', matchesController.getAllTeam);
router.patch('/:id/finish', jwtValidate, matchesController.endMatch);

export default router;
