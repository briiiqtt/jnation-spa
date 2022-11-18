const db = require('./db');

const boardModel = {
  async get_paged_board(limitFrom, pagePostCount, boardUID) {
    let sql = `
    select uid, board_uid, title, content, view_count, author_uid, created_at, updated_at
    from post
    where deleted_at is null
    and board_uid = ?
    order by created_at desc
    limit ?,?
    `;
    const params = [boardUID, limitFrom, pagePostCount];
    return db.query(sql, params);
  },
  async get_board_post_count(boardUID) {
    let sql = `
    select count(*) "total"
    from post
    where deleted_at is null
    and board_uid = ?
    `;
    const params = [boardUID];
    return db.query(sql, params);
  },
  async get_board_info(boardUID) {
    let sql = `
    select uid, name, ref
    from menu_content
    where deleted_at is null
    and uid = ?
    `;
    const params = [boardUID];
    return db.query(sql, params);
  },
  async get_all_board_info() {
    let sql = `
    select uid, name, ref
    from menu_content
    where deleted_at is null
    and type = 'board'
    `;
    const params = [];
    return db.query(sql, params);
  },
};

module.exports = boardModel;
