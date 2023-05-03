import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBarProps } from '../Components/Shared/SearchBar/SearchBar';
import { ENTITIES } from '../Constants';
import params from '../Router/params';
import { useSearchReposQuery, useSearchUsersQuery } from '../Store/Queries/GithubSearchApi';
import { GithubSearchResult, SearchEntity } from '../Types/GithubSearch.types';
import useDebounce from './useDebounce';

type UseSearch = (options?: { useParams?: boolean; searchAllOption?: boolean }) => {
  searchProps: SearchBarProps;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  users: GithubSearchResult | undefined;
  repositories: GithubSearchResult | undefined;
};

const MINIMUM_SEARCHABLE_LENGTH = 3;

const useSearch: UseSearch = options => {
  const entities = useMemo(() => {
    return Object.values(ENTITIES).map((item: string) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }));
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const entityParam = ((options?.useParams ? searchParams.get(params.type) : entities[0].value) || entities[0].value) as SearchEntity;
  const queryParam = (options?.useParams ? searchParams.get(params.q) : '') || '';

  const [selectedEntity, setEntity] = useState<SearchEntity>(entityParam);
  const [searchQuery, setQuery] = useState<string>(queryParam);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setSearchParams({ q: queryParam, type: entityParam });
  }, []);

  const debouncedSearchQuery = useDebounce(searchQuery);

  const { data: users } = useSearchUsersQuery(
    { query: debouncedSearchQuery, page: page },
    { skip: selectedEntity === ENTITIES.REPOSITORIES || debouncedSearchQuery.length < MINIMUM_SEARCHABLE_LENGTH },
  );

  const { data: repositories } = useSearchReposQuery(
    { query: debouncedSearchQuery, page: page },
    { skip: selectedEntity === ENTITIES.USERS || debouncedSearchQuery.length < MINIMUM_SEARCHABLE_LENGTH },
  );

  const selectEntity = (value: SearchEntity) => {
    if (searchQuery.length < 3) setQuery('');
    setPage(1);
    setEntity(value);
    if (options?.useParams) setSearchParams({ q: searchQuery, type: value });
  };

  const onSearchQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setQuery(event.target.value);
    if (options?.useParams) setSearchParams({ q: event.target.value, type: selectedEntity });
  };

  return {
    searchProps: {
      defaultQuery: queryParam,
      defaultSelectedEntity: entityParam,
      query: searchQuery,
      selectedEntity: selectedEntity,
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
