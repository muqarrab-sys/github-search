import { ThemeConfig } from 'antd';

export type ThemeType = 'light' | 'dark';

export interface CustomThemeConfig extends ThemeConfig {
  type: ThemeType;
}

export declare type ThemeContextType = {
  theme: CustomThemeConfig;
  toggleTheme: () => void;
  isDark: boolean;
};
