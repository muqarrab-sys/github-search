import { Divider, Typography } from 'antd';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBarProps } from '../Components/SearchBar/SearchBar';
import { ENTITIES } from '../Constants';
import params from '../Router/params';
import { useSearchReposQuery, useSearchUsersQuery } from '../Store/Queries/GithubSearchApi';
import { GithubSearchResult, SearchEntity } from '../Types/GithubSearch.types';
import Mappers from '../Utils/Mappers';
import useDebounce from './useDebounce';

type UseSearch = (options?: { useParams?: boolean; searchAllOption?: boolean }) => {
  searchProps: SearchBarProps;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  users: GithubSearchResult | undefined;
  repositories: GithubSearchResult | undefined;
};

const MINIMUM_SEARCHABLE_LENGTH = 3;
const SEARCH_ALL_POSTFIX = '_search_query';

const useSearch: UseSearch = options => {
  const entities = useMemo(() => {
    return Object.values(ENTITIES).map((item: string) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }));
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(params.q) || '';
  const entity = (searchParams.get(params.type) as SearchEntity) || undefined;

  const [selectedEntity, setEntity] = useState<SearchEntity>(options?.useParams ? entity : (entities[0].value as SearchEntity));
  const [searchQuery, setQuery] = useState(options?.useParams ? query : '');
  const [page, setPage] = useState<number>(1);
  const [autoCompleteOptions, setOptions] = useState<any>([]);

  const debouncedSearchQuery = useDebounce(searchQuery);

  const { data: users } = useSearchUsersQuery(
    { query: debouncedSearchQuery, page: page },
    { skip: selectedEntity === ENTITIES.REPOSITORIES || debouncedSearchQuery.length < MINIMUM_SEARCHABLE_LENGTH },
  );

  const { data: repositories } = useSearchReposQuery(
    { query: debouncedSearchQuery, page: page },
    { skip: selectedEntity === ENTITIES.USERS || debouncedSearchQuery.length < MINIMUM_SEARCHABLE_LENGTH },
  );

  useEffect(() => {
    if (users) {
      setAutocompleteOptions(users.items, debouncedSearchQuery);
    }
    if (repositories) {
      setAutocompleteOptions(repositories.items, debouncedSearchQuery);
    }
  }, [users, repositories]);

  const selectEntity = (value: SearchEntity) => {
    setPage(1);
    setEntity(value);
    setSearchParams({ q: searchQuery, type: value });
  };

  const onSearchQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (searchQuery.length < MINIMUM_SEARCHABLE_LENGTH) setOptions([]);
    setPage(1);
    setQuery(event.target.value);
    setSearchParams({ q: event.target.value, type: selectedEntity });
  };

  const setAutocompleteOptions = (list: Array<any>, query?: string) => {
    const autocompleteOptions = [];

    if (options?.searchAllOption && query) {
      autocompleteOptions.push({
        label: <>Search</>,
        options: [
          {
            value: query.concat(SEARCH_ALL_POSTFIX),
            label: (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {query}
                <span>Search all of Github</span>
              </div>
            ),
            searchAll: true,
          },
        ],
      });
    }

    autocompleteOptions.push({
      label: (
        <>
          {options?.searchAllOption && query && <Divider />}
          <Typography.Text strong>{selectedEntity}</Typography.Text>
        </>
      ),
      options: [...Mappers.GithubResultsToAutocomplete(list, selectedEntity)],
    });

    setOptions(autocompleteOptions);
  };

  return {
    searchProps: {
      defaultQuery: query,
      defaultSelectedEntity: entity,
      query: searchQuery,
      selectedEntity: selectedEntity,
      autoCompleteOptions: autoCompleteOptions,
      entities,
      onInputChange: onSearchQueryChange,
      onSelectChange: selectEntity,
    },
    users,
    repositories,
    currentPage: page,
    setPage,
  };
};

export default useSearch;
