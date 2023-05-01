import { Divider, Typography } from 'antd';
import { ChangeEvent, FC, ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { ENTITIES } from '../Constants';
import { SearchEntity } from '../Types/GithubSearch.types';
import Transformer from '../Utils/Transformer';

interface ISearchBar {
  onSearchQueryChange(event: ChangeEvent<HTMLInputElement>): void;
  setAutocompleteOptions(list: Array<any>, query?: string): void;
  selectEntity(value: SearchEntity): void;
  selectedEntity: SearchEntity;
  autoCompleteOptions: Array<{ value: string; label: string | Element; searchAll: boolean }>;
  searchQuery: string;
  entities: Array<{ value: string; label: string }>;
  minimumSearchLength: number;
}

const SearchBarContext = createContext<ISearchBar | undefined>(undefined);
const MINIMUM_SEARCHABLE_LENGTH = 3;
const SEARCH_ALL_POSTFIX = '_search_query';

export const SearchBarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const entities = useMemo(() => {
    return Object.values(ENTITIES).map((item: string) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }));
  }, []);

  const [selectedEntity, setEntity] = useState<SearchEntity>(entities[0].value as SearchEntity);
  const [searchQuery, setQuery] = useState('');
  const [autoCompleteOptions, setOptions] = useState<any>([]);

  const selectEntity = (value: SearchEntity) => {
    setEntity(value);
  };

  const onSearchQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (searchQuery.length < MINIMUM_SEARCHABLE_LENGTH) setOptions([]);
    setQuery(event.target.value);
  };

  const setAutocompleteOptions = (list: Array<any>, query?: string) => {
    const options = [];

    if (query) {
      options.push({
        label: <>Search</>,
        options: [{ value: query.concat(SEARCH_ALL_POSTFIX), label: renderOriginalQuery(query), searchAll: true }],
      });
    }

    options.push({
      label: (
        <>
          {query && <Divider />}
          <Typography.Text strong>{selectedEntity}</Typography.Text>
        </>
      ),
      options: [...Transformer.MapResultsToAutocomplete(list, selectedEntity)],
    });

    setOptions(options);
  };

  return (
    <SearchBarContext.Provider
      value={{
        onSearchQueryChange,
        setAutocompleteOptions,
        autoCompleteOptions,
        selectEntity,
        selectedEntity,
        searchQuery,
        entities,
        minimumSearchLength: MINIMUM_SEARCHABLE_LENGTH,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};

const useSearchBar = () => {
  const context = useContext(SearchBarContext);
  if (context === undefined) {
    throw new Error('useSearchBar must be used within a SearchBarProvider');
  }
  return context;
};

const renderOriginalQuery = (query: string) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {query}
      <span>Search all of Github</span>
    </div>
  );
};

export default useSearchBar;
