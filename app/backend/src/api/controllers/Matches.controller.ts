import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';
import TeamRepository from '../services/Team.service';

// const teams = new TeamRepository();

class MatchesController {
  public service: MatchesService;
  public teams: TeamRepository;

  constructor() {
    this.service = new MatchesService();
    this.teams = new TeamRepository();
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

  public createMatches = async (req: Request, res: Response):Promise<Response | void> => {
    const { homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals } = req.body;

    // const home = await teams.getIdTeam(homeTeamId);
    // const away = await teams.getIdTeam(awayTeamId);

    // if (!home || !away) {
    //   return res.status(404).json({ message: 'There is no team with such id!' });
    // }

    const match = await this.service.createMatch({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    });

    res.status(201).json(match);
  };
}

export default MatchesController;
