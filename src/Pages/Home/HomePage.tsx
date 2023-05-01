import { Col, Image, Layout, Row, Switch, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Assets from '../../Assets';
import { FixLayout, SearchBar } from '../../Components';
import useDebounce from '../../Hooks/useDebounce';
import useSearchBar from '../../Hooks/useSearchBar';
import { useSearchQuery } from '../../Store/Queries/GithubSearchApi';
import { useTheme } from '../../Theme';
import { SEARCH_ROUTE } from '../../Router/routes';

const { Title, Paragraph } = Typography;

const LOGO_SIZE = 50;

export default function HomePage() {
  const { theme, isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const {
    selectEntity,
    setAutocompleteOptions,
    autoCompleteOptions,
    onSearchQueryChange,
    selectedEntity,
    searchQuery,
    entities,
    minimumSearchLength,
  } = useSearchBar();

  const debouncedSearchQuery = useDebounce(searchQuery);

  const { data } = useSearchQuery(
    { query: debouncedSearchQuery, page: 1, entity: selectedEntity },
    { skip: debouncedSearchQuery.length < minimumSearchLength },
  );

  useEffect(() => {
    if (data) {
      setAutocompleteOptions(data.items, debouncedSearchQuery);
    }
  }, [data]);

  const onSelect = (value: string, option: { value: string; label: string; searchAll: boolean }) => {
    if (option.searchAll) {
      return navigate(SEARCH_ROUTE(selectedEntity, debouncedSearchQuery));
    }
  };

  return (
    <Layout>
      <FixLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div>
            <Row justify={'center'} align={'middle'} gutter={16}>
              <Col span={4}>
                <Image src={Assets.logos.github[theme.type]} style={{ width: LOGO_SIZE, height: LOGO_SIZE }} preview={false} />
              </Col>
              <Col span={16}>
                <Typography>
                  <Title level={3} style={{ fontSize: 20, lineHeight: 0 }}>
                    GitHub Searcher
                  </Title>
                  <Paragraph>Search users or repositories below</Paragraph>
                </Typography>
              </Col>
              <Col span={4}>
                <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={isDark} onChange={toggleTheme} />
              </Col>
            </Row>

            <SearchBar
              autoCompleteOptions={autoCompleteOptions}
              selectOptions={entities}
              inputValue={searchQuery}
              defaultSelectValue={selectedEntity}
              onAutoCompleteSelect={onSelect}
              onInputChange={onSearchQueryChange}
              onSelectChange={selectEntity}
            />
          </div>
        </div>
      </FixLayout>
    </Layout>
  );
}
