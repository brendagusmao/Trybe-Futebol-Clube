import { Request, Response } from 'express';
import LeadBoardService from '../services/Leaderboard.service';
import LeaderboardHome from '../utils/LeaderboardHome';
import { IMatcheBoard } from '../interfaces/IBoard';
import ITeam from '../interfaces/ITeams';

class TeamController {
  public service: LeadBoardService;

  constructor() {
    this.service = new LeadBoardService();
  }

  public leaderboardHome = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboard();
    const result = await LeaderboardHome(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);
    return res.status(200).json(result);
  };
}

export default TeamController;
