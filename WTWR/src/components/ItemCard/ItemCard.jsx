import './ItemCard.css'

function ItemCard(props) {
    return (
        <div className="item-card">
            <h1 className='item-card__name'>{props.name}</h1>
            <img src={props.link} alt={props.name} className='item-card__image' />
        </div>
    )
}

export default ItemCard;