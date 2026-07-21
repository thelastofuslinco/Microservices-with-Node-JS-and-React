const expresss = require('express');
const crypto = require('crypto');

const app = expresss();
app.use(expresss.json());

const posts = {
    1: [{ id: 1, content: 'This is a comment on the first post.' }],
}

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const postComments = posts[id] || [];
  res.send(postComments);
});

app.post('/posts/:id/comments', (req, res) => {
  const { id } = req.params;

  const commentId = crypto.randomBytes(4).toString('hex');
  const { content } = req.body;

  const newComment = { id: commentId, content };
  posts[id] = posts[id] || [];
  posts[id].push(newComment);

  res.status(201).send(newComment);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});