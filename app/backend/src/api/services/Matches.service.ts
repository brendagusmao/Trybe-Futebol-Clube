import teams from '../../database/models/TeamModel';
import matches from '../../database/models/MatchModel';

class MatchService {
  public getMatchs = async () => {
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
    return allMatches;
  };
}

export default MatchService;
