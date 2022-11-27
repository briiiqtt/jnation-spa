import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  action_addMenuContent,
  action_addMenuGroup,
} from '../../reducers/menuReducer';

const MenuManager = () => {
  const [inputs, setInputs] = useState({});

  const onInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs(() => ({ ...inputs, [name]: value }));
  });

  const dispatch = useDispatch();
  const onMenuGroupAdd = () => {
    dispatch(
      action_addMenuGroup({
        name: inputs['menu-group-name'],
      })
    );
  };
  const onMenuContentAdd = () => {
    dispatch(
      action_addMenuContent({
        name: inputs['menu-content-name'],
        menuGroupUID: inputs['menu-group-uid'],
      })
    );
  };

  return (
    <>
      <div>
        menu group add:
        <div>
          <form name="menu-group-frm">
            name:
            <input
              type={'text'}
              name="menu-group-name"
              onChange={onInputChange}
            ></input>
            <button type="button" onClick={onMenuGroupAdd}>
              add
            </button>
          </form>
        </div>
      </div>
      <div>
        menu content add:
        <div>
          <form name="menu-content-frm">
            name:
            <input
              type={'text'}
              name="menu-content-name"
              onChange={onInputChange}
            ></input>
            group uid:
            <input
              type={'text'}
              name="menu-group-uid"
              onChange={onInputChange}
            ></input>
            group:
            <button type="button" onClick={onMenuContentAdd}>
              add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MenuManager;
