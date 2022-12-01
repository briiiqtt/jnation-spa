const express = require('express');
const router = express.Router();
const InsufficientArgumentError = require('../Errors/InsufficientArgumentError');
const MenuAddFailedError = require('../Errors/MenuAddFailedError');
const menuModel = require('../models/menuModel');

router.use((req, res, next) => {
  next();
});

router.post('/group/add', async (req, res) => {
  try {
    const { name } = req.body;
    const isSufficient = [name].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    const qr = await menuModel.addMenuGroup(name);
    if (qr.affectedRows === 1) {
      res.sendStatus(200);
    } else {
      throw new MenuAddFailedError();
    }
  } catch (e) {
    if (e instanceof MenuAddFailedError) {
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.post('/content/add', async (req, res) => {
  try {
    const { menuGroupUID, name } = req.body;
    let { ref, type } = req.body;
    const isSufficient = [menuGroupUID, name].every((v) => v ?? false);
    if (!isSufficient) throw new InsufficientArgumentError();

    ref = !ref ? null : ref;
    type = !type ? null : type;

    const qr = await menuModel.addMenuContent(menuGroupUID, name, ref, type);
    if (qr.affectedRows === 1) {
      res.sendStatus(200);
    } else {
      throw new MenuAddFailedError();
    }
  } catch (e) {
    if (e instanceof MenuAddFailedError) {
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});
router.get('/get', async (req, res) => {
  try {
    const qr = await menuModel.getMenuGroupUIDs();
    const menus = [];
    for (let r of qr) {
      r = { ...r, contents: [] };
      const qrr = await menuModel.getContentByGroupUID(r.uid);
      for (let rr of qrr) {
        r.contents.push({ ...rr });
      }
      menus.push(r);
    }
    res.send(menus);
  } catch (e) {
    if (e instanceof InsufficientArgumentError) {
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});

module.exports = router;
