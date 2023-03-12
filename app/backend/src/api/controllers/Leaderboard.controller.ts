import { Request, Response } from 'express';
import LeadBoardService from '../services/Leaderboard.service';
// import { IHomeMatch } from '../interfaces/IBoard';
// import ITeam from '../interfaces/ITeams';

class TeamController {
  public service: LeadBoardService;

  constructor() {
    this.service = new LeadBoardService();
  }

  public leaderboardHome = async (req: Request, res: Response) => {
    const ranking = await this.service.sortLeaderboardHome();
    if (!ranking) return res.status(404).json();
    console.log('aqui', ranking);
    return res.status(200).json(ranking);
  };
}

export default TeamController;
