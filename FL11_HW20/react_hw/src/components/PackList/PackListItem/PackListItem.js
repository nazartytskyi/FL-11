import React from 'react';
import PropTypes from 'prop-types'
import Button from '../../Button/Button.js'
import './PackListItem.scss'

class PackListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pack:props.pack};
    }

    render () {
        let className = 'item'
        if(this.props.packsInBasket.includes(this.state.pack)){
            className = 'item disabled'
        } 

        return (
            <div  className={className}>
                <div className="preview-wrapper">
                    <div className="preview-item-1">{this.state.pack.emoji[0].char}</div>
                    <div className="preview-item-2">{this.state.pack.emoji[1].char}</div>
                    <div className="preview-item-3">{this.state.pack.emoji[2].char}</div>
                </div>

                <div className="item-title">{this.state.pack.title}</div>

                <Button callback={()=>{this.props.addToBusket(this.state.pack)}} text={`Get(${this.state.pack.price}$)`}/>
            </div>
        )
    }
}

PackListItem.propTypes = {
    packsInBasket: PropTypes.array,
    addToBusket: PropTypes.func,
    pack: PropTypes.object
}

export default PackListItem