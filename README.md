# Race project

## Project Overview

This project is a simple game application where users can log in, play a racing game, and track their gameplay. Players can view their current score and gameplay history, with actions recorded for review. The game fetches high scores from an external server and, after the game ends, posts the player's score to the server. Built with Angular 17, this game meets the specified requirements for functionality and user interaction.


## Specification

### App

### Intro Page

The intro page serves as a starting point for users and contains a player form. Users must enter their name and user ID before starting the game. The system sends a message to an external server to check the token and then log the player in. The current score is also retrieved from the server.

**Components Used:**

- `AppComponent`: Main component with RouterOutlet.
- `IntroComponent`: Smart component, checking userId on server, retrieving score.

### Game Page

The game page contains the actual gameplay and includes features such as an exit game button, extended view, dark mode changer and a points counting mechanism. The game itself is implemented using ngx-race library (from https://github.com/chrum/ngx-race).

**Components Used:**

- `GameComponent`: Manages the game mechanics and user interactions while integrating the ngx-race game library. Handles player status, scores, gameplay history, and timer functionality. Also manages high score submission and display.
  - `NgxRaceModule`: Core game logic provided by an external library. Controls in-game actions like movement, turbo boost, and reset.
  - `FilterHistoryPipe`: Custom pipe for filtering the game history log by action type.
  - `TopScoresPipe`: Custom pipe for displaying and sorting high scores.
  - `MyscoreComponent`: Displays the current player's score details.
  - `KeyboardShortcutsModule`: Enables keyboard shortcuts for in-game actions (e.g., turbo, left, right).
  
## Services

- `PlayerDataService`: Retrieves and manages player information (name and email).
- `ScoreService`: Handles high score retrieval and submission to the server.

## Usage

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `ng serve` or `ng build` to start the development server.
4. Open the application in a web browser.

## Additional Notes

- This project uses routing and http communication.
- NgForm is utilized for form management, providing user-friendly validation and error handling.
- The game page integrates the ngx-race game library for an interactive gaming experience.
- Application includes a gameplay history feature with filtering and sorting options.

## Additionally

- **Route Guard Implementation:** Added a `playerDataGuard` to ensure that users cannot access the game page without proper validation. The guard checks if the user is logged in and has the necessary credentials.
- **Router Configuration:** Updated the router configuration to include the new route guard and handle color parameter changes in the game route.
- **Dynamic Color Change:** Implemented functionality to change the game color based on a URL parameter, enhancing the customization options for the user.


