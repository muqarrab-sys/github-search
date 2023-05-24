import { Col, Input, Row, Select, Spin, theme } from 'antd';
import React, { FC } from 'react';
import { SearchEntity } from '~/Types/GithubSearch.types';

export interface SearchBarProps {
  defaultQuery?: string;
  defaultSelectedEntity?: SearchEntity;
  query: string;
  selectedEntity: string;
  entities: Array<object>;
  loading?: boolean;
  onInputChange(event: React.ChangeEvent<HTMLInputElement>): any;
  onSelectChange(value: any): void;
}

const SearchBar: FC<SearchBarProps> = ({
  entities,
  selectedEntity,
  query,
  defaultSelectedEntity,
  defaultQuery,
  onInputChange,
  onSelectChange,
  loading,
}) => {
  const { token } = theme.useToken();

  return (
    <Row gutter={token.sizeXS}>
      <Col sm={14} md={16}>
        <Input
          placeholder="Start typing to search..."
          value={query}
          onChange={onInputChange}
          defaultValue={defaultQuery}
          style={{ width: '100%' }}
          suffix={loading ? <Spin style={{ display: 'flex' }} /> : undefined}
        />
      </Col>
      <Col sm={10} md={8}>
        <Select defaultValue={defaultSelectedEntity} value={selectedEntity} options={entities} onChange={onSelectChange} style={{ width: '100%' }} />
      </Col>
    </Row>
  );
};

export default SearchBar;
