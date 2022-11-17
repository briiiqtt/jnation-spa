const express = require('express');
const router = express.Router();
const InsufficientArgumentError = require('../Errors/InsufficientArgumentError');
const InvalidArgumentError = require('../Errors/InvalidArgumentError');
const boardModel = require('../models/boardModel');

router.use((req, res, next) => {
  next();
});

router.get('/get-paged-board', async (req, res) => {
  try {
    const { page, pagePostCnt, boardUID } = req.query;
    const isSufficient = [page, pagePostCnt, boardUID].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const [num_page, num_pagePostCnt] = [page, pagePostCnt].map((v) => {
      const val = parseInt(v);
      if (isNaN(val)) {
        throw new InvalidArgumentError();
      } else {
        return val;
      }
    });

    const limitFrom = num_page * num_pagePostCnt;
    console.log(limitFrom);

    const postQR = await boardModel.get_paged_board(
      limitFrom,
      num_pagePostCnt,
      boardUID
    );
    const countQR = await boardModel.get_board_post_count(boardUID);
    const count = countQR[0].count;
    res.send({ posts: postQR, count });
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
