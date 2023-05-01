import { Col, Image, Layout, Row, Switch, Card, Avatar, Typography, Divider, Tag, Space } from 'antd';
import Assets from '../../Assets';
import { FixLayout, SearchBar } from '../../Components';
import useSearchBar from '../../Hooks/useSearchBar';
import { useTheme } from '../../Theme';
import { useSearchQuery } from '../../Store/Queries/GithubSearchApi';
import useDebounce from '../../Hooks/useDebounce';
import { FC, useEffect } from 'react';
import { GithubRepo, GithubUser } from '../../Types/GithubSearch.types';
import Meta from 'antd/es/card/Meta';
import { ENTITIES } from '../../Constants';
import { StarOutlined } from '@ant-design/icons';
import Transformer from '../../Utils/Transformer';
import { formatDistance } from 'date-fns';

const { Header, Content } = Layout;

const LOGO_SIZE = 40;

function SearchPage() {
  const { theme, isDark, toggleTheme } = useTheme();
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
      console.log(data);
      setAutocompleteOptions(data?.items);
    }
  }, [data]);

  const onSelect = () => {};

  return (
    <Layout>
      <Header>
        <Row justify={'center'} align={'middle'} gutter={16}>
          <Col span={2}>
            <Image src={Assets.logos.github[theme.type]} style={{ width: LOGO_SIZE, height: LOGO_SIZE }} preview={false} />
          </Col>
          <Col span={16} style={{}}>
            <SearchBar
              autoCompleteOptions={autoCompleteOptions}
              selectOptions={entities}
              inputValue={searchQuery}
              defaultSelectValue={selectedEntity}
              onAutoCompleteSelect={onSelect}
              onInputChange={onSearchQueryChange}
              onSelectChange={selectEntity}
            />
          </Col>
          <Col span={2}>
            <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={isDark} onChange={toggleTheme} />
          </Col>
        </Row>
      </Header>

      <Layout>
        <Content style={{ padding: '20px 150px' }}>
          <Row gutter={[14, 16]} wrap>
            {data?.items.map(item => {
              return (
                <Col span={8}>
                  {selectedEntity === ENTITIES.USERS ? <UserCard user={item as GithubUser} /> : <RepositoryCard repo={item as GithubRepo} />}
                </Col>
              );
            })}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default SearchPage;

const UserCard: FC<{ user: GithubUser }> = ({ user }) => {
  const onClick = () => {
    window.location = user.html_url as Location | (string & Location);
  };
  return (
    <Card onClick={onClick} size="small" hoverable>
      <Meta avatar={<Avatar src={user.avatar_url} />} title={user.login} />
    </Card>
  );
};

const RepositoryCard: FC<{ repo: GithubRepo }> = ({ repo }) => {
  const onClick = () => {
    window.location = repo.html_url as Location | (string & Location);
  };
  return (
    <Card onClick={onClick} size="small" hoverable>
      <Meta avatar={<Avatar src={repo.owner.avatar_url} />} title={`${repo.owner.login}/${repo.name}`} />

      <Divider />

      <Space direction="vertical" size={[0, 8]}>
        <Space size={[0, 8]} wrap>
          {repo.topics.slice(0, 5).map(topic => {
            return <Tag bordered={false}>{topic}</Tag>;
          })}
        </Space>

        <Typography>
          {repo.language && <Typography.Text> {repo.language} . </Typography.Text>}

          {repo.stargazers_count && (
            <>
              <StarOutlined />
              <Typography.Text> {Transformer.NumberFormat(repo.stargazers_count)}</Typography.Text>
            </>
          )}
          {repo.updated_at && <Typography.Text> . updated {elapsedTime(new Date(repo.updated_at), new Date())} ago</Typography.Text>}
        </Typography>
      </Space>
    </Card>
  );
};

function elapsedTime(start: Date, end: Date) {
  return formatDistance(start, end);
}
