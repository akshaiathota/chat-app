import React, { useEffect, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { searchUserByName } from '../../utils/httpRequests';
import MenuItem from '../menu-item/MenuItem';
import './GlobalSearch.css';
import DP from '../../assets/default dp.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelectors';
import chatActionTypes from '../../redux/chats/chatActionTypes';

const GlobalSearch = () => {
    const user = useSelector(getLoggedUser);
    const globalSearchState = useSelector(state => state.globalSearch);
    const menuState = useSelector(state => state.navMenu);
    const search = useRef();
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleGlobalSearchUI() {
        dispatch({ type: 'GLOBAL_SEARCH_TOGGLE' });
        if (menuState) {
            dispatch({ type: 'NAV_MENU_TOGGLE' });
        }
    }

    useEffect(() => {

    }, [user, globalSearchState, menuState]);

    async function fetchSearchedUser() {
        const response = await searchUserByName(search.current.value, user.token);
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
        const data = {
            id: usr._id,
            token: user.token
        };
        dispatch({ type: chatActionTypes.ACCESS_CHAT, payload: data })
        setSearchResult([]);
        handleGlobalSearchUI();
    }

    return (
        <>
            {
                globalSearchState ?
                    <>
                        <ToastContainer />
                        <div className='global-search'>
                            <ImCross style={{ width: '15px', cursor: 'pointer', position: 'absolute', top: '14px', right: '14px', color: 'white' }} onClick={handleGlobalSearchUI} />
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
                    :
                    <></>
            }
        </>

    )
}

export default GlobalSearch;