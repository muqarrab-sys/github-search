import { StarOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Skeleton, Space, Tag, Tooltip, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FC } from 'react';
import { GithubRepo } from '~/Types/GithubSearch.types';
import SharedUtils from '~/Utils/SharedUtils';

const RepositoryCard: FC<{ repo: GithubRepo; loading?: boolean }> = ({ repo, loading }) => {
  const onClick = () => {
    window.open(repo.html_url, '_blank', 'noreferrer');
  };

  return (
    <Skeleton loading={loading} avatar active>
      <Card onClick={onClick} size="small" hoverable>
        <Meta avatar={<Avatar src={repo.owner.avatar_url} />} title={`${repo.owner.login}/${repo.name}`} />

        <Divider />

        <Typography.Paragraph ellipsis={{ rows: 2, tooltip: true }}>{repo.description}</Typography.Paragraph>

        <Tooltip
          title={() => (
            <Space wrap size={[0, 8]}>
              {repo.topics.map(topic => {
                return (
                  <Tag key={topic} bordered={false}>
                    {topic}
                  </Tag>
                );
              })}
            </Space>
          )}
        >
          <Space size={[0, 8]} wrap>
            {repo.topics.slice(0, 3).map(topic => {
              return (
                <Tag color="blue" key={topic} bordered={false}>
                  {topic}
                </Tag>
              );
            })}
          </Space>
        </Tooltip>

        <Divider />

        <Typography>
          {repo.language && <Typography.Text type="secondary"> {repo.language} . </Typography.Text>}

          {repo.stargazers_count && (
            <>
              <Typography.Text type="secondary">
                <StarOutlined /> {SharedUtils.numberFormat(repo.stargazers_count)}
              </Typography.Text>
            </>
          )}
          {repo.updated_at && (
            <Typography.Text type="secondary"> . updated {SharedUtils.elapsedTime(new Date(repo.updated_at), new Date())} ago</Typography.Text>
          )}
        </Typography>
      </Card>
    </Skeleton>
  );
};

export default RepositoryCard;
