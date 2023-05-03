import { Divider, Layout, List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RepositoryCard, UserCard } from '../../Components/Search';
import { AppHeader, FixLayout } from '../../Components/Shared';
import { ENTITIES } from '../../Constants';
import useSearch from '../../Hooks/useSearch';
import { GithubRepo, GithubUser } from '../../Types/GithubSearch.types';

const { Content } = Layout;
const { USERS, REPOSITORIES } = ENTITIES;

function SearchPage() {
  const { searchProps, setPage, users, repositories } = useSearch({ useParams: true });
  const { selectedEntity } = searchProps;

  const results = searchProps.selectedEntity === ENTITIES.USERS ? users : repositories;

  return (
    <Layout>
      <FixLayout
        style={
          results
            ? {}
            : {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }
        }
      >
        <AppHeader searchProps={searchProps} />

        {results && (
          <Layout>
            <Content style={{ padding: '20px 150px', display: 'flex', justifyContent: 'center' }}>
              <InfiniteScroll
                dataLength={results?.items?.length || 0}
                next={() => setPage(currentPage => currentPage + 1)}
                hasMore={results?.items.length !== results?.total_count}
                loader={
                  <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <Spin tip="Loading more..." size="large" />
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
        )}
      </FixLayout>
    </Layout>
  );
}

export default SearchPage;
