const mongoose = require('mongoose');
const User = require('../auth/models/user');
const Post = require('../post/models/post');
const Comment = require('../comments/models/comment');
const Like = require('../likes/models/like');
const Follow = require('../follow/models/follow');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    // await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Like.deleteMany({});
    await Follow.deleteMany({});
    console.log('Database cleared');

    // Create users
    const user1 = new User({ email: 'user1@example.com', password: 'password1' });
    const user2 = new User({ email: 'user2@example.com', password: 'password2' });
    const user3 = new User({ email: 'user3@example.com', password: 'password3' });
    const user4 = new User({ email: 'user4@example.com', password: 'password4' });
    const user5 = new User({ email: 'user5@example.com', password: 'password5' });

    await User.insertMany([user1, user2, user3, user4, user5]);
    console.log('Users created');

    // Create posts
    const post1 = new Post({ user: user1._id, content: 'This is the first post.' });
    const post2 = new Post({ user: user2._id, content: 'This is the second post.', imageURL: 'https://example.com/image2.jpg' });
    const post3 = new Post({ user: user3._id, content: 'This is the third post.', linkURL: 'https://example.com/link3' });
    const post4 = new Post({ user: user4._id, content: 'This is the fourth post.' });
    const post5 = new Post({ user: user5._id, content: 'This is the fifth post.', imageURL: 'https://example.com/image5.jpg' });

    await Post.insertMany([post1, post2, post3, post4, post5]);
    console.log('Posts created');

    // Create comments
    const comment1 = new Comment({ user: user2._id, content: 'This is a comment on the first post.', post: post1._id });
    const comment2 = new Comment({ user: user3._id, content: 'This is a reply to the first comment.', parentComment: comment1._id, post: post1._id });
    const comment3 = new Comment({ user: user4._id, content: 'This is a comment on the second post.', post: post2._id });
    const comment4 = new Comment({ user: user5._id, content: 'This is another comment on the first post.', post: post1._id });

    await Comment.insertMany([comment1, comment2, comment3, comment4]);
    console.log('Comments created');

    // Create likes
    const like1 = new Like({ user: user1._id, post: post2._id });
    const like2 = new Like({ user: user3._id, post: post2._id });
    const like3 = new Like({ user: user4._id, post: post1._id });
    const like4 = new Like({ user: user5._id, post: post3._id });

    await Like.insertMany([like1, like2, like3, like4]);
    console.log('Likes created');

    // Create follows
    const follow1 = new Follow({ follower: user1._id, following: user2._id });
    const follow2 = new Follow({ follower: user3._id, following: user1._id });
    const follow3 = new Follow({ follower: user4._id, following: user2._id });
    const follow4 = new Follow({ follower: user5._id, following: user4._id });

    await Follow.insertMany([follow1, follow2, follow3, follow4]);
    console.log('Follow relationships created');

    console.log('Seeding complete');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
