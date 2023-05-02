import { Col, Image, Layout, Row, Space, Switch, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Assets from '../../Assets';
import { FixLayout, SearchBar } from '../../Components';
import useSearch from '../../Hooks/useSearch';
import { SEARCH_ROUTE } from '../../Router/routes';
import { useTheme } from '../../Theme';
import params from '../../Router/params';

const { Title, Paragraph } = Typography;

const LOGO_SIZE = 50;

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { searchProps: searchParams } = useSearch({ searchAllOption: true });

  const onSelect = (_value?: string, options?: { value: string; label: string; searchAll?: boolean; url: string }) => {
    if (options === undefined || options?.searchAll) {
      return navigate({ pathname: SEARCH_ROUTE, search: `?${params.q}=${searchParams.query}&${params.type}=${searchParams.selectedEntity}` });
    } else if (options.url) {
      window.location = options.url as Location | (string & Location);
    }
  };

  return (
    <Layout>
      <FixLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <Space direction="vertical">
            <Row justify={'center'} align={'middle'} gutter={16}>
              <Col span={4}>
                <Image src={Assets.logos.github['dark']} style={{ width: LOGO_SIZE, height: LOGO_SIZE }} preview={false} />
              </Col>
              <Col span={15}>
                <Typography>
                  <Title level={3} style={{ lineHeight: 0 }}>
                    GitHub Searcher
                  </Title>
                  <Paragraph>Search users or repositories below</Paragraph>
                </Typography>
              </Col>
              <Col span={5}>
                <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={isDark} onChange={toggleTheme} />
              </Col>
            </Row>

            <SearchBar {...searchParams} onAutoCompleteSelect={onSelect} onPressEnter={onSelect} />
          </Space>
        </div>
      </FixLayout>
    </Layout>
  );
}
