import { AutoComplete, Col, Input, Row, Select } from 'antd';
import React, { FC } from 'react';
import { SearchEntity } from '../../../Types/GithubSearch.types';

export interface SearchBarProps {
  defaultQuery?: string;
  defaultSelectedEntity?: SearchEntity;
  query: string;
  selectedEntity: string;
  autoCompleteOptions: Array<Object>;
  entities: Array<Object>;
  onInputChange(event: React.ChangeEvent<HTMLInputElement>): any;
  onSelectChange(value: any): void;
  onPressEnter?(): void;
  onAutoCompleteSelect?(value: string, option: any): any;
}

const SearchBar: FC<SearchBarProps> = ({
  autoCompleteOptions,
  entities,
  selectedEntity,
  query,
  defaultSelectedEntity,
  defaultQuery,
  onAutoCompleteSelect,
  onInputChange,
  onSelectChange,
  onPressEnter,
}) => {
  return (
    <Row gutter={8}>
      <Col span={18}>
        <AutoComplete options={autoCompleteOptions} onSelect={onAutoCompleteSelect} style={{ width: '100%' }} defaultValue={defaultQuery}>
          <Input
            placeholder="Start typing to search..."
            value={query}
            onChange={onInputChange}
            defaultValue={defaultQuery}
            onPressEnter={onPressEnter}
          />
        </AutoComplete>
      </Col>
      <Col span={6}>
        <Select defaultValue={defaultSelectedEntity} value={selectedEntity} options={entities} onChange={onSelectChange} style={{ width: '100%' }} />
      </Col>
    </Row>
  );
};

export default SearchBar;
