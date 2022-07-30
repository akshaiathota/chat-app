import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import getChats from '../../redux/chats/chatSelector';
import { getLoggedUser } from '../../redux/user/userSelectors';
import AddGroupMembers from '../add group members/AddGroupMembers';
import CreateGroup from '../create group /CreateGroup';
import GroupMemberList from '../group member list/GroupMemberList';
import MenuItem from '../menu-item/MenuItem';
import './ChatMenu.css';

function ChatMenu() {
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [groupMembersUI, setGroupMembersUI] = useState(false);
    const renameGroupUI = useSelector(state => state.renameGroup);
    const addUserUI = useSelector(state => state.addMembers);
    const removeUserUI = useSelector(state => state.removeMembers);
    const chats = useSelector(getChats);
    const user = useSelector(getLoggedUser);
    const ids = useSelector(state => state.selectedChat.users).map((usr) => usr._id);
    const chat = useSelector((state) => state.selectedChat);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [chats]);

    function handleAddUserUI() {
        if (dropDownMenu) {
            handleDropDown();
        }
        dispatch({ type: 'ADD_MEMBERS_TOGGLE' });
    }

    function handleRemoveUserUI() {
        if (dropDownMenu) {
            handleDropDown();
        }
        dispatch({ type: 'REMOVE_MEMBERS_TOGGLE' });
    }

    function handleRenameGroupUI() {
        if (dropDownMenu) {
            handleDropDown();
        }
        dispatch({ type: 'RENAME_GROUP_TOGGLE' });
    }

    function handleGroupMembersUI() {
        if (dropDownMenu) {
            handleDropDown();
        }
        setGroupMembersUI(!groupMembersUI);
    }

    function handleDropDown() {
        setDropDownMenu(!dropDownMenu);
    }

    useEffect(() => {

    }, [user, addUserUI, removeUserUI, renameGroupUI]);

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
                        operation='add'
                        existingUserIds={ids}
                        groupId={chat._id}
                        existingUsers={chat.users}
                        groupAdmin={chat.groupAdmin}
                    />
                    : <></>
            }
            {
                removeUserUI ?
                    <AddGroupMembers
                        operation='remove'
                        existingUserIds={ids}
                        groupId={chat._id}
                        existingUsers={chat.users}
                        groupAdmin={chat.groupAdmin}
                    />
                    : <></>
            }
            {
                renameGroupUI ?
                    <CreateGroup
                        placeholder={'New Group Name'}
                        operation={'Rename'}
                    />
                    : <></>
            }
            {
                groupMembersUI ?
                    <GroupMemberList
                        users={chat.users}
                        handleUI={handleGroupMembersUI}
                    />
                    : <></>
            }
        </>
    )
}

export default ChatMenu;