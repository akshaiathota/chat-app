import React, { useEffect, useState } from 'react';
import { ChatState } from '../../utils/ChatProvider';
import './AddGroupMembers.css';
import { FcSearch } from 'react-icons/fc';
import { createGroupChat, searchUserByName } from '../../utils/httpRequests';
import MenuItem from '../menu-item/MenuItem';
import { ImCross } from 'react-icons/im';

function AddGroupMembers({ handleAddGroupMembersUI, groupName }) {
    //console.log(groupName);
    const { user, chats, setChats } = ChatState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    async function findUsersWithName() {
        const response = await searchUserByName(search, user.token);
        // console.log(response);
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

    async function handleOnSubmit() {
        const response = await createGroupChat(groupName, selectedUsers, user.token);
        // console.log(response);
        if (response && response.data) {
            const doesChatExist = chats.find((chat) => chat._id === response.data._id);
            if (doesChatExist) {
                return;
            }
            setChats((prev) => {
                return [response.data, ...prev];
            });
            handleAddGroupMembersUI();
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
        if (search) {
            findUsersWithName();
        }
        else {
            setSearchResult([]);
        }
        //console.log(selectedUsers);
    }, [search]);

    return (
        <div className='add-members'>
            <div className='am-header'>
                Add Members <span>1/20000</span>
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
                <input type='button' value='Create' onClick={handleOnSubmit} />
            </div>
        </div>
    )
}

export default AddGroupMembers;