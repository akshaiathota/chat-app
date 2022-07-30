import React from 'react';
import './MenuItem.css';

function MenuItem({ children, text, user, onClick, style }) {

    function handleClick() {
        if (onClick) {
            onClick(user);
        }
    }

    return (
        <div className='menu-item' onClick={handleClick} style={style}>
            {children}
            {text ? text.charAt(0).toUpperCase() + text.slice(1) : ""}
        </div>
    )
}

export default MenuItem;