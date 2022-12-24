const getAllPosts = require("../db/index.js");

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

async function filterPostsByActiveAndAuthorId(allPosts, user) {
  const posts = allPosts.filter((post) => {
    if (post.active) {
      return true;
    }
    if (user && post.author.id === user.id) {
      return true;
    }
    return false;
  });
  return posts;
}

module.exports = {
  requireUser,
  filterPostsByActiveAndAuthorId,
};
