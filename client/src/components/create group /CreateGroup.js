import React, { useState } from 'react';
import './CreateGroup.css';

function CreateGroup({ handleGroupUI, handleNext, handleInputChange, placeholder, operation }) {

    function handleChange(event) {
        handleInputChange(event.target.value);
    }

    return (
        <form onSubmit={handleNext}>
            <div className='create-group'>
                <div className='cg-inputs'>
                    {
                        !operation ?
                            <div className='cg-img-holder'>

                            </div>
                            :
                            <></>
                    }
                    <input type='text'
                        placeholder={placeholder ? placeholder : 'Group Name'}
                        onChange={handleChange}
                        required />
                </div>
                <div className={`${operation ? 'cg-r-buttons' : ''} cg-buttons`}>
                    <input type='button' value='Cancel' onClick={handleGroupUI} />
                    <input type='submit' value={operation ? operation : 'Next'} />
                </div>
            </div>
        </form>
    )
}

export default CreateGroup;