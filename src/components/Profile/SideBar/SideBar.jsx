import { useContext } from 'react';
import './SideBar.css'
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function SideBar(props) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <div className="sidebar">
            <div className="sidebar__profile-container">
                <img src={currentUser.avatar} alt="profile__picture" className="sidebar__avatar" />
                <p className="sidebar__username">{currentUser.name}</p>
            </div>
            <div className="sidebar__profile-options">
                <button type="button" className='sidebar__option' onClick={props.handleProfileChange}>Change profile data</button>
                <button type="button" className='sidebar__option' onClick={props.handleLogOut}>Log out</button>
            </div>
        </div>
    )
}

export default SideBar;