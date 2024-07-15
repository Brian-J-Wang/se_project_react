import './Header.css'
import logo from '../../assets/logo.svg'
import profile from '../../assets/profile.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <div className="header__left-content">
                <Link to={'/'}>
                    <img src={logo} alt="logo" className="header__logo" />
                </Link>
                <p className="header__info"> {props.date}, {props.location}</p>
            </div>
            <div className="header__right-content">
                <ToggleSwitch className={'header__toggle-switch'}/>
                <button className="header__add-clothes-button" onClick={props.handleAddClothesClick}>+ Add clothes</button>
                <p className="header__username">Terrence Tegegne</p>
                <Link to={'/profile'}>
                    <img src={profile} alt="profilePicture" className="header__profile-picture" />
                </Link>
            </div>
        </header>
    )
}

export default Header;