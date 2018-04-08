import React, { Component } from 'react';
import inventoryImage from './resources/inventory.png'
import Stats from './stats.json'
import './App.css';

function importAllImages(r) {
  let images = [];
  r.keys().map((item, index) => { images.push(r(item)); return true; });
  return images;
}

const images = importAllImages(require.context('./resources/images', false, /\.(png|jpe?g|svg)$/));

let inventoryImageStyle = {
  position: "absolute",
  left: "0px",
  bottom: "0px",
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ad: 129,
      as: 0.625*1.481,
      bonus_ad:0,
      bonus_as:0,
      bonus_crit:0,
      imagePositions: Array.apply(null, { length: images.length }).map((x, index) => x = { left: index * 64, bottom: 515, height: 64, width: 64, equipped: false, equip_index: -1 }),
      inventory: [false,false,false,false,false,false]
    };

    this.itemClicked = this.itemClicked.bind(this);
  }

  itemClicked(index) {
    let imagePositions = this.state.imagePositions;
    let newInventory = this.state.inventory;
    let empty_index = newInventory.findIndex((x)=> x === false);

    let ad = Stats[index].ad ? Stats[index].ad : 0;
    let as = Stats[index].as ? Stats[index].as : 0;
    let crit = Stats[index].crit ? Stats[index].crit : 0;

    if(!imagePositions[index].equipped){
      if(empty_index > 2){
        imagePositions[index].left = 47 + ((empty_index -3)*157);
        imagePositions[index].bottom = 143;
      }else if(empty_index >=0){
        imagePositions[index].left = 47 + (empty_index*157);
        imagePositions[index].bottom = 302;
      }else{
        return;
      }
      imagePositions[index].equipped = true;
      imagePositions[index].height = 141;
      imagePositions[index].width = 141;
      imagePositions[index].equip_index = empty_index;
      newInventory[empty_index] = true;
    }else{
      imagePositions[index].height = 64;
      imagePositions[index].width = 64;
      imagePositions[index].left = index*64;
      imagePositions[index].bottom = 515;
      imagePositions[index].equipped = false;
      newInventory[imagePositions[index].equip_index] = false;
      imagePositions[index].equip_index = -1;

      ad *= -1;
      as *= -1;
      crit *=-1;
    }
    this.setState(
      { 
        imagePositions: imagePositions,
        inventory: newInventory, 
        bonus_ad: this.state.bonus_ad + ad, 
        bonus_as: this.state.bonus_as + as, 
        bonus_crit: this.state.bonus_crit + crit });
  }

  render() {
    return (
      <div>
        <h1>Level 18</h1>
        <h3>Attack Damage: {(this.state.ad + this.state.bonus_ad)*1.44*(1 +(this.state.bonus_crit*0.4/100))*(1+(0.25/100*(this.state.bonus_as+ this.state.as)))}</h3>
        <h3>Attack Speed: {this.state.as}</h3>
        <br/>
        <h3>Bonus Attack Damage: {this.state.bonus_ad}</h3>
        <h3>Bonus Attack Speed: {this.state.bonus_as}</h3>
        <h3>Bonus Crit: {this.state.bonus_crit}</h3>
        <img alt="" style={inventoryImageStyle} src={inventoryImage} />
        {
          images.map((x, index) =>
            <img alt=""
              style={
                {
                  position: "absolute",
                  bottom: `${this.state.imagePositions[index].bottom}px`,
                  left: `${this.state.imagePositions[index].left}px`,
                  height: `${this.state.imagePositions[index].height}px`,
                  width: `${this.state.imagePositions[index].width}px`
                }
              }
              key={index} src={x} onClick={() => this.itemClicked(index)} />)}
      </div>
    );
  }
}



export default App;
