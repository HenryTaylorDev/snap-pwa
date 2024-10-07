import React, { useEffect, useState } from 'react';
import './App.css';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);

  const handleClicked = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };
  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  useEffect(() => {
    const checkwin = cards.filter((card) => !card.matched);

    if (cards.length && checkwin.length < 1) {
      setWins(wins + 1);
      handleTurn();
    }
  }, [cards, wins]);

  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div className="grid">
        {cards.map((card) => {
          const { id, image, matched } = card;

          return (
            <Card
              key={id}
              id={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClicked(card)}
            />
          );
        })}
      </div>
      ;
    </>
  );
}

export default App;
