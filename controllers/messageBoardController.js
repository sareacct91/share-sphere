const { Post, User } = require('../models');

async function renderMessageBoardPage (req, res) {
  // Get all posts and JOIN with user data
  const postData = await Post.findAll({
    include: [{ model: User, attributes: ['name', 'username', 'filename'], },],
  });

  // Serialize data so the template can read it
  const posts = postData.map((post) => post.toJSON());

  // Pass serialized data and session flag into template
  res.status(200).render('messageBoard', { posts, });
}


module.exports = {
  renderMessageBoardPage,

}
