import React, { useEffect, useState } from "react";
import { UnitCard } from "../../Types/UnitCard";
import CrusadeCard from "./CrusadeCard";
import _ from 'lodash';
import { CardInputs } from "../../constants/StringConstants";

// this component was origonaly a class but i changed it to a function to use reactfire hooks

export default function OdrerOfBattle( props: {
  orderId: string;
}) { 
  const [cards, setCards] = useState<UnitCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>(0);

  useEffect( () => {})


  // functions 
  const selectCard = async(e: React.MouseEvent, cardID: number) => {
    e.preventDefault();
    await setSelectedCard(cardID);
  };

  const getCard = (cardID: number): UnitCard => {
    return cards.find(card => card.id === cardID) || new UnitCard()
  }

  const addUnit = async(e: React.MouseEvent) => {
    e.preventDefault()
    let cardID: number = 0;

    // Make sure selected ID is unique
    while(cardID === 0 && !cards.some(card => card.id === cardID)) {
      cardID = generateID()
    }

    let newCard: UnitCard = new UnitCard();
    newCard.id = cardID;
    let cardsClone = _.clone(cards);
    cardsClone.push(newCard);
    setCards(cardsClone);
  }

  const generateID = ():number => {
    const min: number = 1;
    const max: number = 9999;
    return Math.floor(Math.random() * (max - min) + min)
  }

  const updateSelectedCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedCard: UnitCard = _.cloneDeep(getCard(selectedCard));
    let newValue: string = e.target.value;
    let cardsClone: UnitCard[] = _.clone(cards);
    let cardIndex = cardsClone.findIndex(card => card.id === selectedCard);

    // update the changed attribute
    switch(e.target.name) {
      // section: id
      case CardInputs.unitName.ref:
        updatedCard.unitName = newValue;
        break;
      case CardInputs.battlefieldRole.ref:
        updatedCard.battlefieldRole = newValue;
        break;
      case CardInputs.faction.ref: 
        updatedCard.crusadeFaction = newValue;
        break;
      case CardInputs.keywords.ref:
        updatedCard.selectableKeyWords = newValue.split(' ')
        break;

      // section: points
      case CardInputs.powerRating.ref:
        updatedCard.powerRating = parseInt(newValue);
        break;
      case CardInputs.experience.ref:
        updatedCard.exp = parseInt(newValue);
        break;
      case CardInputs.crusadePoints.ref:
        updatedCard.crusadePoints = parseInt(newValue);
        break;

      // section: information
      case CardInputs.unitType.ref:
        updatedCard.unitType = newValue;
        break;
      case CardInputs.equipment.ref:
        updatedCard.equipment = newValue.split(' ');
        break;
      case CardInputs.psychicPowers.ref: 
        updatedCard.psychicPowers = newValue.split(' ');
        break;
      case CardInputs.warlordTraits.ref: 
        updatedCard.warlordTraits = newValue.split(' ');
        break;
      case CardInputs.relics.ref: 
        updatedCard.relics = newValue.split(' ');
        break;

      // section: tallies
      case CardInputs.battlesPlayed.ref:
        updatedCard.battlesPlayed = parseInt(newValue);
        break;
      case CardInputs.battlesSurvived.ref:
        updatedCard.battlesSurvived = parseInt(newValue);
        break;
      case CardInputs.unitsDestroyed.ref:
        updatedCard.enemyUnitsDestroyed = parseInt(newValue);
        break;
      case CardInputs.unitDestroyedWithPsychicPowers.ref:
        updatedCard.enemyUnitsDestroyedWithPsychicPowers= parseInt(newValue);
        break;
      case CardInputs.unitDestroyedWithRangedWeapons.ref:
        updatedCard.enemyUnitsDestroyedWithRangedWeapons = parseInt(newValue);
        break;
      case CardInputs.unitDestroyedWithMeleeWeapons.ref:
        updatedCard.enemyUnitsDestroyedWithMeleeWeapons= parseInt(newValue);
        break;

      //section: rank
      case CardInputs.rank.ref: 
        // TODO: make the bellow work in ts 
        //updatedCard.rank = newValue;
        break;
      case CardInputs.battleHonours.ref:
        updatedCard.battleHonours = newValue.split(' ');
        break;
      case CardInputs.battleScars.ref:
        updatedCard.battleScars = newValue.split(' ')
    }    

    cardsClone[cardIndex] = updatedCard;
    setCards(cardsClone);
  }

  return (
    <section>
      <h2>Order Of Battle</h2>
      <div className="container flex">
        <div className="card-list">
          <h3>Crusade Cards</h3>
          <button onClick={(e) => addUnit(e)} >add new unit</button>
          <ul>
            { cards.map( card => {
                return <li key={card.id} onClick={(e) => selectCard(e, card.id)} >{card.powerRating}: {card.unitName}</li> 
            })}
          </ul>
        </div>
        <div className="selected-card">
          {selectedCard !== 0 && 
            <CrusadeCard 
              key={selectedCard} 
              card={_.cloneDeep(getCard(selectedCard))} 
              onCardChange={updateSelectedCard} />
          }
        </div>
      </div>
    </section>
  )
}