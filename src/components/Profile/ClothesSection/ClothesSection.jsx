import './ClothesSection.css'
import defaultClothingItems from '../../../utils/defaultClothing.js'
import ItemCard from '../../ItemCard/ItemCard.jsx'
import { useContext, useEffect } from 'react'
import { UserClothingContext } from '../../../contexts/UserClothingContext.js'

function ClothesSection(props) {
    const clothingContext = useContext(UserClothingContext);

    //refresh the clothing section whenever the userClothingContext gets updated in App.js.
    useEffect(() => {

    }, [clothingContext]);

    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <h1 className="clothes-section__header-title">Your items</h1>
                <button className="clothes-section__add" onClick={props.handleAddClothesClick}>+ Add New</button>
            </div>
            <div className="clothes-section__content">
                {
                    clothingContext.userClothing.map((item) => {
                        return (
                            <ItemCard key={item._id} name={item.name} link={item.imageUrl} weatherType={item.weather} handleCardClick={props.handleCardClick} id={item._id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ClothesSection;