const commands = {
  clear: "clear",
};

const op = `
----------------------------------


----------------------------------
test                        end
----------------------------------



----------------------------------

`;

const commandParser = (text, history, setHistory, cmdIdx, setCmdIdx) => {
  const textLower = text?.toLowerCase();
  switch (textLower) {
    case commands.clear:
      setCmdIdx(history.length);
      setHistory([...history, { command: text, output: `` }]);
      break;
    default:
      setHistory([
        ...history,
        { command: text, output: `${text} is not a valid command` },
      ]);
      break;
  }
};

export { commandParser };
