import { Request, Response, NextFunction } from 'express';

import TeamRepository from '../services/Team.service';

const teams = new TeamRepository();

const matchValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res
      .status(422)
      .json({
        message: 'It is not possible to create a match with two equal teams',
      });
  }
  next();
};

const validationId = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const home = await teams.getIdTeam(homeTeamId);
  const away = await teams.getIdTeam(awayTeamId);

  if (!home || !away) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export {
  matchValidate,
  validationId,
};
