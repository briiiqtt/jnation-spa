const express = require('express');
const router = express.Router();
const InsufficientArgumentError = require('../Errors/InsufficientArgumentError');
const InvalidArgumentError = require('../Errors/InvalidArgumentError');
const boardModel = require('../models/boardModel');
const { shortid } = require('../models/db');

router.use((req, res, next) => {
  next();
});

router.get('/get-all-board-info', async (req, res) => {
  try {
    const queryResult = await boardModel.getAllBoardInfo();
    res.send({ ...queryResult });
  } catch (e) {
    if (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.post('/post/add', async (req, res) => {
  try {
    const { boardUID, title, content, authorUID } = req.body;
    const isSufficient = [boardUID, title, content, authorUID].every(
      (v) => v ?? false
    );
    if (!isSufficient) throw new InsufficientArgumentError();

    const uid = shortid.generate();

    const queryResult = await boardModel.addPost(
      uid,
      boardUID,
      title,
      content,
      authorUID
    );
    res.send({ affectedRows: queryResult.affectedRows, uid });
  } catch (e) {
    if (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.post('/comment/add', async (req, res) => {
  try {
    const { postUID, content, authorUID, isReply } = req.body;
    let originCommentUID = null;
    let taggedUserUID = null;
    const params = [postUID, content, authorUID, isReply];

    if (isReply === true) {
      originCommentUID = req.body.originCommentUID;
      taggedUserUID = req.body.taggedUserUID;
      params.push(originCommentUID);
      params.push(taggedUserUID);
    }

    const isSufficient = params.every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const uid = shortid.generate();

    const queryResult = await boardModel.addComment(
      uid,
      postUID,
      content,
      authorUID,
      isReply,
      originCommentUID,
      taggedUserUID
    );

    res.send({ affectedRows: queryResult.affectedRows, uid });
  } catch (e) {
    if (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.get('/post/:postUID', async (req, res) => {
  try {
    const { postUID } = req.params;
    const isSufficient = [postUID].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const queryResult = await boardModel.getPost(postUID);
    res.send({ currentPost: queryResult[0] });
  } catch (e) {
    if (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.get('/:boardUID/:page', async (req, res) => {
  const pageSize = 15;
  try {
    const { page, boardUID } = req.params;
    const isSufficient = [page, boardUID].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const [num_page, num_pageSize] = [page, pageSize].map((v) => {
      const val = parseInt(v);
      if (isNaN(val)) {
        throw new InvalidArgumentError();
      } else {
        return val;
      }
    });

    const limitFrom = num_page === 1 ? 0 : (num_page - 1) * num_pageSize;

    const queryResult_post = await boardModel.getPagedBoard(
      limitFrom,
      num_pageSize,
      boardUID
    );
    const queryResult_total = await boardModel.getBoardPostCount(boardUID);
    const total = queryResult_total[0].total;
    const queryResult_board_info = await boardModel.getBoardInfo(boardUID);
    const { name, ref, uid } = queryResult_board_info[0];
    res.send({
      posts: queryResult_post,
      total,
      page: num_page,
      boardName: name,
      ref,
      boardUID: uid,
    });
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.sendStatus(400);
    } else if (e instanceof InvalidArgumentError) {
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});

module.exports = router;
