import { Col, Input, Row, Select } from 'antd';
import React, { FC } from 'react';
import { SearchEntity } from '../../../Types/GithubSearch.types';

export interface SearchBarProps {
  defaultQuery?: string;
  defaultSelectedEntity?: SearchEntity;
  query: string;
  selectedEntity: string;
  entities: Array<Object>;
  onInputChange(event: React.ChangeEvent<HTMLInputElement>): any;
  onSelectChange(value: any): void;
}

const SearchBar: FC<SearchBarProps> = ({ entities, selectedEntity, query, defaultSelectedEntity, defaultQuery, onInputChange, onSelectChange }) => {
  return (
    <Row gutter={8}>
      <Col span={18}>
        <Input placeholder="Start typing to search..." value={query} onChange={onInputChange} defaultValue={defaultQuery} />
      </Col>
      <Col span={6}>
        <Select defaultValue={defaultSelectedEntity} value={selectedEntity} options={entities} onChange={onSelectChange} style={{ width: '100%' }} />
      </Col>
    </Row>
  );
};

export default SearchBar;
