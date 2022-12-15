const db = require('./db');

const userModel = {
  get_all: async () => {
    const sql = `select*from user`;
    const params = [];
    return db.query(sql, params);
  },
  async add_user(id, pw, nickname) {
    let sql = `
    insert into
      user(
          uid,
          id,
          nickname,
          pw
      )
      values(
          ?,
          ?,
          ?,
          ?
          )`;
    const uid = db.shortid.generate();
    const params = [uid, id, nickname, pw];
    return db.query(sql, params);
  },
  async getUserCountById(id) {
    const sql = `
    select count(*) "count"
    from user
    where deleted_at is null
    and id = ?
  `;
    const params = [id];
    return db.query(sql, params);
  },
  async getUserCountByNickname(nickname) {
    const sql = `
    select count(*) "count"
    from user
    where deleted_at is null
    and nickname = ?
  `;
    const params = [nickname];
    return db.query(sql, params);
  },
  // async login(id, pw) {
  //   const sql = `
  //   select uid, idx, id, nickname, auth, created_at
  //   from user
  //   where deleted_at is null
  //   and id = ?
  //   and pw = ?
  //   `;
  //   const params = [id, pw];
  //   return db.query(sql, params);
  // },
  async getUser(id) {
    const sql = `
    select uid, idx, id, pw, nickname, auth, created_at
    from user
    where deleted_at is null
    and id = ?
    `;
    const params = [id];
    return db.query(sql, params);
  },
  async getUserTotal() {
    const sql = `
    select count(*) "userTotal"
    from user
    where deleted_at is null
    `;
    const params = [];
    return db.query(sql, params);
  },
};

module.exports = userModel;
