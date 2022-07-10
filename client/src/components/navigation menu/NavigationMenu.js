import React, { useEffect, useState } from 'react';
import './NavigationMenu.css';
import { ImCross } from 'react-icons/im';
import MenuItem from '../menu-item/MenuItem';
import { TiGroup } from 'react-icons/ti';
import { BiLogOut } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { FcSearch } from 'react-icons/fc';
import CreateGroup from '../create group /CreateGroup';
import AddGroupMembers from '../add group members/AddGroupMembers';
import GlobalSearch from '../global search/GlobalSearch';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/user/userSelectors';
import userActionTypes from '../../redux/user/userActionTypes';

function NavigationMenu({ socket }) {
    const user = useSelector(getLoggedUser);
    const [menuState, setMenuState] = useState(false);
    const navigate = useNavigate();
    const [showCreateGroupUI, setShowCreateGroupUI] = useState(false);
    const [showAddMembersUI, setShowAddMembersUI] = useState(false);
    const [showGlobalSearchUI, setShowGlobalSearchUI] = useState(false);
    const [groupName, setGroupName] = useState("");
    const dispatch = useDispatch();

    function handleInputChange(value) {
        setGroupName(value);
    }

    function handleLogOut() {
        dispatch({ type: userActionTypes.SIGN_OUT });
        navigate('/');
    }

    function MenuBar() {
        setMenuState((prevValue) => {
            return !prevValue;
        });
    }

    function handleGroupUI() {
        console.log(showCreateGroupUI);
        setShowCreateGroupUI(!showCreateGroupUI);
        if (menuState)
            MenuBar();
    }

    function handleNext(event) {
        event.preventDefault();
        handleGroupUI();
        setShowAddMembersUI(!showAddMembersUI);
    }

    function handleAddGroupMembersUI() {
        setShowAddMembersUI((prev) => {
            return !prev;
        });
        if (menuState)
            MenuBar();
    }

    function handleGlobalSearchUI() {
        setShowGlobalSearchUI((prev) => {
            return !prev;
        });
        if (menuState) {
            MenuBar();
        }
    }

    useEffect(() => {

    }, [user]);

    return (
        <>
            {
                menuState && user ?
                    <>
                        <div className='navigation-menu'>
                            <div className='nm-exit' >
                                <ImCross style={{ cursor: 'pointer', position: 'absolute', top: '30px', left: '270px', color: 'white' }} onClick={MenuBar} />
                            </div>
                            <div className='nm-user-header'>
                                <div className='nm-profile-pic'>
                                    <img src={user.pic} />
                                </div>
                                <ul>
                                    <li>{user.name}</li>
                                    <li>{user.mobileNumber}</li>
                                </ul>
                            </div>
                            <div className='nm-children'>
                                <MenuItem text={'New Group'} onClick={handleGroupUI}>
                                    <TiGroup style={{ width: '25px', height: '25px', margin: '0px 25px 0px' }} />
                                </MenuItem>
                                <MenuItem text={'Global Search'} onClick={handleGlobalSearchUI}>
                                    <FcSearch style={{ width: '25px', height: '25px', margin: '0px 25px 0px' }} />
                                </MenuItem>
                                <MenuItem text={'Log Out'} onClick={handleLogOut}>
                                    <BiLogOut style={{ width: '25px', height: '25px', margin: '0px 25px 0px' }} />
                                </MenuItem>
                            </div>
                        </div >
                    </>
                    : <>
                        <GiHamburgerMenu size={30} style={{ color: 'white', cursor: 'pointer', position: 'absolute', top: '20px', left: '20px' }} onClick={MenuBar} />
                    </>
            }
            <>
                {
                    showCreateGroupUI ?
                        <CreateGroup handleGroupUI={handleGroupUI} handleNext={handleNext} handleInputChange={handleInputChange} />
                        : (showAddMembersUI ?
                            <AddGroupMembers
                                handleAddGroupMembersUI={handleAddGroupMembersUI}
                                groupName={groupName}
                                operation={'add'}
                                socket={socket}
                            />
                            : <></>)
                }
            </>
            <>
                {
                    showGlobalSearchUI ?
                        <GlobalSearch handleClose={handleGlobalSearchUI} />
                        : <></>
                }
            </>
        </>
    )
}

export default NavigationMenu;