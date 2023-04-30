import { createSlice } from "@reduxjs/toolkit";

export const THEMES = {
  amber: "amber",
  forestshadow: "forestshadow",
  steelblue: "steelblue",
};

const initialState = {
  baseShadowSize: 25,
  primarySize: 12,
  fontFamity: "PetMe",
  activeTheme: "amber",
  lineHeightMult: 1.5,

  amber: {
    primary: "rgba(255, 157, 0, 1)",
    primaryBg: "rgba(19, 12, 4, 1)",
    primaryBgRGBA: "rgba(19, 12, 4, 0.98)",
    txtGlow1: "rgba(255, 157, 0, 0.8)",
    txtGlow2: "rgba(255, 157, 0, 0.6)",
    contrast: 100,
    brightness: 160,
  },

  forestshadow: {
    primary: "rgba(183, 248, 133, 1)",
    primaryBg: "rgba(33, 44, 20, 1)",
    primaryBgRGBA: "rgba(99, 133, 61, 1)",
    txtGlow1: "rgba(183, 248, 133, 0.8)",
    txtGlow2: "rgba(183, 248, 133, 0.6)",
    contrast: 120,
    brightness: 100,
  },

  steelblue: {
    primary: "rgba(177, 232, 249, 1)",
    primaryBg: "rgba(40, 84, 97, 1)",
    primaryBgRGBA: "rgba(40, 84, 97, 1)",
    txtGlow1: "rgba(197, 242, 249, 0.8)",
    txtGlow2: "rgba(197, 242, 249, 0.6)",
    contrast: 200,
    brightness: 200,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    changeTheme: (state, { payload }) => {
      state.activeTheme = payload;
    },
    changeBrightness: (state, { payload }) => {
      state[payload.theme].brightness = payload.brightness;
    },
    changeContrast: (state, { payload }) => {
      console.log(payload);
      state[payload.theme].contrast = payload.contrast;
    },
    changeFontSize: (state, { payload }) => {
      state.primarySize = payload;
    },
  },
});

export const { changeTheme, changeBrightness, changeContrast, changeFontSize } =
  settingsSlice.actions;
export default settingsSlice.reducer;
