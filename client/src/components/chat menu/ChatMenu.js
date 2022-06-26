import React, { useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ChatState } from '../../utils/ChatProvider';
import { renameGroup } from '../../utils/httpRequests';
import AddGroupMembers from '../add group members/AddGroupMembers';
import CreateGroup from '../create group /CreateGroup';
import GroupMemberList from '../group member list/GroupMemberList';
import MenuItem from '../menu-item/MenuItem';
import './ChatMenu.css';

function ChatMenu(chat) {
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [addUserUI, setAddUserUI] = useState(false);
    const [removeUserUI, setRemoveUserUI] = useState(false);
    const [groupMembersUI, setGroupMembersUI] = useState(false);
    const [renameGroupUI, setRenameGroupUI] = useState(false);
    const [newGroupName, setNewGroupName] = useState(false);
    const { chats, setChats, user, setSelectedChat } = ChatState();
    const ids = chat.chat.users.map((usr) => usr._id);

    function handleAddUserUI() {
        if (dropDownMenu) {
            handleDropDown();
        }
        setAddUserUI(!addUserUI);
    }

    function handleRemoveUserUI() {
        if (dropDownMenu) {
            handleDropDown();
        }
        setRemoveUserUI(!removeUserUI);
    }

    function handleRenameGroupUI() {
        if (dropDownMenu) {
            handleDropDown();
        }
        setRenameGroupUI(!renameGroupUI);
    }

    function handleGroupMembersUI() {
        if (dropDownMenu) {
            handleDropDown();
        }
        setGroupMembersUI(!groupMembersUI);
    }

    function handleNameChange(value) {
        setNewGroupName(value);
    }

    async function handleOnSubmitRename(event) {
        event.preventDefault();
        const response = await renameGroup(newGroupName, chat.chat._id, user.token);
        console.log(response);
        const remainingChats = chats.filter((ct) => ct._id !== chat.chat._id);
        setChats([response.data, ...remainingChats]);
        console.log(remainingChats);
        setSelectedChat(response.data);
        handleRenameGroupUI();
    }

    function handleDropDown() {
        setDropDownMenu(!dropDownMenu);
    }

    return (
        <>
            <BsThreeDotsVertical size={20}
                style={{ position: 'absolute', right: '25px', top: '18px', cursor: 'pointer' }}
                onClick={handleDropDown}
            />
            {
                dropDownMenu ?
                    <div className='cm-drop-down'>
                        <MenuItem
                            text={'Add User'}
                            style={{ paddingLeft: '30px', color: 'white', marginBottom: '0px' }}
                            onClick={handleAddUserUI}
                        />
                        <MenuItem
                            text={'Remove User'}
                            style={{ paddingLeft: '30px', color: 'white', marginBottom: '0px' }}
                            onClick={handleRemoveUserUI}
                        />
                        <MenuItem
                            text={'Rename Group'}
                            style={{ paddingLeft: '30px', color: 'white', marginBottom: '0px' }}
                            onClick={handleRenameGroupUI}
                        />
                        <MenuItem
                            text={'Group Members'}
                            style={{ paddingLeft: '30px', color: 'white', marginBottom: '0px' }}
                            onClick={handleGroupMembersUI}
                        />
                    </div>
                    : <></>
            }
            {
                addUserUI ?
                    <AddGroupMembers
                        handleAddGroupMembersUI={handleAddUserUI}
                        operation='add'
                        existingUserIds={ids}
                        groupId={chat.chat._id}
                        existingUsers={chat.chat.users}
                        groupAdmin={chat.chat.groupAdmin}
                    />
                    : <></>
            }
            {
                removeUserUI ?
                    <AddGroupMembers
                        handleAddGroupMembersUI={handleRemoveUserUI}
                        operation='remove'
                        existingUserIds={ids}
                        groupId={chat.chat._id}
                        existingUsers={chat.chat.users}
                        groupAdmin={chat.chat.groupAdmin}
                    />
                    : <></>
            }
            {
                renameGroupUI ?
                    <CreateGroup
                        handleGroupUI={handleRenameGroupUI}
                        handleNext={handleOnSubmitRename}
                        handleInputChange={handleNameChange}
                        placeholder={'New Name'}
                        operation={'Rename'}
                    />
                    : <></>
            }
            {
                groupMembersUI ?
                    <GroupMemberList
                        users={chat.chat.users}
                        handleUI={handleGroupMembersUI}
                    />
                    : <></>
            }
        </>
    )
}

export default ChatMenu;