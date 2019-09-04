import React from 'react';
import PackList from './components/PackList/PackList'
import './App.css';
import Basket from './components/Basket/Basket'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {packsInBasket: []};
  }

  addToBasket(pack) {
    if(this.state.packsInBasket.includes(pack)){
      return;
    }
    this.setState({packsInBasket: [pack,...this.state.packsInBasket]});
  }

  deleteBasketItem(pack) {
    this.setState({packsInBasket: this.state.packsInBasket.filter(item => {
      return item !==pack;
    })});
  }

  render() {
    return (
      <div className="wrapper">
        <main>
          <PackList packsInBasket={this.state.packsInBasket} addToBasket={this.addToBasket.bind(this)}/>
        </main>
        
        <aside>
          <Basket deleteBasketItem={this.deleteBasketItem.bind(this)} packsInBasket={this.state.packsInBasket}/>
        </aside>
      </div>
    );
  }
}

export default App;
