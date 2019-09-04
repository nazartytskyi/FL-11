import React from 'react';
import PropTypes from 'prop-types'
import './PackList.scss'
import PackListItem from './PackListItem/PackListItem'

class PackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {packArr:[]};   
        fetch('http://localhost:1337/emoji-shop')
        .then(response => response.json())
        .then(data => this.setState({ packArr: data.emoji}));
    }

    render () {
        const itemsList = this.state.packArr.map(el =><PackListItem packsInBasket={this.props.packsInBasket} addToBusket={this.props.addToBasket} key={el.id} pack={el}/>);;

        return (
            <div className="list">
                {itemsList}
            </div>
        )
    }
}

PackList.propTypes = {
    packsInBasket: PropTypes.array,
    addToBusket: PropTypes.func
}

export default PackList