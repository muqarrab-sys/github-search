import { Button, Layout, Typography } from 'antd';
import { useNavigate, useRouteError } from 'react-router-dom';
import { FixLayout } from '../../Components/Shared';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  console.log(error);

  return (
    <Layout>
      <FixLayout>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography.Title level={1}>Oops...</Typography.Title>

          <Typography.Paragraph>Looks like something went wrong...</Typography.Paragraph>

          <Button onClick={() => navigate('/')}>Go Back</Button>

          <Typography.Text>{error?.statusText || error?.message}</Typography.Text>
        </div>
      </FixLayout>
    </Layout>
  );
}
