import React from 'react';
import PropTypes from 'prop-types'
import './BasketItem.scss'
import closeBtn from '../../../img/close-btn.png'

class BasketItem extends React.Component {
    render() {
        
        return(
            <li className="list-item">
                <span className="content-wrapper">
                    <span>{this.props.item.title}</span>
                    <span>{this.props.item.price}$</span>
                </span>
                <img onClick={() => this.props.deleteBasketItem(this.props.item)} src={closeBtn} alt='delete'></img>
            </li>
        )
    }
}

BasketItem.propTypes = {
    deleteBasketItem: PropTypes.func,
    item: PropTypes.object
}

export default BasketItem