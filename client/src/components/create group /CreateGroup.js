import React, { useEffect } from 'react';
import './CreateGroup.css';
import { useDispatch, useSelector } from 'react-redux';

function CreateGroup({ handleInputChange, placeholder, operation }) {
    const dispatch = useDispatch();
    const menuState = useSelector(state => state.navMenu);
    const createGroupState = useSelector(state => state.createGroup);

    function handleChange(event) {
        handleInputChange(event.target.value);
    }

    function handleGroupUI() {
        dispatch({ type: 'CREATE_GROUP_TOGGLE' });
        if (menuState)
            dispatch({ type: 'NAV_MENU_TOGGLE' });
    }

    function handleNext(event) {
        event.preventDefault();
        handleGroupUI();
        dispatch({ type: 'ADD_MEMBERS_TOGGLE' });
    }

    useEffect(() => {

    }, [menuState, createGroupState])

    return (
        createGroupState ?
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
            : <></>
    )
}

export default CreateGroup;