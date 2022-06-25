import React, { useEffect, useState } from 'react';
import { ChatState } from '../../utils/ChatProvider';
import './AddGroupMembers.css';
import { FcSearch } from 'react-icons/fc';
import { addUser, createGroupChat, removeUser, searchUserByName } from '../../utils/httpRequests';
import MenuItem from '../menu-item/MenuItem';
import { ImCross } from 'react-icons/im';
import { toast, ToastContainer } from 'react-toastify';

function AddGroupMembers({ handleAddGroupMembersUI, groupName, heading, operation, existingUserIds, groupId, existingUsers }) {
    const { user, chats, setChats, setSelectedChat } = ChatState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function handleInputChange(event) {
        //console.log('handling input change');
        setSearch(event.target.value);
    }

    async function findUsersWithName() {
        const response = await searchUserByName(search, user.token);
        // console.log(existingUsers);
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
                // console.log('user Already Added');
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
        let response = null;
        if (!existingUserIds && operation === 'add') {
            if (selectedUsers.length < 2) {
                toast('minimum of 2 other users required');
                return;
            }
            response = await createGroupChat(groupName, selectedUsers, user.token);
            setChats((prev) => {
                return [response.data, ...prev];
            });
        }
        else if (existingUserIds && operation === 'add') {
            if (selectedUsers.length === 1) {
                console.log('adding user');
                response = await addUser(selectedUsers[0]._id, groupId, user.token);
                //console.log(response);
                const remainingChats = chats.filter((chat) => chat._id !== groupId);
                setChats([response.data, ...remainingChats]);
                setSelectedChat(response.data);
                //console.log(response.data);
            }
            else {
                toast('only 1 user can added at a time');
                return;
            }
        }
        else if (operation === 'remove') {
            if (selectedUsers.length === 1) {
                console.log('removing user');
                response = await removeUser(selectedUsers[0]._id, groupId, user.token);
                const remainingChats = chats.filter((chat) => chat._id !== groupId);
                console.log(remainingChats);
                console.log(response.data);
                setChats([response.data, ...remainingChats]);
                setSelectedChat(response.data);
                //console.log(response.data);
            }
            else {
                toast('only 1 user can added at a time');
                return;
            }
        }
        // console.log(response);
        if (response && response.data) {
            handleAddGroupMembersUI();
        }
        else {
            console.log(response);
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
        if (search && operation === 'add') {
            findUsersWithName();
        }
        else if (search && operation === 'remove') {
            setSearchResult(existingUsers);
        }
        else {
            setSearchResult([]);
        }
        //console.log(selectedUsers);
    }, [search]);

    return (
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
                                <div style={{ width: '25px', height: '25px', marginRight: '5px', backgroundColor: 'black', borderRadius: '50%' }} className='am-selected-list'>

                                </div>
                                {result.name}
                                <ImCross style={{ cursor: 'pointer', width: '10px', padding: '5px' }} onClick={() => handleRemoveUser(result)} />
                            </MenuItem>
                        )
                            : <></>
                    }
                </div>
                <div className='am-contact-list'>
                    {
                        searchResult.length > 0 ? searchResult.map((result) =>
                            <MenuItem key={result._id} text={result.name} user={result} style={{ height: '55px', marginBottom: '0px', borderRadius: '8px' }} onClick={handleSelectUser} >
                                <div style={{ width: '40px', height: '40px', margin: '0px 25px 0px', backgroundColor: 'black', borderRadius: '50%' }}>

                                </div>
                            </MenuItem>
                        ) :
                            <></>
                    }
                </div>
                <div className='am-buttons'>
                    <input type='button' value='Cancel' onClick={handleAddGroupMembersUI} />
                    <input type='submit' value='Create' />
                </div>
            </div>
        </form>
    )
}

export default AddGroupMembers;