import React, { useEffect, useRef, useState } from "react";
import {
  THEMES,
  changeBrightness,
  changeContrast,
  changeFontSize,
  changeTheme,
  resetToDefault,
  setCustomTheme,
} from "../redux/siteSettingsSlice";
import { useDispatch, useSelector } from "react-redux";

// reset and local storage to be implemented
// diansour game
// ping pong game

const commands = {
  clear: "clear",
  profile: "profile",
  projects: "projects",
  project: "project",
  skills: "skills",
  help: "help",
  cat: "cat",
  play: "play",
  theme: "theme",
  customtheme: "customtheme",
  brightness: "brightness",
  contrast: "contrast",
  fontsize: "fontsize",
  reset: "reset",
  save: "save",
};

const outputs = {
  help: `You can run the following commands
help        :       Gives you a list of commands with their 
                    description
profile     :       Opens a new tab with my github profile
projects    :       Lists all of my noteable project
project     :       Navigates you to a specific projects
                    Usage
                      : project <number>
                        [Number can range from 1-5]
skills      :       Lists my proficiency in all of the 
                    skills that I have gained
theme       :       You can change between themes
                    Usage
                      : theme <value>     
                        [value can be ${Object.keys(THEMES)}]
customtheme :       You can make your own custom theme
                        Usage
                          : customtheme <hex_value> [brightness] [contrast]
                            [value should be a valid hex value
                            with the # symbol]
                            [brightness and contrast are optional default 100]
brightness  :       Changes brightness
                    Usage
                      : brightness <value>
                        [values range between 50 - 1000]
contrast    :       Changes contrast
                    Usage
                      : contrast <value>
                        [values range between 100 - 500]
fontsize    :       Changes fontsize
                    Usage
                      : fontsize <value>
                        [values range between 5 - 50]
clear       :       Clears up your terminal
save        :       Saves the current site state
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

  projects: `
To visit any of the projects just run the command
project [number] where the number is the number of the project

-----------------------------------------------------------
|  1. NeuroEvolutionUsing Neat                            |
|     Genetic alorgithm to evolve 2d creatures for task   | 
|     optimization.                                       |
-----------------------------------------------------------
|  2. Data Visualization Dashboard                        |
|     Data Visualizaton dashboard created using MERN      |
|     stack and chart js.                                 |
-----------------------------------------------------------
|  3. Accident Prevention using OpenCV                    |
|     Open CV project that acts an a aide to the dirver   |
|     and notifies of the danger ahead.                   |
-----------------------------------------------------------
|  4. Node Shell                                          |
|     A shell emulator written in js that can spawn       |
|     multiple child processes and can pause, resume and  |
|     stop them.                                          |
-----------------------------------------------------------
|  5. This Project                                        |
|     A an unique project written in React js to demons-  |
|     strate my web dev skills                            |
-----------------------------------------------------------
`,

  project: [
    "https://github.com/AyushBobale/NeuroEvolutionUsingNEAT",
    "https://github.com/AyushBobale/VisualizationDashboard",
    "https://github.com/AyushBobale/OpenCVLaneDetection",
    "https://github.com/AyushBobale/NodeShell",
    "https://github.com/AyushBobale/TermiNator",
  ],

  skills: `
--------------------------------------
Skills
--------------------------------------

--------------------------------------
Programming
--------------------------------------

Python          : ${"* ".repeat(8)}
HTML/CSS/JS     : ${"* ".repeat(10)}
C#              : ${"* ".repeat(4)}
Java            : ${"* ".repeat(4)}
NoSQL           : ${"* ".repeat(8)}
SQL             : ${"* ".repeat(5)}


--------------------------------------
FrameWorks/Tools
--------------------------------------

Flask           : ${"* ".repeat(6)}
Django          : ${"* ".repeat(4)}
MERN            : ${"* ".repeat(10)}
MEAN            : ${"* ".repeat(4)}
Node            : ${"* ".repeat(9)}
MongoDB         : ${"* ".repeat(8)}
DataProcessing  : ${"* ".repeat(7)}
Git             : ${"* ".repeat(7)}
Docker          : ${"* ".repeat(5)}
`,

  play: [`1   ---------- `, ` 1   `, "  1  ", `   1 `, `------------    1`],
};

export const useCommandParser = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.rootReducer.settings);
  const playIntRef = useRef(null);
  const [frame, setFrame] = useState(0);

  const setTimer = () => {
    playIntRef.current = setInterval(() => {
      setFrame((frameValue) => frameValue + 1);
    }, 1000);
  };

  const getFrame = () => {
    return outputs.play[frame];
  };

  const removeTimer = () => {
    clearInterval(playIntRef);
  };

  const commandParser = (text, history, setHistory, cmdIdx, setCmdIdx) => {
    const textLower = text?.toLowerCase().trim().split(/\s+/);

    console.log(textLower);
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
        if (brightness >= 50 && brightness <= 1000) {
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
              output: `Brightness can only be in between 50 and 1000`,
            },
          ]);
        }
        break;

      case commands.contrast:
        const contrast = parseInt(textLower?.[1]);
        if (contrast >= 100 && contrast <= 500) {
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
              output: `Contrast can only be in between 100 and 500`,
            },
          ]);
        }
        break;

      case commands.fontsize:
        const fontsize = parseInt(textLower?.[1]);
        if (fontsize >= 5 && fontsize <= 50) {
          setHistory([
            ...history,
            {
              command: text,
              output: `Fontsize changed to ${textLower?.[1]}`,
            },
          ]);
          dispatch(changeFontSize(fontsize));
        } else {
          setHistory([
            ...history,
            {
              command: text,
              output: `Fontsize can only be in between 5 and 50`,
            },
          ]);
        }
        break;

      case commands.profile:
        setHistory([
          ...history,
          {
            command: text,
            output: `I will open a new tab with my github profile in 5 seconds`,
          },
        ]);
        setTimeout(() => {
          window.open(
            "https://github.com/AyushBobale",
            "_blank",
            "noopener,noreferrer"
          );
        }, 5000);
        break;

      case commands.projects:
        setCmdIdx(history.length);
        setHistory([
          ...history,
          {
            command: text,
            output: outputs.projects,
          },
        ]);
        break;

      case commands.skills:
        setCmdIdx(history.length);
        setHistory([
          ...history,
          {
            command: text,
            output: outputs.skills,
          },
        ]);
        break;

      case commands.customtheme:
        const hex = textLower[1];
        let contrastCustom = parseInt(textLower[3]);
        let brightnessCustom = parseInt(textLower[2]);

        let rgba;
        console.log(hex);
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
          rgba = (alpha, multiplier) => {
            let c = hex.substring(1).split("");
            if (c.length == 3) {
              c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = "0x" + c.join("");
            let r = Math.round(((c >> 16) & 255) * multiplier);
            let g = Math.round(((c >> 8) & 255) * multiplier);
            let b = Math.round((c & 255) * multiplier);
            return "rgba(" + [r, g, b].join(",") + "," + alpha + ")";
          };
          const theme = {
            primary: rgba(1, 1),
            primaryBg: rgba(1, 0.2),
            primaryBgRGBA: rgba(0.95, 0.2),
            txtGlow1: rgba(0.8, 1),
            txtGlow2: rgba(0.6, 1),
            contrast: contrastCustom || 100,
            brightness: brightnessCustom || 100,
          };
          console.log(rgba(1, 0.5));

          dispatch(setCustomTheme(theme));
          setHistory([
            ...history,
            {
              command: text,
              output: `Custom theme set to ${hex} change brightness and contrast to your likings`,
            },
          ]);
        } else {
          setHistory([
            ...history,
            {
              command: text,
              output: `${textLower[0]} is not a valid hex value e.g.[#fff]`,
            },
          ]);
        }
        break;

      case commands.save:
        localStorage.setItem(
          "state",
          JSON.stringify({
            settings: settings,
            history: history,
            activeCmdIdx: cmdIdx,
          })
        );
        setHistory([
          ...history,
          { command: text, output: `The site settings have been saved` },
        ]);
        break;

      case commands.reset:
        localStorage.removeItem("state");
        setHistory([
          [],
          {
            command: text,
            output: `The site state has been restored to default`,
          },
        ]);
        setCmdIdx(0);
        dispatch(resetToDefault());
        break;

      case commands.project:
        const projectNumber = parseInt(textLower[1]);
        if (projectNumber >= 1 && projectNumber <= 5) {
          setHistory([
            ...history,
            {
              command: text,
              output: `I will navigate you to the project in 3 seconds`,
            },
          ]);
          setTimeout(() => {
            window.open(
              outputs.project[projectNumber],
              "_blank",
              "noopener,noreferrer"
            );
          }, 3000);
        } else {
          setHistory([
            ...history,
            {
              command: text,
              output: `Project number can range between 1 to 5`,
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
