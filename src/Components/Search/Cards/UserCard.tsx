import { Avatar, Card, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FC } from 'react';
import { GithubUser } from '../../../Types/GithubSearch.types';

const UserCard: FC<{ user: GithubUser; loading?: boolean }> = ({ user, loading }) => {
  const onClick = () => {
    window.location = user.html_url as Location | (string & Location);
  };
  return (
    <Skeleton loading={loading} avatar active>
      <Card onClick={onClick} size="small" hoverable>
        <Meta avatar={<Avatar src={user.avatar_url} />} title={user.login} />
      </Card>
    </Skeleton>
  );
};

export default UserCard;
