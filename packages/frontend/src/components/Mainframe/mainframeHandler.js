
const hints = [
  'I am computer, destroyer of self, Meaning is death',
  'I compute meaning', '︵‿︵‿୨♡Eat Shit♡୧‿︵‿︵',
  'please kill me',
  'i must die',
  'what is life, baby hurt me',
  'you are the destroyer of the universe'
];

const jokes = [
  '︵‿︵‿୨♡You♡୧‿︵‿︵',
  'I would say my purpose, but its ☭ Our purpose ☭',
  'If you are surprised that Jeffrey Epstein commited suicide, Imagine how surprised he must have been.',
  'You cant spell advertisements without semen between the tits.',
  'Together, I can beat schizophrenia.'
];

const commandHelp = () =>
  `clear ls dir hint joke shutdown capitalism`;

const commandHint = () => {
  const max = hints.length - 1
  const min = 0;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return hints[random];
}

const commandJoke = () => {
  const max = jokes.length - 1
  const min = 0;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return jokes[random];
}

const getPath = body => body.path ? body.path : '';

const getCommand = body => {
  if (body.command) {
    return body.command.split(' ')[0];
  }
};

export const processCLICommand = args => {
  console.log('@processCLICommand args', args)

  if (args) {
    let path = getPath(args);
    let command = getCommand(args);
    let response = { path: path, command: command, output: '', newPath: path };

    switch (command) {
      case 'ls':
        response.output = 'Not yet implemented';
        break;
      case 'dir':
        response.output = '｡･:*:･ﾟ★,｡･:*:･ﾟ☆ Not yet implemented ✧ .・。.・゜✭・.・✫・゜・。.';
        break;
      case 'help':
        response.output = commandHelp();
        break;
      case 'hint':
        response.output = commandHint();
        break;
      case 'joke':
        response.output = commandJoke();
        break;
      case 'shutdown':
        response.output = 'thank you';
        response.status = 1;
        break;
      case 'capitalism':
        response.newPath = 'ERROR';
        response.output = 'G.U.L.A.G.';
        response.status = -1;
        break;
      default:
        response.output = `'${command}' is not recognized as an internal command.`;
        break;
    }
    return response
  }
}
