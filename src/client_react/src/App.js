import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { Vcr } from "./pages/Vcr/Vcr";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState({
    baseShadowSize: 25,
    primarySize: 15,
    fontFamity: "PetMe",
    activeTheme: "green",
    lineHeightMult: 1.5,

    orange: {
      primary: "rgba(255, 157, 0, 1)",
      primaryBg: "rgba(19, 12, 4, 1)",
      primaryBgRGBA: "rgba(19, 12, 4, 0.98)",
      txtGlow1: "rgba(255, 157, 0, 0.8)",
      txtGlow2: "rgba(255, 157, 0, 0.6)",
    },

    green: {
      primary: "rgba(217, 253, 136, 1)",
      primaryBg: "rgba(21, 27, 14, 1)",
      primaryBgRGBA: "rgba(21, 27, 14, 0.98)",
      txtGlow1: "rgba(217, 253, 136, 0.8)",
      txtGlow2: "rgba(217, 253, 136, 0.6)",
    },
  });
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
