import { Col, Image, Row, Space, Switch, Typography, theme } from 'antd';
import { FC } from 'react';
import Assets from '~/Assets';
import { useTheme } from '~/Theme';
import { SearchBar } from '..';
import { SearchBarProps } from '../SearchBar/SearchBar';

const { Title, Text } = Typography;

interface HeaderProps {
  searchProps: SearchBarProps;
}

const AppHeader: FC<HeaderProps> = ({ searchProps }) => {
  const { mode, isDark, toggleTheme } = useTheme();
  const { token } = theme.useToken();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row align={'middle'} justify={'center'} gutter={10}>
        <Col sm={18} md={10}>
          <Row align={'middle'} gutter={token.sizeXS}>
            <Col>
              <Image src={Assets.logos.github[mode]} style={{ width: token.sizeXXL, height: token.sizeXXL }} preview={false} />
            </Col>

            <Col>
              <Typography style={{ marginTop: -6 }}>
                <Title level={3} style={{ lineHeight: 0 }}>
                  GitHub Searcher
                </Title>
                <Text>Search users or repositories below</Text>
              </Typography>
            </Col>
          </Row>
        </Col>
        <Col sm={6} md={2} style={{ textAlign: 'right' }}>
          <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={isDark} onChange={toggleTheme} />
        </Col>
      </Row>

      <Row justify={'center'} align={'middle'}>
        <Col sm={24} md={12}>
          <SearchBar {...searchProps} />
        </Col>
      </Row>
    </Space>
  );
};

export default AppHeader;
