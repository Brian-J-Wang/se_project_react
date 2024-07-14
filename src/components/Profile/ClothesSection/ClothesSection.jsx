import './ClothesSection.css'
import defaultClothingItems from '../../../utils/defaultClothing.js'
import ItemCard from '../../ItemCard/ItemCard.jsx'

function ClothesSection(props) {
    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <h1 className="clothes-section__header-title">Your items</h1>
                <button className="clothes-section__add" onClick={props.handleAddClothesClick}>+ Add New</button>
            </div>
            <div className="clothes-section__content">
                {
                    defaultClothingItems.map((item) => {
                        return (
                            <ItemCard key={item._id} name={item.name} link={item.link} weatherType={item.weather} handleCardClick={props.handleCardClick}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ClothesSection;