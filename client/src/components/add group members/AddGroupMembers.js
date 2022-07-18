import React, { useEffect, useState } from 'react';
import './AddGroupMembers.css';
import { FcSearch } from 'react-icons/fc';
import { searchUserByName } from '../../utils/httpRequests';
import MenuItem from '../menu-item/MenuItem';
import { ImCross } from 'react-icons/im';
import { toast, ToastContainer } from 'react-toastify';
import DP from '../../assets/default dp.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelectors';
import chatActionTypes from '../../redux/chats/chatActionTypes';

function AddGroupMembers({ groupName, heading, operation, existingUserIds, groupId, existingUsers, groupAdmin }) {
    const user = useSelector(getLoggedUser);
    const addMembers = useSelector((state) => state.addMembers);
    const menuState = useSelector((state) => state.navMenu);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const dispatch = useDispatch();

    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    function handleAddGroupMembersUI() {
        dispatch({ type: 'ADD_MEMBERS_TOGGLE' });
        if (menuState)
            dispatch({ type: 'NAV_MENU_TOGGLE' });
    }

    async function findUsersWithName() {
        const response = await searchUserByName(search, user.token);
        if (existingUserIds) {
            const allUsers = response.data;
            const existIdsSet = new Set(existingUserIds);
            const resultList = allUsers.filter((usr) => !existIdsSet.has(usr._id));
            setSearchResult(resultList);
            return;
        }
        setSearchResult(response.data);
    }

    function handleSelectUser(user) {
        if (!selectedUsers || selectedUsers.length === 0) {
            setSelectedUsers(() => {
                return [user];
            });
        }
        else {
            const userAlreadyExists = selectedUsers.find((usr) => usr._id === user._id);
            if (userAlreadyExists) {
                return;
            }
            setSelectedUsers((prev) => {
                return [...prev, user]
            });
        }
        const newChatList = searchResult.filter((usr) => usr._id !== user._id);
        setSearchResult(newChatList);
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
                console.log('adding user');
                if (groupAdmin._id !== user._id) {
                    toast('only admins can add new users');
                    handleAddGroupMembersUI();
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
                console.log('removing user');
                if (groupAdmin._id !== user._id) {
                    toast('only admins can add new users');
                    handleAddGroupMembersUI();
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
        }
    }

    function handleRemoveUser(user) {
        const newUsers = selectedUsers.filter((usr) => usr._id !== user._id);
        setSelectedUsers(newUsers);
        setSearchResult((prev) => {
            return [...prev, user];
        });
    }

    useEffect(() => {
        if (search && operation !== 'remove') {
            findUsersWithName();
        }
        else if (search && operation === 'remove') {
            setSearchResult(existingUsers);
        }
        else {
            setSearchResult([]);
        }
    }, [search]);

    useEffect(() => {

    }, [user, addMembers]);

    return (
        addMembers ?
            <form onSubmit={handleOnSubmit}>
                <ToastContainer />
                <div className='add-members'>
                    <div className='am-header'>
                        {
                            heading ? heading : (<>Add Members <span>1/20000</span></>)
                        }
                    </div>
                    <div className='am-search-bar'>
                        <FcSearch style={{ width: '20px', paddingRight: '8px' }} />
                        <input type='text' placeholder='Search' onChange={handleInputChange} />
                    </div>
                    <div className='am-added-list'>
                        {
                            selectedUsers.length > 0 ? selectedUsers.map((result) =>
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
                                    <ImCross style={{ cursor: 'pointer', width: '10px', padding: '5px', color: 'white' }} onClick={() => handleRemoveUser(result)} />
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
                        <input type='button' value='Cancel' onClick={handleAddGroupMembersUI} />
                        <input type='submit' value={operation ? operation : 'Create'} />
                    </div>
                </div>
            </form>
            : <></>
    )
}

export default AddGroupMembers;