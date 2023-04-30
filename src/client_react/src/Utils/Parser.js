import React, { useEffect } from "react";
import { THEMES, changeTheme } from "../redux/siteSettingsSlice";

import { useDispatch } from "react-redux";

const commands = {
  clear: "clear",
  help: "help",
  cat: "cat",
  play: "play",
  theme: "theme",
};

const outputs = {
  help: `You can run the following commands
-help   :       Gives you a list of commands with their description
theme   :       You can change between themes
                Usage
                  : theme <value>     
                    [value can be ${Object.keys(THEMES)}]
clear   :       Clears up your terminal
cat     :       Figure out on your own
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
