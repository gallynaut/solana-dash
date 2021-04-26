import { useEffect } from "react";
import type { FC } from "react";
import { useRoutes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core";
import "./i18n";
import GlobalStyles from "./components/GlobalStyles";
import SettingsDrawer from "./components/SettingsDrawer";
import SplashScreen from "./components/SplashScreen";
import { gtmConfig } from "./config";
import useAuth from "./hooks/useSolana";
import useScrollReset from "./hooks/useScrollReset";
import useSettings from "./hooks/useSettings";
import useNotifications from "./hooks/useNotifications";
import gtm from "./lib/gtm";
import routes from "./routes";
import { createTheme } from "./theme";

const App: FC = () => {
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const auth = useAuth();
  useScrollReset();

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SettingsDrawer />
      {auth.isInitialized ? content : <SplashScreen />}
    </ThemeProvider>
  );
};

export default App;
