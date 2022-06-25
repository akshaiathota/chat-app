import React, { useState } from 'react';
import './CreateGroup.css';

function CreateGroup({ handleGroupUI, handleNext, handleInputChange }) {

    return (
        <div className='create-group'>
            <div className='cg-inputs'>
                <div className='cg-img-holder'>

                </div>
                <input type='text' placeholder='Group Name' onChange={(event) => handleInputChange(event.target.value)} />
            </div>
            <div className='cg-buttons'>
                <input type='button' value='Cancel' onClick={() => handleGroupUI()} />
                <input type='button' value='Next' onClick={() => handleNext()} />
            </div>
        </div>
    )
}

export default CreateGroup;