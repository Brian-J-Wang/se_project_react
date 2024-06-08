import './Header.css'
import logo from '../../assets/logo.svg'

function Header(props) {
    return (
        <div className="header">
            <div className="header__left-content">
                <img src={logo} alt="" className="header__logo" />
                <p className="header__info"> June 15, New York</p>
            </div>
            <div className="header__right-content">
                <button className="header__add-clothes-modal">+ Add clothes</button>
                <p className="header__username"></p>
                <img src="" alt="profilePicture" className="header__profile-picture" />
            </div>
        </div>
    )
}

export default Header;