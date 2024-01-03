import React, { useState, useEffect } from 'react';
import './flashcards.css';

const FlashCard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="front">{front}</div>
      <div className="back">{back}</div>
    </div>
  );
};


const FlashCards = () => {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [status, setStatus] = useState('');

  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/cards')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => setFlashCards(data))
      .catch((error) => console.error('Error fetching cards:', error));
  }, []);

  const handleCreateCard = () => {
    const newCard = {
      front: frontText,
      back: backText,
      status: status,
    };

    // Logic to send the new card data to the server (POST request)

    // Clear input fields after creating the card
    setFrontText('');
    setBackText('');
    setStatus('');
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Flash Cards</h2>
      <div>
        <label>Front Side Text: </label>
        <input
          type="text"
          value={frontText}
          onChange={(e) => setFrontText(e.target.value)}
        />
      </div>
      <div>
        <label>Back Side Text: </label>
        <input
          type="text"
          value={backText}
          onChange={(e) => setBackText(e.target.value)}
        />
      </div>
      <div>
        <label>Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
      </div>
      <button onClick={handleCreateCard}>Create Card</button>

      {/* Displaying existing flash cards */}
      <h3>Existing Flash Cards:</h3>
      <div className="flashcards-container">
        {flashCards.map((card) => (
          <FlashCard key={card.id} front={card.front} back={card.back} />
        ))}
      </div>
    </div>
  );
};

export default FlashCards;
