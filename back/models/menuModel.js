const db = require('./db');

const menuModel = {
  async getMenuGroupUIDs() {
    let sql = `
    select uid, idx, name, seq
    from menu_group
    where deleted_at is null
    order by seq
    `;
    const params = [];
    return db.query(sql, params);
  },
  async getContentByGroupUID(menuGroupUID) {
    let sql = `
    select
      uid, idx, menu_group_uid, name, ref, type, seq
    from menu_content
    where deleted_at is null
    and menu_group_uid = ?
    order by seq
    `;
    const params = [menuGroupUID];
    return db.query(sql, params);
  },
  async addMenuGroup(name) {
    let sql = `
    insert into
      menu_group(
          uid,
          name,
          seq
      )
      values(
          ?,
          ?,
          ( select max(seq) + 1 from menu_group a )
          )`;
    const uid = db.shortid.generate();
    const params = [uid, name];
    return db.query(sql, params);
  },
  async addMenuContent(menuGroupUID, name, ref, type) {
    let sql = `
    insert into
      menu_content(
          uid,
          menu_group_uid,
          name,
          ref,
          type
      )
      values(
          ?,
          ?,
          ?,
          ?,
          ?
          )`;
    const uid = db.shortid.generate();
    const params = [uid, menuGroupUID, name, ref, type];
    return db.query(sql, params);
  },
};

module.exports = menuModel;
