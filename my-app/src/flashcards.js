import React, { useState, useEffect } from 'react';
import './flashcards.css';

const FlashCard = ({ id, front, back, onDelete }) => {
  const [flipped, setFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFront, setEditedFront] = useState(front);
  const [editedBack, setEditedBack] = useState(back);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    fetch(`http://localhost:3000/cards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        front: editedFront,
        back: editedBack,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update the card');
        }
        setIsEditing(false);
      })
      .catch((error) => console.error('Error updating card:', error));
  };

  const handleDelete = () => {
    // Logic to delete the card on the server (DELETE request)
    onDelete(id);
  };

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      {isEditing ? (
        <div className="edit">
          <input value={editedFront} onChange={(e) => setEditedFront(e.target.value)} />
          <input value={editedBack} onChange={(e) => setEditedBack(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <>
          <div className="front">{editedFront}</div>
          <div className="back">{editedBack}</div>
        </>
      )}
      <div className="card-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};


const FlashCards = () => {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [status, setStatus] = useState('');

  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cards')
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
    fetch('http://localhost:3000/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create the card');
        }
        // Logic to handle success (e.g., refresh the card list)
        return response.json(); // Get the newly created card data from the response

      })
      .then((createdCard) => {
        // Update the state to include the newly created card
        setFlashCards((prevCards) => [...prevCards, createdCard]);

        // Clear input fields after creating the card
        setFrontText('');
        setBackText('');
        setStatus('');
      })
      .catch((error) => console.error('Error creating card:', error));

  };

  const handleDeleteCard = (id) => {
    fetch(`http://localhost:3000/cards/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the card');
        }
        // Remove the deleted card from the state
        setFlashCards((prevCards) => prevCards.filter((card) => card.id !== id));
      })
      .catch((error) => console.error('Error deleting card:', error));
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
          <FlashCard 
            key={card.id}
            id = {card.id} 
            front={card.front} 
            back={card.back} 
            onDelete={handleDeleteCard} 
          />
          
          
        ))}
      </div>
    </div>
  );
};

export default FlashCards;
