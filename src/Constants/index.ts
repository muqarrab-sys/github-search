import { SearchEntity } from '../Types/GithubSearch.types';

export const THEME_TYPE = 'theme:type';

export const ENTITIES: IEntities = {
  USERS: 'users',
  REPOSITORIES: 'repositories',
};

interface IEntities {
  USERS: SearchEntity;
  REPOSITORIES: SearchEntity;
}
