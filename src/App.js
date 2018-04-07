import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import inventoryImage from './resources/inventory.png'
import './App.css';

function importAllImages(r){
  let images = [];
  r.keys().map((item, index) => { images.push(r(item)); return true;});
  return images;
}

const images = importAllImages(require.context('./resources/images', false, /\.(png|jpe?g|svg)$/));

let inventoryImageStyle ={
  position: "absolute",
  left: "0px",
  bottom: "0px",
};


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      attack_damage:0,
      inventory_x: 0,
      inventory_y: 0,
    };

    this.itemClicked = this.itemClicked.bind(this);
    this.inventoryRef = React.createRef();
  }

  itemClicked(key){
    console.log(this.inventoryRef)
    console.log(key);
  }

  render() {

    
    return (
      <div>
        <h1>League of legends</h1>
        <h3>Attack Damage: {this.state.attack_damage}</h3>
        {images.map((x, index)=> <img alt="" key={index} src={x} onClick={()=>this.itemClicked(index)}/>)}
        <img ref={this.inventoryRef} alt="" style={inventoryImageStyle} src={inventoryImage}/>
      </div>
    );
  }
}



export default App;
