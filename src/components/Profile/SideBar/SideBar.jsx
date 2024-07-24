import './SideBar.css'
import profile from '../../../assets/profile.svg'

function SideBar(props) {
    return (
        <div className="sidebar">
            <div className="sidebar__profile-container">
                <img src={profile} alt="profile__picture" className="sidebar__avatar" />
                <p className="sidebar__username">Terrence Tegegne</p>
            </div>
        </div>
    )
}

export default SideBar;