import React from 'react';
import './MenuItem.css';

function MenuItem({ children, text, onClick }) {
    return (
        <div className='menu-item' onClick={onClick}>
            {children}
            {text ? text : ""}
        </div>
    )
}

export default MenuItem;