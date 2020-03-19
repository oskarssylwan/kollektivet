const app = require('express')();
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const port = 3001;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyparser.json());

app.post('/', (req, res) => {
  res.json('Wack');
});

app.get('/', (req, res) => {
  res.json('Wack');
});

app.use('/api/gallery', require('./src/routes/galleryHandler'));
app.use('/api/mainframe', require('./src/routes/mainframeHandler'));

app.listen(port, () =>
  console.log(`The collective API is listening on port ${port}!`)
);
