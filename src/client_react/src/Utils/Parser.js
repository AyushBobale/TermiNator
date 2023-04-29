const commands = {
  clear: "clear",
  help: "help",
  cat: "cat",
  play: "play",
};

const outputs = {
  help: `You can run the following commands
clear   :       Clears up your terminal
-help   :       Gives you a list of commands with their description
cat     :       Figure out on your own`,

  cat: `                _                       
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

const op = `
----------------------------------


----------------------------------
test                        end
----------------------------------



----------------------------------

`;

const commandParser = (text, history, setHistory, cmdIdx, setCmdIdx) => {
  const textLower = text?.toLowerCase().trim();
  switch (textLower) {
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

    default:
      setHistory([
        ...history,
        { command: text, output: `${text?.trim()} is not a valid command` },
      ]);
      break;
  }
};

export { commandParser };
