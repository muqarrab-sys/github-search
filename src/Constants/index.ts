import { SearchEntity } from '../Types/GithubSearch.types';

export const THEME_MODE = 'theme:mode';

export const ENTITIES: IEntities = {
  USERS: 'users',
  REPOSITORIES: 'repositories',
};

interface IEntities {
  USERS: SearchEntity;
  REPOSITORIES: SearchEntity;
}
