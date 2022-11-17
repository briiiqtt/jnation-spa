const db = require('./db');

const boardModel = {
  async get_paged_board(limitFrom, pagePostCnt, boardUID) {
    let sql = `
    select uid, board_uid, title, content, view_count, author_uid, created_at, updated_at
    from post
    where deleted_at is null
    and board_uid = ?
    limit ?,?
    `;
    const params = [boardUID, limitFrom, pagePostCnt];
    return db.query(sql, params);
  },
  async get_board_post_count(boardUID) {
    let sql = `
    select count(*) "count"
    from post
    where deleted_at is null
    and board_uid = ?
    `;
    const params = [boardUID];
    return db.query(sql, params);
  },
};

module.exports = boardModel;
