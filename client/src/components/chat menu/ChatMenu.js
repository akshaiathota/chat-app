import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AddGroupMembers from '../add group members/AddGroupMembers';
import MenuItem from '../menu-item/MenuItem';
import './ChatMenu.css';

function ChatMenu(chat) {
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const [removeUser, setRemoveUser] = useState(false);
    const ids = chat.chat.users.map((usr) => usr._id);

    function handleAddUser() {
        if (dropDownMenu) {
            handleDropDown();
        }
        setAddUser(!addUser);
    }

    function handleRemoveUser() {
        if (dropDownMenu) {
            handleDropDown();
        }
        setRemoveUser(!removeUser);
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
                            onClick={handleAddUser}
                        />
                        <MenuItem
                            text={'Remove User'}
                            style={{ paddingLeft: '30px', color: 'white', marginBottom: '0px' }}
                            onClick={handleRemoveUser}
                        />
                        <MenuItem
                            text={'Rename Group'}
                            style={{ paddingLeft: '30px', color: 'white', marginBottom: '0px' }}
                        />
                    </div>
                    : <></>
            }
            {
                addUser ?
                    <AddGroupMembers
                        handleAddGroupMembersUI={handleAddUser}
                        operation='add'
                        existingUserIds={ids}
                        groupId={chat.chat._id}
                        existingUsers={chat.chat.users}
                    />
                    : <></>
            }
            {
                removeUser ?
                    <AddGroupMembers
                        handleAddGroupMembersUI={handleRemoveUser}
                        operation='remove'
                        existingUserIds={ids}
                        groupId={chat.chat._id}
                        existingUsers={chat.chat.users}
                    />
                    : <></>
            }
        </>
    )
}

export default ChatMenu;