# Flash Cards App

This is a simple flash cards application built with React that helps users create, manage, and study with flash cards.

## GitHub Page

The Flash Cards App is hosted on GitHub Pages. You can access it [here](https://gigachad808.github.io/findOut/).     

( Note: After clicking on the link, choose 'home' or 'flashcards' to see the page )

## Getting Started

### Prerequisites

Before running this application, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Navigate to the project directory

2. Clone this repository to your local machine using:
    ```
    git clone https://github.com/GigaChad808/findOut.git
    ```
3. Install the necessary dependencies by running:
     ```
    npm install
    ```

### Running the App

#### JSON-Server

The application uses JSON-Server to simulate a backend for managing flash cards. To start JSON-Server:

1. Ensure you're in the project root directory.

2. Start JSON-Server by running:
     ```
    json-server --watch db.json --port 3000
    ```
This will start the JSON-Server at http://localhost:3000 with default data for flash cards.



#### React App

1. To start the React app, use the following command:
     ```
    npm start
    ```

### Using the App

1. Create new flash cards by entering text for the front and back sides, selecting a status, and clicking "Create Card."
 
2. Edit existing cards by clicking the "Edit" button, making changes, and clicking "Save."
 
3.  Delete cards by clicking the "Delete" button.
 
4.  Use search, status filtering, and sorting options to manage and study flash cards efficiently.


### Contributing

 Contributions are welcome! Fork the repository and make your changes in a new branch. Once done, create a pull request, and I'll review it as soon as possible.
