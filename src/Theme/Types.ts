import { ThemeConfig } from 'antd';

export type ThemeMode = 'light' | 'dark';

export interface CustomThemeConfig extends ThemeConfig {
  type: ThemeMode;
}

export declare type ThemeContextType = {
  mode: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
};
