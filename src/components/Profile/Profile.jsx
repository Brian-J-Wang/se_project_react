import './Profile.css'
import SideBar from './SideBar/SideBar';
import ClothesSection from './ClothesSection/ClothesSection';

function Profile(props) {
    return (
        <div className="profile">
            <SideBar handleLogOut={props.handleLogOut} handleProfileChange={props.handleProfileChange}/>
            <ClothesSection handleAddClothesClick={props.handleAddClothesClick} handleCardClick={props.handleCardClick} isLoggedIn={true} onCardLike={props.onCardLike}/>
        </div>
    );
}

export default Profile;