const { errorMessage } = require("../constants");
const { Comment, Exploration } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const { id } = req.params;
      const exploration = await Exploration.findByPk(id, {
        include: ["comments"],
      });

      if (!exploration) {
        return res.status(404).json({
          message: errorMessage.EXPLORATION_NOT_FOUND,
        });
      }

      res.status(200).json(exploration.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: errorMessage.INTERNAL_ERROR });
    }
  },

  add: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const exploration = await Exploration.findByPk(id);

      if (!exploration) {
        return res.status(404).json({
          message: errorMessage.EXPLORATION_NOT_FOUND,
        });
      }

      const comment = await Comment.create({
        content,
        author_id: req.user.id,
      });

      await exploration.addComment(comment);

      res.status(200).json({
        message: errorMessage.COMMENT_ADDED,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: errorMessage.INTERNAL_ERROR });
    }
  },

  edit: async (req, res) => {
    try {
      const { id, commentId } = req.params;
      const { content } = req.body;

      const exploration = await Exploration.findByPk(id);
      const comment = await Comment.findByPk(commentId);

      if (comment?.author_id !== req.user.id) {
        return res.status(403).json({
          message: errorMessage.UNAUTHORIZED,
        });
      }

      if (!exploration) {
        return res.status(404).json({
          message: errorMessage.EXPLORATION_NOT_FOUND,
        });
      }

      if (!comment) {
        return res.status(404).json({
          message: errorMessage.COMMENT_NOT_FOUND,
        });
      }

      await comment.update({ content });

      res.status(200).json({
        message: errorMessage.COMMENT_EDITED,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: errorMessage.INTERNAL_ERROR });
    }
  },

  delete: async (req, res) => {
    try {
      const { id, commentId } = req.params;

      const exploration = await Exploration.findByPk(id);
      const comment = await Comment.findByPk(commentId);

      if (comment?.author_id !== req.user.id) {
        return res.status(403).json({
          message: errorMessage.UNAUTHORIZED,
        });
      }

      if (!exploration) {
        return res.status(404).json({
          message: errorMessage.EXPLORATION_NOT_FOUND,
        });
      }

      if (!comment) {
        return res.status(404).json({
          message: errorMessage.COMMENT_NOT_FOUND,
        });
      }

      await exploration.removeComment(comment);
      await comment.destroy();

      res.status(200).json({
        message: errorMessage.COMMENT_DELETED,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: errorMessage.INTERNAL_ERROR });
    }
  },
};
