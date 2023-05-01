import { Layout, Typography } from 'antd';
import { useRouteError } from 'react-router-dom';
import { FixLayout } from '../../Components';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.log(error);

  return (
    <Layout>
      <FixLayout>
        <Layout.Content>
          <Typography.Title level={2}>Oops...</Typography.Title>

          <Typography.Paragraph>
            Either this page/data don't exist/got removed by the developers without notifying you or something els happened. We do apologize for the
            inconvenience either way.
          </Typography.Paragraph>

          <Typography.Text>{error?.statusText || error?.message}</Typography.Text>
        </Layout.Content>
      </FixLayout>
    </Layout>
  );
}
