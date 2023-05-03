import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FixLayout: FC<Props> = ({ children }) => {
  return <div style={{ height: '100vh', width: '100%' }}>{children}</div>;
};

export default FixLayout;
