import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  public service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public getAllTeam = async (req: Request, res: Response) => {
    const matchs = await this.service.getMatchs();
    res.status(200).json(matchs);
  };
}

export default MatchesController;
