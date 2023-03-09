import teams from '../../database/models/TeamModel';
import matches from '../../database/models/MatchModel';

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
}

export default MatchService;
