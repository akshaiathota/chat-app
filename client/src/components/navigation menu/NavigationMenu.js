import React, { useState } from 'react';
import './NavigationMenu.css';
import { ImCross } from 'react-icons/im';
import MenuItem from '../menu-item/MenuItem';
import { TiGroup } from 'react-icons/ti';
import { BiLogOut } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

function NavigationMenu() {
    //console.log(props);
    const [menuState, setMenuState] = useState(false);
    const navigate = useNavigate();

    function handleLogOut() {
        localStorage.removeItem('userData');
        navigate('/');
    }

    function MenuBar() {
        setMenuState((prevValue) => {
            return !prevValue;
        });
    }
    return (
        <>{
            menuState ?
                <div className='navigation-menu'>
                    <div className='nm-exit' >
                        <ImCross style={{ cursor: 'pointer', position: 'absolute', top: '30px', left: '270px' }} onClick={MenuBar} />
                    </div>
                    <div className='nm-user-header'>
                        <div className='nm-profile-pic'>
                            <img />
                        </div>
                        <ul>
                            <li>name</li>
                            <li>12345 67890</li>
                        </ul>
                    </div>
                    <div className='nm-children'>
                        <MenuItem text={'New Group'}>
                            <TiGroup style={{ width: '25px', height: '25px', margin: '0px 25px 0px' }} />
                        </MenuItem>
                        <MenuItem text={'Log Out'} onClick={handleLogOut}>
                            <BiLogOut style={{ width: '25px', height: '25px', margin: '0px 25px 0px' }} />
                        </MenuItem>
                    </div>
                </div >
                : <GiHamburgerMenu size={30} style={{ color: 'white', cursor: 'pointer', position: 'absolute', top: '20px', left: '20px' }} onClick={MenuBar} />
        }
        </>
    )
}

export default NavigationMenu