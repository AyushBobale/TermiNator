import React, { useEffect } from "react";
import {
  THEMES,
  changeBrightness,
  changeContrast,
  changeTheme,
} from "../redux/siteSettingsSlice";
import { useDispatch, useSelector } from "react-redux";

const commands = {
  clear: "clear",
  help: "help",
  cat: "cat",
  play: "play",
  theme: "theme",
  brightness: "brightness",
  contrast: "contrast",
  reset: "reset",
};

const outputs = {
  help: `You can run the following commands
help        :       Gives you a list of commands with their description
theme       :       You can change between themes
                    Usage
                      : theme <value>     
                        [value can be ${Object.keys(THEMES)}]
brightness  :       Changes brightness
                    Usage
                      : brightness <value>
                        [values range between 0 - 1000]
contrast    :       Changes contrast
                    Usage
                      : contrast <value>
                        [values range between 0 - 500]
clear       :       Clears up your terminal
reset       :       Resets all settings to default
cat         :       Figure out on your own
`,

  cat: `
                _                       
                \\\`*-.                   
                 )  _\`-.                
                .  : \`. .               
                : _   '  \              
                ; *\` _.   \`*-._         
                \`-.-'          \`-.      
                  ;       \`       \`.    
                  :.       .        \   
                  . \  .   :   .-'   .  
                  '  \`+.;  ;  '      :  
                  :  '  |    ;       ;-.
                  ; '   : :\`-:     _.\`* ;
         [bug] .*' /  .*' ; .*\`- +'  \`*'
               \`*-*   \`*-*  \`*-*'       
`,

  play: [`1   ---------- `, ` 1   `, "  1  ", `   1 `, `------------    1`],
};

export const useCommandParser = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.rootReducer.settings);
  const commandParser = (text, history, setHistory, cmdIdx, setCmdIdx) => {
    const textLower = text?.toLowerCase().trim().split(" ");
    switch (textLower[0]) {
      case commands.clear:
        setCmdIdx(history.length);
        setHistory([...history, { command: text, output: `` }]);
        break;

      case commands.help:
        setHistory([...history, { command: text, output: outputs.help }]);
        break;

      case commands.cat:
        setHistory([...history, { command: text, output: outputs.cat }]);
        break;

      case commands.play:
        const idx = history.length;
        for (const element of outputs.play) {
          setTimeout(() => {
            let newHistory = history;
            newHistory[idx + 1] = { command: commands.play, output: element };
            setHistory(newHistory);
          }, 500);
        }
        break;

      case commands.theme:
        if (textLower?.[1] in THEMES) {
          setHistory([
            ...history,
            {
              command: text,
              output: `Theme changed to ${textLower?.[1]}`,
            },
          ]);
          dispatch(changeTheme(THEMES?.[textLower?.[1]]));
        } else {
          setHistory([
            ...history,
            {
              command: text,
              output: `Invalid theme choose from values [${Object.keys(
                THEMES
              )}]`,
            },
          ]);
        }
        break;

      case commands.brightness:
        const brightness = parseInt(textLower?.[1]);
        if (brightness >= 0 && brightness <= 1000) {
          setHistory([
            ...history,
            {
              command: text,
              output: `Brightness changed to ${textLower?.[1]}`,
            },
          ]);
          dispatch(
            changeBrightness({
              theme: settings?.activeTheme,
              brightness: brightness,
            })
          );
        } else {
          setHistory([
            ...history,
            {
              command: text,
              output: `Brightness can only be in between 0 and 1000`,
            },
          ]);
        }
        break;

      case commands.contrast:
        const contrast = parseInt(textLower?.[1]);
        if (contrast >= 0 && contrast <= 500) {
          setHistory([
            ...history,
            {
              command: text,
              output: `Contrast changed to ${textLower?.[1]}`,
            },
          ]);
          dispatch(
            changeContrast({
              theme: settings?.activeTheme,
              contrast: contrast,
            })
          );
        } else {
          setHistory([
            ...history,
            {
              command: text,
              output: `Contrast can only be in between 0 and 500`,
            },
          ]);
        }
        break;

      default:
        setHistory([
          ...history,
          { command: text, output: `${textLower[0]} is not a valid command` },
        ]);
        break;
    }
  };
  useEffect(() => {}, []);
  return commandParser;
};

export default useCommandParser;

// export { commandParser };
