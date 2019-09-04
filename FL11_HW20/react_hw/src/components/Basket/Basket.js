import React from 'react';
import PropTypes from 'prop-types'
import BasketItem from './BasketItem/BasketItem'
import Button from '../Button/Button'
import './Basket.scss'

class Basket extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {price:''};
    }

    render() {
        let sum = 0;
        let itemsList;
        let disabled = false;

        if(this.props.packsInBasket.length){
            itemsList = this.props.packsInBasket.map(el => { 
                return <BasketItem deleteBasketItem={this.props.deleteBasketItem} key={el.id} item={el}/>
            });

            for(let i = 0; i < this.props.packsInBasket.length; i++) {
                sum += this.props.packsInBasket[i].price;
            }
            
            sum = `(${sum}$)`;
        } else {
            itemsList = ''
            sum = '';
            disabled = true;
        }    

        return(
            <div className="basket">
                <h3>Basket</h3>
                <ul className="basket-items-list">
                    {itemsList}
                </ul>
                <Button disabled={disabled} text={`Purchase ${sum}`}/>
            </div>
        )
    }
}

Basket.propTypes = {
    deleteBasketItem: PropTypes.func,
    packsInBasket: PropTypes.array
}

export default Basket