# Trivia Game 

> Trivia project was a course term project developed by James Araujo, Jay Svoboda, Lin Cong, Twilight Summerland, Hwayoung Lee, Abram Wiebe. Technologies used include Node.js, Express, AngularJS, Bootstrap. Database runs on Sqlite and can be easily transfered to MySql. Socket.io is used for real time chat and gaming info updating.

## My contribution

+ Implemented the chat functionality including the chat UI and API fetching data. Online friends can be seen in real time.
+ Updating the game modal when joining game with the correct game info in real time.
+ The game would lose information on refresh because of socket.io implementation, I solved it by using local storage to persist data.
+ fetching game data when in game and updating scores in real time.
+ other trivial details can be found in Lin_contribution.pdf as my term project overview

## Available Scripts

git clone the project and cd into /web-app

### `npm start`

This single script will install dependecies and runs the app in one go.

### `npm run dev`

On subsequent runs, just say npm run dev. This will start the app without installing.

```
Go to http://localhost:3000 for access.
```

## Deployment

Deployment of this project can be accessed at [Heroku](https://awesome-game-trivia.herokuapp.com/)
