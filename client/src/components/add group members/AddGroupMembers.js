import React, { useEffect, useState } from 'react';
import './AddGroupMembers.css';
import { FcSearch } from 'react-icons/fc';
import MenuItem from '../menu-item/MenuItem';
import { ImCross } from 'react-icons/im';
import { toast, ToastContainer } from 'react-toastify';
import DP from '../../assets/default dp.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelectors';
import chatActionTypes from '../../redux/chats/chatActionTypes';
import groupOperationsActionTypes from '../../redux/group operations/GroupOperationsActionTypes';

function AddGroupMembers({ groupName, heading, operation, existingUserIds, groupId, existingUsers, groupAdmin }) {
    const user = useSelector(getLoggedUser);
    const addMembersToNewGroup = useSelector(state => state.addMembersNewGroup);
    const addMembers = useSelector((state) => state.addMembers);
    const removeMembers = useSelector((state) => state.removeMembers);
    const menuState = useSelector((state) => state.navMenu);
    const [search, setSearch] = useState("");
    const searchResult = useSelector(state => state.groupOperations.searchResult);
    const selectedUsers = useSelector(state => state.groupOperations.selectedUsers);
    const dispatch = useDispatch();

    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    function handleCloseUI() {
        if (addMembers)
            dispatch({ type: 'ADD_MEMBERS_TOGGLE' });
        if (removeMembers)
            dispatch({ type: 'REMOVE_MEMBERS_TOGGLE' });
        if (addMembersToNewGroup) {
            dispatch({ type: 'ADD_MEMBERS_NEW_GROUP_TOGGLE' });
        }
    }

    function handleUI() {
        handleCloseUI();
        dispatch({ type: groupOperationsActionTypes.CLEAR_GROUP_OPERATIONS_DATA });
        if (menuState)
            dispatch({ type: 'NAV_MENU_TOGGLE' });
    }

    function findUsersWithName() {
        const payload = {
            token: user.token,
            search
        };
        dispatch({ type: groupOperationsActionTypes.SEARCH_USER_WITH_NAME, payload: payload });
    }

    function handleSelectUser(user) {
        dispatch({ type: groupOperationsActionTypes.ADD_SELECTED_USER, payload: user });
    }

    async function handleOnSubmit(event) {
        event.preventDefault();
        if (!existingUserIds && operation === 'add') {
            if (selectedUsers.length < 2) {
                toast('minimum of 2 other users required');
                return;
            }
            const payload = {
                name: groupName,
                token: user.token,
                users: selectedUsers
            };
            dispatch({ type: chatActionTypes.CREATE_GROUP_CHAT, payload: payload });
        }
        else if (existingUserIds && operation === 'add') {
            if (selectedUsers.length === 1) {
                if (groupAdmin._id !== user._id) {
                    toast('only admins can add/remove new users');
                    handleCloseUI();
                    return;
                }
                const payload = {
                    userId: selectedUsers[0]._id,
                    chatId: groupId,
                    token: user.token
                }
                dispatch({ type: chatActionTypes.ADD_USER, payload: payload });
            }
            else {
                toast('only 1 user can added at a time');
                return;
            }
        }
        else if (operation === 'remove') {
            if (selectedUsers.length === 1) {
                if (groupAdmin._id !== user._id) {
                    toast('only admins can add/remove new users');
                    handleCloseUI();
                    return;
                }
                const payload = {
                    userId: selectedUsers[0]._id,
                    chatId: groupId,
                    token: user.token
                }
                dispatch({ type: chatActionTypes.REMOVE_USER, payload: payload });
            }
            else {
                toast('only 1 user can added at a time');
                return;
            }
            dispatch({ type: groupOperationsActionTypes.CLEAR_GROUP_OPERATIONS_DATA });
        }
        dispatch({ type: groupOperationsActionTypes.CLEAR_GROUP_OPERATIONS_DATA });
    }

    function handleRemoveUser(user) {
        dispatch({ type: groupOperationsActionTypes.REMOVE_SELECTED_USER, payload: user });
    }

    useEffect(() => {
        if (search && operation !== 'remove') {
            dispatch({ type: groupOperationsActionTypes.SET_EXISTING_IDS, payload: existingUserIds });
            findUsersWithName();
        }
        else if (search && operation === 'remove') {
            dispatch({ type: groupOperationsActionTypes.SET_SEARCH_RESULT, payload: existingUsers });
        }
        else {
            dispatch({ type: groupOperationsActionTypes.SET_SEARCH_RESULT, payload: [] });
        }
    }, [search]);

    useEffect(() => {
    }, [user, addMembers, searchResult, selectedUsers, removeMembers, addMembersToNewGroup]);

    return (
        addMembers || removeMembers || addMembersToNewGroup ?
            <form onSubmit={handleOnSubmit}>
                <ToastContainer />
                <div className='add-members'>
                    <div className='am-header'>
                        {
                            heading ? heading : (<>{addMembers || addMembersToNewGroup ? 'Add Members' : removeMembers ? 'Remove Members' : ''}</>)
                        }
                    </div>
                    <div className='am-search-bar'>
                        <FcSearch style={{ paddingRight: '8px' }} size='28px' />
                        <input type='text' placeholder='Search' onChange={handleInputChange} />
                    </div>
                    <div className='am-added-list'>
                        {
                            selectedUsers && selectedUsers.length > 0 ? selectedUsers.map((result) =>
                                <MenuItem key={result._id}
                                    user={result}
                                    style={{ height: '35px', width: 'max-content', margin: '0px 3px', borderRadius: '8px', fontSize: '12px', padding: '3px', cursor: 'default' }}
                                >
                                    <div style={{ width: '25px', height: '25px', marginRight: '5px', backgroundColor: 'black', borderRadius: '50%', overflow: 'hidden' }} className='am-selected-list'>
                                        <img src={result.pic === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ?
                                            DP :
                                            result.pic}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    {result.name}
                                    <ImCross style={{ cursor: 'pointer', padding: '5px', color: 'white' }} onClick={() => handleRemoveUser(result)} size='10px' />
                                </MenuItem>
                            )
                                : <></>
                        }
                    </div>
                    <div className='am-contact-list'>
                        {
                            searchResult.length > 0 ? searchResult.map((result) =>
                                <MenuItem key={result._id} text={result.name} user={result} style={{ height: '55px', marginBottom: '0px', borderRadius: '8px' }} onClick={handleSelectUser} >
                                    <div style={{ width: '40px', height: '40px', margin: '0px 25px 0px', backgroundColor: 'black', borderRadius: '50%', overflow: 'hidden' }}>
                                        <img src={result.pic === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ?
                                            DP :
                                            result.pic}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                </MenuItem>
                            ) :
                                <></>
                        }
                    </div>
                    <div className='am-buttons'>
                        <input type='button' value='Cancel' onClick={handleUI} />
                        <input type='submit' value={operation ? operation : 'Create'} />
                    </div>
                </div>
            </form>
            : <></>
    )
}

export default AddGroupMembers;