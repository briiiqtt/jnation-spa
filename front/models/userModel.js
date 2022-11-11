const db = require('./db');

const userModel = {
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
  async get_uid_by_id(id) {
    const sql = `
    select uid
    from user
    where deleted_at is null
    and id = ?
  `;
    const params = [id];
    return db.query(sql, params);
  },
  async login(id, pw) {
    const sql = `
    select uid, idx, id, nickname, pw, auth, created_at
    from user
    where deleted_at is null
    and id = ?
    and pw = ?
    `;
    const params = [id, pw];
    return db.query(sql, params);
  },
};

module.exports = userModel;
