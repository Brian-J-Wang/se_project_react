import './ClothesSection.css'
import ItemCard from '../../ItemCard/ItemCard.jsx'
import { useContext, useEffect } from 'react'
import { UserClothingContext } from '../../../contexts/UserClothingContext.js'
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js'

function ClothesSection(props) {
    const userContext = useContext(CurrentUserContext);
    const clothingContext = useContext(UserClothingContext);

    console.log(props.handleCardClick);

    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <h1 className="clothes-section__header-title">Your items</h1>
                <button className="clothes-section__add" onClick={props.handleAddClothesClick}>+ Add New</button>
            </div>
            <div className="clothes-section__content">
                {
                    clothingContext.userClothing.filter((item) => {
                        return item.owner == userContext._id;
                    }).map((item) => {
                        return (
                            <ItemCard key={item._id} name={item.name} link={item.imageUrl}
                            owner={item.owner}
                            weatherType={item.weather} handleCardClick={props.handleCardClick} id={item._id}
                            onCardLike={props.onCardLike}
                            isLoggedIn={props.isLoggedIn}
                            isLiked={item.likes.includes(item.owner)}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ClothesSection;