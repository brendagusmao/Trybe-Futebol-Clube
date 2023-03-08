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

  public getTeamId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.service.getIdTeam(id);
    return res.status(200).json(team);
  };
}

export default TeamController;
