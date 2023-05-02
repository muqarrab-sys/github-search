import { StarOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Skeleton, Space, Tag, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FC } from 'react';
import { GithubRepo } from '../../../Types/GithubSearch.types';
import SharedUtils from '../../../Utils/SharedUtils';

const RepositoryCard: FC<{ repo: GithubRepo; loading?: boolean }> = ({ repo, loading }) => {
  const onClick = () => {
    window.location = repo.html_url as Location | (string & Location);
  };
  return (
    <Skeleton loading={loading} avatar active>
      <Card onClick={onClick} size="small" hoverable>
        <Meta avatar={<Avatar src={repo.owner.avatar_url} />} title={`${repo.owner.login}/${repo.name}`} />

        <Divider />

        <Space size={[0, 8]} direction="vertical">
          <Typography>
            <Typography.Text>{repo.description}</Typography.Text>
          </Typography>

          <Space size={[0, 8]} wrap>
            {repo.topics.slice(0, 5).map(topic => {
              return (
                <Tag key={topic} bordered={false}>
                  {topic}
                </Tag>
              );
            })}
          </Space>
        </Space>

        <Divider />

        <Typography>
          {repo.language && <Typography.Text> {repo.language} . </Typography.Text>}

          {repo.stargazers_count && (
            <>
              <StarOutlined />
              <Typography.Text> {SharedUtils.NumberFormat(repo.stargazers_count)}</Typography.Text>
            </>
          )}
          {repo.updated_at && <Typography.Text> . updated {SharedUtils.elapsedTime(new Date(repo.updated_at), new Date())} ago</Typography.Text>}
        </Typography>
      </Card>
    </Skeleton>
  );
};

export default RepositoryCard;
