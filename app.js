const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = [];
const posts = [];

// User Sign-Up API
app.post("/api/signup", (req, res) => {
  const { name, email } = req.body;
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(200).json({ message: "Successful user sign-up." });
});

// Create Post API
app.post("/api/posts", (req, res) => {
  const { userId, content } = req.body;
  const user = users.find((user) => user.id === parseInt(userId));
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  const post = { id: posts.length + 1, userId, content };
  posts.push(post);
  res.status(200).json({ message: "Successfully created." });
});

// Delete Post API
app.delete("/api/deletepost/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const index = posts.findIndex((post) => post.id === postId);
  if (index === -1) {
    return res.status(404).json({ message: "Post not found." });
  }
  posts.splice(index, 1);
  res.status(200).json({ message: "Successful post deletion." });
});

// Fetch User's Posts API
app.get("/api/posts/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userPosts = posts.filter((post) => post.userId === userId);
  res.status(200).json(userPosts);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
