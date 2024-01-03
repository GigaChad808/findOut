import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Flashcards App</h1>
      <p>
        Hi, I am Sanan Namazov. I am a 3rd-year Computer Science student at ADA University. This is a flash card app where you can create, view, edit, and delete flash cards.
      </p>
      <h2>Projects:</h2>
      <ul>
        <li>
          <strong>Personal Website: </strong> 
          <a href="https://gigachad808.github.io/" target="_blank" rel="noopener noreferrer">
            Link to Website
          </a>
          <p>This website is about personal webpage where it includes a brief info about myself and then links to digital card and github page
          </p>
        </li>
        <li>
          <strong>Product App: </strong> 
          <a href="https://gigachad808.github.io/Assignment/" target="_blank" rel="noopener noreferrer">
            Link to Website
          </a>
          <p>
            Product app contains list of products and search bar with category selection for enhanced searching.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Home;
