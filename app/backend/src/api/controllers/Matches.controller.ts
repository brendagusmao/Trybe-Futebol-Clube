import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  public service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public getAllTeam = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matchs = await this.service.getMatchs(inProgress as string);
    res.status(200).json(matchs);
  };
}

export default MatchesController;
