const express = require('express');

const postRouter = require('./routes/posts.router');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', postRouter);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`);
});
