import { ThemeConfig, theme } from 'antd';
import darkToken from '../Tokens/Dark';
import lightToken from '../Tokens/Light';

export const dark: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: darkToken,
};

export const light: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: lightToken,
};
