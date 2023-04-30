import { Provider, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { Vcr } from "./pages/Vcr/Vcr";

function App() {
  const theme = useSelector((state) => state.rootReducer.settings);
  const themeObj = {};
  const GlobalStyle = createGlobalStyle`
  :root {
    --base-shadow-size: ${theme.baseShadowSize}px;
    --primary-size: ${theme.primarySize}px;
    --primary: ${theme?.[theme.activeTheme].primary};
    --primary-bg: ${theme?.[theme.activeTheme].primaryBg};
    --primary-bg-rgba: ${theme?.[theme.activeTheme].primaryBgRGBA};
    --txt-glow-1: ${theme?.[theme.activeTheme].txtGlow1};
    --txt-glow-2: ${theme?.[theme.activeTheme].txtGlow2};

    --contrast: ${theme?.[theme.activeTheme].contrast}%;
    --brightness: ${theme?.[theme.activeTheme].brightness}%;
  }
    * {
      font-family:    "${theme.fontFamity}";
      font-size:      ${theme.primarySize}px;
      color:          ${theme?.[theme.activeTheme].primary};
    }

    p,
    input,
    pre {
      line-height:    ${theme.primarySize * theme.lineHeightMult}px;
      text-shadow:    0 0 ${theme.baseShadowSize * 1}px ${
    theme?.[theme.activeTheme].txtGlow1
  };
                      0 0 ${theme.baseShadowSize * 5}px ${
    theme?.[theme.activeTheme].txtGlow1
  };
  `;

  return (
    <ThemeProvider theme={themeObj}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Vcr />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
