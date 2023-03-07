import teams from '../../database/models/TeamModel';
import Team from '../interfaces/ITeams';

class TeamService {
  public FindAll = async (): Promise<Team[]> => teams.findAll();
}

export default TeamService;
