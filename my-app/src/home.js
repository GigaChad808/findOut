import React from 'react';
import './index.css'; // Import the CSS file

const Home = () => {
  return (
    <div>
      <h1>
        Welcome to Flash Cards App
      </h1>
      <p>
        Flashcard application is designed to help you learn and revise with ease. Whether you're studying for exams, learning a new language, or simply looking to memorize important information, our app has got you covered. The app aims to streamline your learning process, making it efficient and enjoyable. Start creating your personalized flashcards today and embark on a journey of effective learning and knowledge retention!
      </p>
      <h2>Projects:</h2>
      <ul>
        <li>
          <strong>Personal Website: </strong>
          <a href="https://gigachad808.github.io/" target="_blank" rel="noopener noreferrer">
            Link to Website
          </a>
          <p>This website is about a personal webpage where it includes brief info about myself and links to digital card and github page.</p>
        </li>
        <li>
          <strong>Product App: </strong>
          <a href="https://gigachad808.github.io/Assignment/" target="_blank" rel="noopener noreferrer">
            Link to Website
          </a>
          <p>Product app contains a list of products and a search bar with category selection for enhanced searching.</p>
        </li>
      </ul>
    </div>
  );
};

export default Home;
