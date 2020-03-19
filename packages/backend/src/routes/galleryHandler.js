const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.resolve('./src/assets/chrizzla-albumcover.png'));
});

module.exports = router;
