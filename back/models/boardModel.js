const { shortid } = require('./db');
const db = require('./db');

const boardModel = {
  async get_paged_board(limitFrom, pagePostCount, boardUID) {
    let sql = `
    select 
      p.uid "postUID",
      p.board_uid "boardUID",
      p.title "title",
      p.content "content",
      p.view_count "viewCount",
      p.author_uid "authorUID",
      date_format(p.created_at, '%Y-%m-%d %h:%i:%s') "postCreatedAt",
      p.updated_at "updatedAt",
      u.nickname "authorNickname",
      u.auth "authorAuth",
      u.created_at "authorCreatedAt"
    from post p
    join user u
    on p.author_uid = u.uid
    where p.deleted_at is null
    and p.board_uid = ?
    order by p.created_at desc
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
  async add_post(uid, boardUID, title, content, authorUID) {
    let sql = `
    insert into
      post(
        uid,
        idx,
        board_uid,
        title,
        content,
        author_uid
      ) values (
        ?,
        next_val('post'),
        ?,
        ?,
        ?,
        ?
      )
    `;
    const params = [uid, boardUID, title, content, authorUID];
    return db.query(sql, params);
  },
  async get_post(postUID) {
    let sql = `
    select
      p.uid "uid",
      p.idx "idx",
      p.board_uid "boardUID",
      p.title "title",
      p.content "content",
      p.view_count "viewCount",
      p.author_uid "authorUID",
      date_format(p.created_at, '%Y-%m-%d %h:%i:%s') "createdAt",
      p.updated_at "updatedAt",
      mc.name "boardName",
      u.nickname "authorNickname",
      u.auth "authorAuth",
      u.created_at "authorCreatedAt"
    from post p
    join menu_content mc
    on mc.uid = p.board_uid
    join user u
    on u.uid = p.author_uid
    where p.deleted_at is null
    and p.uid = ?
    `;
    const params = [postUID];
    return db.query(sql, params);
  },
};

module.exports = boardModel;
