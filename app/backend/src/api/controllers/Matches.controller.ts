import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  public service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matchs = await this.service.getMatchs(inProgress as string);
    res.status(200).json(matchs);
  };

  public endMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.service.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'update successfully' });
  };
}

export default MatchesController;
