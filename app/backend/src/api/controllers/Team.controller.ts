import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

class TeamController {
  public service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public getAllTeam = async (req: Request, res: Response) => {
    const allTeams = await this.service.FindAll();
    return res.status(200).json(allTeams);
  };
}

export default TeamController;
