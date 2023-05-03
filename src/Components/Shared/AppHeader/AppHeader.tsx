import { Col, Image, Row, Switch, Typography } from 'antd';
import { FC, Fragment } from 'react';
import Assets from '../../../Assets';
import { SearchBar } from '..';
import { useTheme } from '../../../Theme';
import { SearchBarProps } from '../SearchBar/SearchBar';

const { Title, Paragraph } = Typography;

const LOGO_SIZE = 40;

interface HeaderProps {
  searchProps: SearchBarProps;
}

const AppHeader: FC<HeaderProps> = ({ searchProps }) => {
  const { mode, isDark, toggleTheme } = useTheme();

  return (
    <Fragment>
      <Row align={'middle'}>
        <Col span={8} />
        <Col span={1}>
          <Image src={Assets.logos.github[mode]} style={{ width: LOGO_SIZE, height: LOGO_SIZE }} preview={false} />
        </Col>
        <Col span={5}>
          <Typography>
            <Title level={3} style={{ lineHeight: 0 }}>
              GitHub Searcher
            </Title>
            <Paragraph>Search users or repositories below</Paragraph>
          </Typography>
        </Col>
        <Col span={2} style={{ textAlign: 'right' }}>
          <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={isDark} onChange={toggleTheme} />
        </Col>
        <Col span={8} />
      </Row>
      <Row>
        <Col span={8} />
        <Col span={8}>
          <SearchBar {...searchProps} />
        </Col>
        <Col span={8} />
      </Row>
    </Fragment>
  );
};

export default AppHeader;
