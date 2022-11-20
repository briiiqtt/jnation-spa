import { Button, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  action_addPost,
  action_setAddedPostUID,
  ADD_POST_SUC,
} from '../../reducers/boardReducer';
import { action_setTempPost } from '../../reducers/etcReducer';

const PostAdder = () => {
  const dispatch = useDispatch();
  const tempBoardUID = useSelector((state) => state.etc.tempPost.boardUID);
  const tempTitle = useSelector((state) => state.etc.tempPost.title);
  const tempContent = useSelector((state) => state.etc.tempPost.content);
  const myUID = useSelector((state) => state.user.me.uid);
  const isAddingPost = useSelector((state) => state.board.isAddingPost);
  const addedPostUID = useSelector((state) => state.board.addedPostUID);
  const navigate = useNavigate();

  const tempArr = [];
  useSelector((state) => state.menu.menus).forEach((menu) =>
    menu.contents.forEach(
      (content) => content.type === 'board' && tempArr.push(content)
    )
  );
  const options = tempArr.map((v) => ({ value: v.uid, label: v.name }));

  const onSelectChange = useCallback((e) => {
    dispatch(action_setTempPost({ boardUID: e }));
  });
  const onTitleChange = useCallback((e) => {
    dispatch(action_setTempPost({ title: e.target.value }));
  });
  const onTextChange = useCallback((e) => {
    dispatch(action_setTempPost({ content: e.target.value }));
  });

  const onSubmit = useCallback(() => {
    dispatch(
      action_addPost({
        boardUID: tempBoardUID,
        title: tempTitle,
        content: tempContent,
        authorUID: myUID,
      })
    );
  });

  useEffect(() => {
    if (tempBoardUID || tempTitle || tempContent) {
      const keepPosting = confirm(
        '작성중이던 글이 있습니다. 불러오시겠습니까?'
      );
      if (keepPosting) {
        // if (tempBoardUID)
        //   document.querySelector('#select-board-uid').value = tempBoardUID;
        // if (tempTitle) document.querySelector('#input-title').value = tempTitle;
        // if (tempContent)
        //   document.querySelector('#textarea-content').value = tempContent;
      } else {
        dispatch(
          action_setTempPost({
            boardUID: null,
            title: null,
            content: null,
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    if (addedPostUID) {
      /**
       *
       *
       *
       *setaddedpostuid 초기화해줘야된다 잠온다 일단 자자
       *
       *
       *
       */
      action_setAddedPostUID({ addedPostUID: null });
      navigate(`/board/post/${addedPostUID}`);
    }
  }, [addedPostUID]);

  return (
    <>
      <div style={{ padding: '30px' }}>
        <div style={{ fontWeight: 'bold' }}>글쓰기</div>
        <div
          style={{
            backgroundColor: '#FAFAFA',
            padding: '15px',
            border: '1px solid #E5E5E5',
            marginTop: '10px',
          }}
        >
          <Select
            placeholder="게시판을 선택하세요."
            options={options}
            style={{ width: '380px' }}
            onChange={onSelectChange}
            value={tempBoardUID}
          ></Select>
          <Input
            placeholder="글 제목을 입력하세요."
            onChange={onTitleChange}
            value={tempTitle}
          />
        </div>
        <TextArea
          showCount
          maxLength={100}
          style={{
            height: 700,
            resize: 'none',
          }}
          placeholder="WYSIWYG 추가 예정"
          onChange={onTextChange}
          value={tempContent}
          id="textarea-content"
        />
      </div>
      <div style={{ padding: '20px 40px', fontSize: '0.8rem' }}>
        <div>
          ※ 이미지를 복사하여 붙여넣기 하는 경우, 정상적으로 노출되지 않을 수
          있으니 [이미지 첨부] 기능을 이용해주세요.
        </div>
        <div>
          ※ 저작권등 다른 사람의 권리를 침해하거나 명예를 훼손하는 게시글은
          이용약관 및 관련 법률에 의해 제재를 받으실 수 있습니다.
        </div>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
      >
        <Button
          style={{
            backgroundColor: '#00B5EE',
            color: 'white',
            width: '92px',
            height: '40px',
          }}
          onClick={onSubmit}
          loading={isAddingPost}
        >
          저장
        </Button>
      </div>
    </>
  );
};
export default PostAdder;
