import { ENTITIES } from '../Constants';
import { GithubRepo, GithubUser } from '../Types/GithubSearch.types';

export default class Mappers {
  static GithubResultsToAutocomplete(
    data: Array<GithubUser | GithubRepo>,
    type: string,
  ): Array<{ value: string; label: string | Element; url: string }> {
    if (!data) return [];

    if (type === ENTITIES.USERS)
      return data.map(item => ({ value: (item as GithubUser).login, label: (item as GithubUser).login, url: item.html_url }));
    if (type === ENTITIES.REPOSITORIES)
      return data.map(item => ({ value: (item as GithubRepo).full_name, label: (item as GithubRepo).full_name, url: item.html_url }));

    return [];
  }
}
