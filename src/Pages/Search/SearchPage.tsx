import { Col, Divider, Image, Layout, List, Row, Skeleton, Space, Spin, Switch } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Assets from '../../Assets';
import { FixLayout, SearchBar } from '../../Components/Shared';
import { RepositoryCard, UserCard } from '../../Components/Search';
import { ENTITIES } from '../../Constants';
import useSearch from '../../Hooks/useSearch';
import { useTheme } from '../../Theme';
import { GithubRepo, GithubUser } from '../../Types/GithubSearch.types';

const { Header, Content } = Layout;
const { USERS, REPOSITORIES } = ENTITIES;

const LOGO_SIZE = 40;

function SearchPage() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const { searchProps, setPage, users, repositories } = useSearch({ useParams: true });
  const { selectedEntity } = searchProps;

  const results = searchProps.selectedEntity === ENTITIES.USERS ? users : repositories;

  const onSelect = (_value: string, options: { value: string; label: string | Element; url: string }) => {
    if (options.url) window.location = options.url as Location | (string & Location);
  };

  return (
    <Layout>
      <FixLayout>
        <Header>
          <Row justify={'center'} align={'middle'} gutter={16}>
            <Col span={2}>
              <Image
                src={Assets.logos.github['dark']}
                alt="Github"
                style={{ cursor: 'pointer' }}
                preview={false}
                width={LOGO_SIZE}
                height={LOGO_SIZE}
                onClick={() => navigate('/')}
              />
            </Col>
            <Col span={16}>
              <SearchBar {...searchProps} onAutoCompleteSelect={onSelect} />
            </Col>
            <Col span={2} style={{ textAlign: 'right' }}>
              <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={isDark} onChange={toggleTheme} />
            </Col>
          </Row>
        </Header>

        <Layout>
          <Content style={{ padding: '20px 150px', display: 'flex', justifyContent: 'center' }}>
            <InfiniteScroll
              dataLength={results?.items?.length || 0}
              next={() => setPage(currentPage => currentPage + 1)}
              hasMore={results?.items.length !== results?.total_count}
              loader={
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <Spin tip="Loading" size="large" />
                </div>
              }
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={results?.items}
                grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
                renderItem={item => {
                  if (selectedEntity === USERS) {
                    return (
                      <List.Item>
                        <UserCard user={item as GithubUser} />
                      </List.Item>
                    );
                  }
                  if (selectedEntity === REPOSITORIES) {
                    return (
                      <List.Item>
                        <RepositoryCard repo={item as GithubRepo} />
                      </List.Item>
                    );
                  }
                }}
              />
            </InfiniteScroll>
          </Content>
        </Layout>
      </FixLayout>
    </Layout>
  );
}

export default SearchPage;
