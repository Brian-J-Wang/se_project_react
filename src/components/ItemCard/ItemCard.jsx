import './ItemCard.css'
import heart from "../../assets/heart-default.svg"
import heartLiked from "../../assets/heart-liked.svg"

function ItemCard(props) {
    console.log(props);
    function handleCardClick() {
        props.handleCardClick(props.name, props.link, props.weatherType, props.id, props.owner);
    }

    function handleLike(evt) {
        evt.stopPropagation();
        props.onCardLike({ id: props.id, isLiked: props.isLiked });
    }

    return (
        <div className="item-card" onClick={handleCardClick}>
            <div className='item-card__header'>
                <h1 className='item-card__name'>{props.name}</h1>
                {
                    props.isLoggedIn ?
                    <button className='item-card__heart' type="button" onClick={handleLike}>
                        <img src={ props.isLiked ? heartLiked : heart} alt="heart" />
                    </button>
                    : <></>
                }
                
            </div>
            
            <img src={props.link} alt={props.name} className='item-card__image' />
        </div>
    )
}

export default ItemCard;