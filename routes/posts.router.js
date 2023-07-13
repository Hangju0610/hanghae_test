const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const createPost = await Posts.create({
      title,
      content,
    });

    const post = {
      id: createPost.id,
      title: createPost.title,
      content: createPost.content,
    };

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '다시 시도해주세요.' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const findPosts = await Posts.findAll();

    const allPost = findPosts.map((v) => {
      return {
        id: v.id,
        title: v.title,
        content: v.content,
      };
    });

    res.status(200).json(allPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '다시 시도해주세요.' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;

    await Posts.update(
      { title, content },
      {
        where: { id: postId },
      }
    );

    const findPost = await Posts.findByPk(postId);
    const post = {
      id: findPost.id,
      title: findPost.title,
      content: findPost.content,
    };

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '다시 시도해주세요.' });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;

    await Posts.destroy({ where: { id: postId } });

    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '다시 시도해주세요.' });
  }
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

module.exports = router;
