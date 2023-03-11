import TeamService from './Team.service';
import MatchesService from './Matches.service';

class LeaderboardService {
  public service: MatchesService;
  public serviceTeam: TeamService;

  constructor() {
    this.service = new MatchesService();
    this.serviceTeam = new TeamService();
  }

  public homeTeamLeaderboard = async () => {
    const allMatches = await this.service.getMatchs();
    const allTeams = await this.serviceTeam.FindAll();
    const matchesFinish = allMatches.filter((partida) => partida.inProgress === false);

    return { matchesFinish, allTeams };
  };
}

export default LeaderboardService;
