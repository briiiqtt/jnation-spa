const db = require('./db');

const user = {
  get_all: async () => {
    const sql = `select*from user`;
    const params = [];
    return db.query(sql, params);
  },
  async add_user(id, pw) {
    let sql = `
  insert into
      user(
          uid,
          idx,
          id,
          nickname,
          pw
      )
      values(
          ?,
          next_val('user'),
          ?,
          ?,
          ?
          )`;
    const uid = db.shortid.generate();
    const nickname = db.shortid.generate();
    const params = [uid, id, nickname, pw];
    return db.query(sql, params);
  },
  async is_this_userId_available(id) {
    const sql = `
  select count(*) as count
  from user
  where 1=1
  and deleted_at is null
  and id = ?
  `;
    const params = [id];
    return db.query(sql, params);
  },
};

module.exports = user;
