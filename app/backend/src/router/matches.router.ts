import { Router } from 'express';
import MatchesController from '../api/controllers/Matches.controller';
import { jwtValidate } from '../api/auth/Jwt';

const matchesController = new MatchesController();
const router = Router();

router.get('/', matchesController.getAllMatches);
router.patch('/:id/finish', jwtValidate, matchesController.endMatches);
router.patch('/:id', jwtValidate, matchesController.updateMatches);

export default router;
