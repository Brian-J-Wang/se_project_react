import './Header.css'
import logo from '../../assets/logo.svg'
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
                {
                    (props.isLoggedIn) ? (
                        <>
                            <button className="header__add-clothes-button" onClick={props.handleAddClothesClick}>+ Add clothes</button>
                            <div className="header__profile">
                                <p className="header__username">{props.user.name}</p>
                                <Link to={'/profile'}>
                                    <img src={props.user.avatar} alt="profilePicture" className="header__profile-picture" />
                                </Link>
                            </div>
                            
                        </>
                    ) : (
                        <>
                            <button onClick={props.handleSignUpClick} className='header__button header__sign-up'>Sign Up</button>
                            <button onClick={props.handleLogInClick} className='header__button header__log-in'>Log In</button>
                        </>
                    )
                }
                
            </div>
        </header>
    )
}

export default Header;