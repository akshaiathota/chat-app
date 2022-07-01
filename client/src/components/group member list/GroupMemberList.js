import React from 'react';
import { ImCross } from 'react-icons/im';
import { ChatState } from '../../utils/ChatProvider';
import MenuItem from '../menu-item/MenuItem';
import './GroupMemberList.css';
import DP from '../../assets/default dp.jpg';

function GroupMemberList({ users, handleUI }) {
    console.log(users);
    const { user, chats, setSelectedChat } = ChatState();

    function handleChatSelect(usr) {
        if (usr._id === user._id) {
            handleUI();
            return;
        }
        const chat = chats.find((ct) => !ct.isGroupChat && (ct.users ? ct.users[0]._id === usr._id || ct.users[1]._id === usr._id : false));
        console.log(chat);
        setSelectedChat(chat);
        handleUI();
    }

    return (
        <div className='gml-container'>
            <ImCross style={{ width: '15px', cursor: 'pointer', position: 'absolute', top: '14px', right: '14px', color: 'white' }} onClick={handleUI} />
            <div className='gml-title'>
                <h4>Group Members</h4>
            </div>
            <div className='gml-list'>
                {
                    users ? users.map((result) =>
                        <MenuItem key={result._id}
                            text={result.name}
                            user={result}
                            style={{ height: '55px', marginBottom: '0px', borderRadius: '8px' }}
                            onClick={handleChatSelect} >
                            <div style={{ width: '40px', height: '40px', margin: '0px 25px 0px', backgroundColor: 'black', borderRadius: '50%', overflow: 'hidden' }}>
                                <img src={result.pic === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ?
                                    DP :
                                    result.pic}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </MenuItem>
                    )
                        : <></>
                }
            </div>
        </div>
    )
}

export default GroupMemberList