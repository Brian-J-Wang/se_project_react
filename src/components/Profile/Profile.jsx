import './Profile.css'
import SideBar from './SideBar/SideBar';
import ClothesSection from './ClothesSection/ClothesSection';

function Profile(props) {

    return (
        <div className="profile">
            <SideBar/>
            <ClothesSection handleAddClothesClick={props.handleAddClothesClick}/>
        </div>
    );
}

export default Profile;