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

function NavigationMenu() {
    const user = useSelector(getLoggedUser);
    const menuState = useSelector((state) => state.navMenu);
    const navigate = useNavigate();
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
        dispatch({ type: 'NAV_MENU_TOGGLE' });
    }

    function handleGroupUI() {
        dispatch({ type: 'CREATE_GROUP_TOGGLE' });
        if (menuState) {
            MenuBar();
        }
    }

    function handleGlobalSearchUI() {
        dispatch({ type: 'GLOBAL_SEARCH_TOGGLE' });
        if (menuState) {
            MenuBar();
        }
    }

    useEffect(() => {

    }, [user, menuState]);

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
                                    <TiGroup style={{ margin: '0px 25px 0px' }} size='25px' />
                                </MenuItem>
                                <MenuItem text={'Global Search'} onClick={handleGlobalSearchUI}>
                                    <FcSearch style={{ margin: '0px 25px 0px' }} size='25px' />
                                </MenuItem>
                                <MenuItem text={'Log Out'} onClick={handleLogOut}>
                                    <BiLogOut style={{ margin: '0px 25px 0px' }} size='25px' />
                                </MenuItem>
                            </div>
                        </div >
                    </>
                    : <>
                        <GiHamburgerMenu size='30px' style={{ color: 'white', cursor: 'pointer', position: 'absolute', top: '19px', left: '15px' }} onClick={MenuBar} id='hambuger-cl' />
                    </>
            }
            <>
                <CreateGroup handleInputChange={handleInputChange} />
                <AddGroupMembers
                    groupName={groupName}
                    operation='add'
                />
                <GlobalSearch />
            </>
        </>
    )
}

export default NavigationMenu;