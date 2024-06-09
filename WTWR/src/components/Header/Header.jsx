import './Header.css'
import logo from '../../assets/logo.svg'
import profile from '../../assets/profile.svg';

function Header(props) {
    return (
        <div className="header">
            <div className="header__left-content">
                <img src={logo} alt="" className="header__logo" />
                <p className="header__info"> {props.date}, {props.location}</p>
            </div>
            <div className="header__right-content">
                <button className="header__add-clothes-button">+ Add clothes</button>
                <p className="header__username">Terrence Tegegne</p>
                <img src={profile} alt="profilePicture" className="header__profile-picture" />
            </div>
        </div>
    )
}

export default Header;