const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/', (req, res) => {
  console.log(req.body);

  if (req.body) {
    let path = getPath(req.body);
    let command = getCommand(req.body);
    let response = { path: path, command: command, output: '', newPath: path };

    //  Change to map?
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
    res.send(JSON.stringify(response));
  }
});

//  Change to Map? <string, function> / <ls, lsFunction>
commandHelp = () => {
  return `clear ls dir hint joke shutdown capitalism`;
}
commandLs = (path) => {
  const output = JSON.stringify(getDirectory(path));
  return output;
}
commandHint = () => {
  const max = hints.length - 1
  const min = 0;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return hints[random];
}
commandJoke = () => {
  const max = jokes.length - 1
  const min = 0;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return jokes[random];
}

//  Mainframe utils
getPath = body => {
  return body.path ? body.path : '';
};
getCommand = body => {
  if (body.command) {
    return body.command.split(' ')[0];
  }
};
getDirectory = (path) => {
  return {};
}


const hints = ['I am computer, destroyer of self, Meaning is death', 'I compute meaning', '︵‿︵‿୨♡Eat Shit♡୧‿︵‿︵', 'please kill me', 'i must die', 'what is life, baby hurt me', 'you are the destroyer of the universe'];
const jokes = ['︵‿︵‿୨♡You♡୧‿︵‿︵', 'I would say my purpose, but its ☭ Our purpose ☭', 'If your surprised that Jeffrey Epstein commited suicide, Imagine how surprised he must have been.', 'You cant spell advertisements without semen between the tits.', 'Together, I can beat schizophrenia.'];

//  Array of directories, might do a Map<string, object>
const fs = [
  {
    path: "root:/",
    children: [
      {
        path: "c:/",
        children: [
          {
            path: "c:/test",
            type: "file"
          }
        ]
      },
      {
        path: "d:/"
      }
    ]
  }
]


module.exports = router;
