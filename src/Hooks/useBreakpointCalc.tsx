import { Grid } from 'antd';
import { RequireAtLeastOne } from '~/Types';

interface Props {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
  xxl?: number | string;
}

export default function useBreakpointCalc({ xs, sm, md, lg, xl, xxl }: RequireAtLeastOne<Props>) {
  const bp = Grid.useBreakpoint();

  if (bp.xs) return xs || sm || md || lg || xl || xxl;
  else if (bp.sm && !bp.md) return sm || md || lg || xl || xxl || xs;
  else if (bp.md && !bp.lg) return md || lg || xl || xxl || sm || xs;
  else if (bp.lg && !bp.xl) return lg || xl || xxl || md || sm || xs;
  else if (bp.xl && !bp.xxl) return xl || xxl || lg || md || sm || xs;
  else if (bp.xxl) return xxl || xl || lg || md || sm || xs;
}
