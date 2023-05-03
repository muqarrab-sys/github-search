import { CSSProperties, FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: CSSProperties;
}

const FixLayout: FC<Props> = ({ children, style = {} }) => {
  return <div style={{ height: '100vh', width: '100%', ...style }}>{children}</div>;
};

export default FixLayout;
