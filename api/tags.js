const express = require("express");
const tagsRouter, postsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  console.log(req.params);
  const { tagName } = req.params;
  try {
    const postsByTag = await getPostsByTagName(tagName);
    const posts = getActivePostsByAuthorId(postsByTag, req.user);

    if (posts) {
      res.send({
        posts
      });
    } else {
      next({
        name: "ErrorGettingPostByTag",
        message: "Cannot get post by tag",
      });
    }
  } catch ({ name, message }) {
    next({
      name,
      message,
    });
  }
});

module.exports = tagsRouter;
