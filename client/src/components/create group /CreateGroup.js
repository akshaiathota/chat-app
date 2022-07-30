import React, { useEffect, useRef } from 'react';
import './CreateGroup.css';
import { useDispatch, useSelector } from 'react-redux';
import chatActionTypes from '../../redux/chats/chatActionTypes';

function CreateGroup({ handleInputChange, placeholder, operation }) {
    const dispatch = useDispatch();
    const menuState = useSelector(state => state.navMenu);
    const createGroup = useSelector(state => state.createGroup);
    const renameGroup = useSelector(state => state.renameGroup);
    const selectedChat = useSelector(state => state.selectedChat);
    const user = useSelector(state => state.user);
    const inputRef = useRef();

    function handleChange(event) {
        if (createGroup)
            handleInputChange(event.target.value);
    }

    function handleOnSubmitRename(event) {
        event.preventDefault();
        const payload = {
            name: inputRef.current.value,
            chatId: selectedChat._id,
            token: user.token
        };
        dispatch({ type: chatActionTypes.RENAME_GROUP, payload: payload });
    }

    function handleGroupUI() {
        if (createGroup) {
            dispatch({ type: 'CREATE_GROUP_TOGGLE' });
        }
        if (renameGroup) {
            dispatch({ type: 'RENAME_GROUP_TOGGLE' });
        }
        if (menuState)
            dispatch({ type: 'NAV_MENU_TOGGLE' });
    }

    function handleNext(event) {
        if (createGroup) {
            event.preventDefault();
            handleGroupUI();
            dispatch({ type: 'ADD_MEMBERS_NEW_GROUP_TOGGLE' });
        }
        if (renameGroup) {
            handleOnSubmitRename(event);
        }
    }

    useEffect(() => {

    }, [menuState, createGroup, renameGroup, user, selectedChat])

    return (
        createGroup || renameGroup ?
            <form onSubmit={handleNext}>
                <div className='create-group'>
                    <div className='cg-inputs'>
                        {
                            !operation ?
                                <div className='cg-img-holder'>

                                </div>
                                :
                                <></>
                        }
                        <input
                            type='text'
                            placeholder={placeholder ? placeholder : 'Group Name'}
                            onChange={handleChange}
                            ref={inputRef}
                            required />
                    </div>
                    <div className={`${operation ? 'cg-r-buttons' : ''} cg-buttons`}>
                        <input type='button' value='Cancel' onClick={handleGroupUI} />
                        <input type='submit' value={operation ? operation : 'Next'} />
                    </div>
                </div>
            </form>
            : <></>
    )
}

export default CreateGroup;