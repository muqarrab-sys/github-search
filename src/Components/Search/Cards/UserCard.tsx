import { Card, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FC } from 'react';
import { GithubUser } from '~/Types/GithubSearch.types';

const UserCard: FC<{ user: GithubUser; loading?: boolean }> = ({ user, loading }) => {
  const onClick = () => {
    window.open(user.html_url, '_blank', 'noreferrer');
  };
  return (
    <Skeleton loading={loading} avatar active>
      <Card cover={<img src={user.avatar_url} />} onClick={onClick} size="small" hoverable>
        <Meta title={user.login} />
      </Card>
    </Skeleton>
  );
};

export default UserCard;
