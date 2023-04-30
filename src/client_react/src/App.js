import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { Provider } from "react-redux";
import { Vcr } from "./pages/Vcr/Vcr";
import store from "./redux/store.js";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState({
    baseShadowSize: 25,
    primarySize: 15,
    fontFamity: "PetMe",
    activeTheme: "blue",
    lineHeightMult: 1.5,

    orange: {
      primary: "rgba(255, 157, 0, 1)",
      primaryBg: "rgba(19, 12, 4, 1)",
      primaryBgRGBA: "rgba(19, 12, 4, 0.98)",
      txtGlow1: "rgba(255, 157, 0, 0.8)",
      txtGlow2: "rgba(255, 157, 0, 0.6)",
      contrast: 100,
      brightness: 160,
    },

    green: {
      primary: "rgba(183, 248, 133, 1)",
      primaryBg: "rgba(33, 44, 20, 1)",
      primaryBgRGBA: "rgba(99, 133, 61, 1)",
      txtGlow1: "rgba(183, 248, 133, 0.8)",
      txtGlow2: "rgba(183, 248, 133, 0.6)",
      contrast: 120,
      brightness: 200,
    },

    blue: {
      primary: "rgba(177, 232, 249, 1)",
      primaryBg: "rgba(40, 84, 97, 1)",
      primaryBgRGBA: "rgba(40, 84, 97, 1)",
      txtGlow1: "rgba(197, 242, 249, 0.8)",
      txtGlow2: "rgba(197, 242, 249, 0.6)",
      contrast: 200,
      brightness: 200,
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
    <Provider store={store}>
      <ThemeProvider theme={themeObj}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Vcr />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
