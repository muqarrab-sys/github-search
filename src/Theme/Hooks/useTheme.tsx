import { ConfigProvider } from 'antd';
import React, { createContext } from 'react';
import { THEME_TYPE } from '../../Constants';
import * as configs from '../Configs/ThemeConfigs';
import { ThemeContextType, ThemeType } from '../Types';
import { StyleProvider } from '@ant-design/cssinjs';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultType = (localStorage.getItem(THEME_TYPE) || 'light') as ThemeType;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeType, setThemeType] = React.useState<ThemeType>(defaultType);

  const isDark = themeType === 'dark';

  const theme = React.useMemo(
    () => ({
      type: themeType,
      ...configs[themeType as ThemeType],
    }),
    [themeType],
  );

  const toggleTheme = () => {
    const type = themeType === 'light' ? 'dark' : 'light';

    localStorage.setItem(THEME_TYPE, type);
    setThemeType(type);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme, isDark }}>
      <ConfigProvider theme={theme}>
        <StyleProvider>{children}</StyleProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default useTheme;
