import {
  calculatePoints,
  calculateVictories,
  calculateLosses,
  calculateDraw,
  calcularGolsFavor,
  calcularGolsContra,
  calculateTotalScore,
  calculateVictoriesPercentage,
} from '../utils/LeaderboardHome';
import TeamService from './Team.service';
import MatchesService from './Matches.service';
import Match from '../../database/models/MatchModel';
import Team from '../../database/models/TeamModel';
import { IHomeMatch } from '../interfaces/IBoard';

class LeaderboardService {
  public matches: MatchesService;
  public serviceTeam: TeamService;

  constructor() {
    this.matches = new MatchesService();
    this.serviceTeam = new TeamService();
  }

  public getAllHomeTeamMatches = async () => {
    const result = await Match.findAll({
      where: {
        inProgress: false,
      },
    });
    return result as unknown as IHomeMatch[];
  };

  public leaderboardHome = async () => {
    const homeTeams = await Team.findAll();
    const homeTeamMatches = await this.getAllHomeTeamMatches();
    const matchMap = homeTeams.map((e) => {
      const home = homeTeamMatches.filter((match) => match.homeTeamId === e.id);
      return {
        name: e.teamName,
        totalPoints: calculatePoints(home),
        totalGames: home.length,
        totalVictories: calculateVictories(home),
        totalDraws: calculateDraw(home),
        totalLosses: calculateLosses(home),
        goalsFavor: calcularGolsFavor(home),
        goalsOwn: calcularGolsContra(home),
        goalsBalance: calculateTotalScore(home),
        efficiency: calculateVictoriesPercentage(home),
      };
    });
    return matchMap;
  };

  public sortLeaderboardHome = async () => {
    const leader = await this.leaderboardHome();
    const result = leader.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );
    return result;
  };
}

export default LeaderboardService;
