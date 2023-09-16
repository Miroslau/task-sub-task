import React, {useMemo} from 'react';
import './App.scss';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import AppRouter from "./components/app-router/app-router";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";

function App() {

  const mode = "dark";

  const theme = useMemo(() => {
    // @ts-ignore
    return createTheme(themeSettings<ThemeOptions>(mode));
  }, [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
