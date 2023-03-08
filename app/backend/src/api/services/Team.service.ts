import teams from '../../database/models/TeamModel';
import Team from '../interfaces/ITeams';

class TeamService {
  public FindAll = async (): Promise<Team[]> => teams.findAll();
  public getIdTeam = async (id: string): Promise<Team | null> => teams.findByPk(id);
}

export default TeamService;
