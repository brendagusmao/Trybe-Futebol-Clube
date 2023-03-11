export interface ILeaderBoadDTO {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface IMatcheBoard {
  id: number;
  homeTeam?: number;
  homeTeamGoals: number;
  awayTeam?: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string;
  };
  teamAway?: {
    teamName: string;
  };
}
