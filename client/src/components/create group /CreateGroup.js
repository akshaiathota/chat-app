import React, { useState } from 'react';
import './CreateGroup.css';

function CreateGroup({ handleGroupUI, handleNext, handleInputChange }) {

    return (
        <form onSubmit={handleNext}>
            <div className='create-group'>
                <div className='cg-inputs'>
                    <div className='cg-img-holder'>

                    </div>
                    <input type='text' placeholder='Group Name' onChange={(event) => handleInputChange(event.target.value)} required />
                </div>
                <div className='cg-buttons'>
                    <input type='button' value='Cancel' onClick={() => handleGroupUI()} />
                    <input type='submit' value='Next' />
                </div>
            </div>
        </form>
    )
}

export default CreateGroup;