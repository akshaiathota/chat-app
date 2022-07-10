import React, { useEffect, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ChatState } from '../../utils/ChatProvider';
import { accessChat, searchUserByName } from '../../utils/httpRequests';
import MenuItem from '../menu-item/MenuItem';
import './GlobalSearch.css';
import DP from '../../assets/default dp.jpg';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelectors';

const GlobalSearch = ({ handleClose }) => {
    const { chats, setChats } = ChatState();
    const user = useSelector(getLoggedUser);
    const search = useRef();
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

    }, [user]);

    async function fetchSearchedUser() {
        console.log('fetching searched user');
        const response = await searchUserByName(search.current.value, user.token);
        console.log(response);
        if (response.status === 'error') {
            toast(response.message);
            if (response.message === 'Not authorized, token failed') {
                localStorage.removeItem('userData');
                navigate('/');
            }
        }
        else {
            const { data } = response;
            setSearchResult(data);
        }
    }

    async function handleFetchChat(usr) {
        console.log(usr);
        const { data } = await accessChat(usr._id, user.token);
        console.log(data);
        const doesChatExists = chats.find((chat) => chat._id === data._id);
        console.log(doesChatExists);
        if (!doesChatExists) {
            setChats((prev) => {
                return [data, ...prev];
            });
        }
        setSearchResult([]);
        handleClose();
    }

    return (
        <>
            <ToastContainer />
            <div className='global-search'>
                <ImCross style={{ width: '15px', cursor: 'pointer', position: 'absolute', top: '14px', right: '14px', color: 'white' }} onClick={handleClose} />
                <div className='gs-inputs'>
                    <input type='text' placeholder='Enter name' ref={search} />
                    <input type='button' value='Go' onClick={fetchSearchedUser} />
                </div>
                <div className='gs-results'>
                    {
                        searchResult.length > 0 ?
                            searchResult.map((result) =>
                                <MenuItem key={result._id} text={result.name} user={result} style={{ height: '55px', marginBottom: '0px', borderRadius: '8px' }} onClick={handleFetchChat}>
                                    <div style={{ width: '40px', height: '40px', margin: '0px 25px 0px', backgroundColor: 'black', borderRadius: '50%', overflow: 'hidden' }}>
                                        <img src={result.pic === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ?
                                            DP :
                                            result.pic}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                </MenuItem>
                            )
                            :
                            <></>
                    }
                </div>
            </div>
        </>

    )
}

export default GlobalSearch;