import { ConfigProvider } from 'antd';
import React, { createContext } from 'react';
import { THEME_MODE } from '../../Constants';
import * as configs from '../Configs/ThemeConfigs';
import { ThemeContextType, ThemeMode as ThemeMode } from '../Types';
import { StyleProvider } from '@ant-design/cssinjs';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultMode = (localStorage.getItem(THEME_MODE) || 'light') as ThemeMode;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setThemeMode] = React.useState<ThemeMode>(defaultMode);

  const isDark = mode === 'dark';

  const theme = React.useMemo(
    () => ({
      type: mode,
      ...configs[mode as ThemeMode],
    }),
    [mode],
  );

  const toggleTheme = () => {
    const type = mode === 'light' ? 'dark' : 'light';

    localStorage.setItem(THEME_MODE, type);
    setThemeMode(type);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark, mode }}>
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
