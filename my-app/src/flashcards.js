import React, { useState, useEffect } from 'react';

const FlashCards = () => {
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cards')
      .then((response) => response.json())
      .then((data) => setFlashCards(data.cards))
      .catch((error) => console.error('Error fetching cards:', error));
  }, []);

  return (
    <div>
      <h2>Flash Cards</h2>
      <ul>
        {flashCards.map((card) => (
          <li key={card.id}>
            <span>{card.front}</span>
            <span>{card.back}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashCards;
