import './ItemCard.css'

function ItemCard(props) {

    function handleCardClick() {
        props.handleCardClick(props.name, props.link, props.weatherType, props.id);
    }

    return (
        <div className="item-card" onClick={handleCardClick}>
            <h1 className='item-card__name'>{props.name}</h1>
            <img src={props.link} alt={props.name} className='item-card__image' />
        </div>
    )
}

export default ItemCard;