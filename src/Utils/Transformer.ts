import { ENTITIES } from '../Constants';
import { GithubRepo, GithubUser } from '../Types/GithubSearch.types';

export default class Transformer {
  static MapResultsToAutocomplete(
    data: Array<GithubUser | GithubRepo>,
    type: string,
  ): Array<{ value: string; label: string | Element; searchAll: boolean }> {
    if (!data) return [];

    if (type === ENTITIES.USERS)
      return data.map(item => ({ value: (item as GithubUser).login, label: (item as GithubUser).login, searchAll: false }));
    if (type === ENTITIES.REPOSITORIES)
      return data.map(item => ({ value: (item as GithubRepo).full_name, label: (item as GithubRepo).full_name, searchAll: false }));

    return [];
  }

  static NumberFormat(number: number) {
    return Intl.NumberFormat('en', { notation: 'compact' }).format(number);
  }
}
