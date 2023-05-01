import { AutoComplete, Col, Input, Row, Select } from 'antd';
import React, { FC } from 'react';

interface Props {
  autoCompleteOptions: Array<Object>;
  selectOptions: Array<Object>;
  inputValue: string;
  defaultSelectValue: string;
  onAutoCompleteSelect(value: string, option: any): any;
  onInputChange(event: React.ChangeEvent<HTMLInputElement>): any;
  onSelectChange(value: any): void;
}

const SearchBar: FC<Props> = ({
  autoCompleteOptions,
  selectOptions,
  inputValue,
  defaultSelectValue,
  onAutoCompleteSelect,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <Row gutter={8}>
      <Col>
        <AutoComplete options={autoCompleteOptions} onSelect={onAutoCompleteSelect} style={{ width: 300 }}>
          <Input placeholder="Start typing to search..." value={inputValue} onChange={onInputChange} />
        </AutoComplete>
      </Col>
      <Col>
        <Select defaultValue={defaultSelectValue} options={selectOptions} onChange={onSelectChange} style={{ width: 120 }} />
      </Col>
    </Row>
  );
};

export default SearchBar;
