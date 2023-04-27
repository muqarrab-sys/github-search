import { Image, Typography } from 'antd';
import Assets from '../../Assets';
import { useTheme } from '../../Theme';
import { FixLayout } from '../../Components';

const { Title, Paragraph } = Typography;
const LOGO_SIZE = 50;

export default function Home() {
  const { theme } = useTheme();

  return (
    <FixLayout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 80, gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={Assets.logos.github[theme.type]} style={{ width: LOGO_SIZE, height: LOGO_SIZE }} preview={false} />
          </div>

          <Typography>
            <Title level={3} style={{ fontSize: 20, lineHeight: 0 }}>
              GitHub Searcher
            </Title>
            <Paragraph>Search users or repositories below</Paragraph>
          </Typography>
        </div>
      </div>
    </FixLayout>
  );
}
