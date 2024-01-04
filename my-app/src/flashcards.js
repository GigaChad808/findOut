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
    setEditedFront(front);
    setEditedBack(back);
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
    onDelete(id);
  };

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      {isEditing ? (
        <div className="edit">
          <input
            value={editedFront}
            onChange={(e) => setEditedFront(e.target.value)}
            style = {{ color: 'black'}}
            placeholder="Edit Front Text"
          />
          <input
            value={editedBack}
            onChange={(e) => setEditedBack(e.target.value) }
            style = {{ color: 'black'}}
            placeholder="Edit Back Text"
          />
          <button onClick={handleSave} style = {{ color: 'black'}} >Save</button>
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

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
      status: status || "Learned",
    };
  
    
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
        
        return response.json(); 
      })
      .then((createdCard) => {
        
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSort = (e) => {
    setSortCriteria(e.target.value);
  };

  let filteredCards = [...flashCards];

  if (searchTerm !== '') {
    filteredCards = filteredCards.filter(
      (card) =>
        card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.back.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedStatus !== '') {
    filteredCards = filteredCards.filter((card) => card.status === selectedStatus);
  }

  if (sortCriteria !== '') {
    filteredCards.sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria]) return -1;
      if (a[sortCriteria] > b[sortCriteria]) return 1;
      return 0;
    });
  }

  return (
    <div>
      <h2>Flash Cards</h2>
      <div className="input-container">
        <div>
          <input
            type="text"
            placeholder="Front Side Text"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            style={{ color: 'black' }}
          />
        </div>
        <div>
      
          <input
            type="text"
            placeholder="Back Side Text"
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            style={{ color: 'black' }}
          />
        </div>
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ color: 'black' }}
          >
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        <button onClick={handleCreateCard}>Create Card</button>
      </div>

      <div className="filter-container">
        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
            style={{ color: 'black' }}
          />
        </div>
        {/* Status Filter Dropdown */}
        <div>
          <label>Status Filter: </label>
          <select
            value={selectedStatus}
            onChange={handleStatusFilter}
            style={{ color: 'black' }}
          >
            <option value="">All</option>
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        {/* Sort Options */}
        <div>
          <label>Sort by: </label>
          <select
            value={sortCriteria}
            onChange={handleSort}
            style={{ color: 'black' }}
          >
            <option value="">None</option>
            <option value="front">Front Text</option>
            <option value="back">Back Text</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Displaying existing flash cards */}
      <h2>Existing Flash Cards:</h2>
      <div className="flashcards-container">
        {filteredCards.map((card) => (
          <FlashCard
            key={card.id}
            id={card.id}
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
