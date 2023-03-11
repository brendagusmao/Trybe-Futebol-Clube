import { IMatcheBoard, ILeaderBoadDTO } from '../interfaces/IBoard';
import ITeam from '../interfaces/ITeams';

const totalPoints = (teamMatches: IMatcheBoard[]) => {
  const points = teamMatches.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 3;
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return points;
};

export const winsHome = (teamMatches: IMatcheBoard[]) => {
  const victories = teamMatches.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return victories;
};

export const totalTies = (teamMatches: IMatcheBoard[]) => {
  const ties = teamMatches.reduce((acc, game) => {
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return ties;
};

export const defeatsHome = (teamMatches: IMatcheBoard[]) => {
  const derrotas = teamMatches.reduce((acc, game) => {
    if (game.homeTeamGoals < game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return derrotas;
};

export const goalAway = (teamMatches: IMatcheBoard[]) => {
  const gols = teamMatches.reduce((acc, game) => acc + game.awayTeamGoals, 0);
  return gols;
};

export const goalHome = (teamMatches: IMatcheBoard[]) => {
  const gols = teamMatches.reduce((acc, game) => acc + game.homeTeamGoals, 0);
  return gols;
};

export const classificationSort = (classification: ILeaderBoadDTO[]) => {
  const sort = classification.sort(
    (a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn,
  );
  return sort;
};

const efficiency = (teamMatches: IMatcheBoard[]) => {
  const points = totalPoints(teamMatches);
  const partidas = teamMatches.length;
  const eficiencia = ((points / (partidas * 3)) * 100).toFixed(2);
  return { eficiencia, partidas, points };
};

const teamresult = (time: ITeam, teamMatches: IMatcheBoard[]) => {
  const { eficiencia, partidas, points } = efficiency(teamMatches);
  const result: ILeaderBoadDTO = {
    name: time.teamName,
    totalPoints: points,
    totalGames: partidas,
    totalVictories: winsHome(teamMatches),
    totalDraws: totalTies(teamMatches),
    totalLosses: defeatsHome(teamMatches),
    goalsFavor: goalHome(teamMatches),
    goalsOwn: goalAway(teamMatches),
    goalsBalance: goalHome(teamMatches) - goalAway(teamMatches),
    efficiency: eficiencia,
  };
  return result;
};

const LeaderboardUtilsHome = async (
  matchesFinish: IMatcheBoard[],
  allTeams: ITeam[],
) => {
  const classification: ILeaderBoadDTO[] = await allTeams.map((time) => {
    const matchesTime: IMatcheBoard[] = matchesFinish.filter(
      (e) => e.homeTeam === time.id,
    );
    return teamresult(time, matchesTime);
  });
  return classificationSort(classification);
};

export default LeaderboardUtilsHome;
