import teams from '../../database/models/TeamModel';
import matches from '../../database/models/MatchModel';
import IMatchCredentials from '../interfaces/IMatches';

class MatchService {
  public getMatchs = async (inProgress?: string) => {
    const allMatches = await matches.findAll({
      include: [
        {
          model: teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    if (inProgress) {
      return allMatches.filter((match) => String(match.inProgress) === inProgress);
    }

    return allMatches;
  };

  public finishMatch = async (id: number) => {
    await matches.update({ inProgress: false }, { where: { id } });
  };

  public updateMatch = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    await matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };

  public createMatch = async (match: IMatchCredentials): Promise<matches> => {
    const newMatche = await matches.create({ ...match, inProgress: true });
    console.log('aqui', newMatche);
    return newMatche;
  };
}

export default MatchService;
