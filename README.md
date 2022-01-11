# WAR-LW

## This project is a lightweight version of the card game war. The app exposes two endpoints "/start" and "/score".

-The "/start" endpoint utilizes the node functionility execFile() to launch a background process that runs the logic the card game in javascript file play_war.

-The game simulates two players and once the game ends, writes to a json file to keep track of lifetime wins for each player. The "/score" endpoint utilizes node module fs to read from the json and return the scores.

-Basic testing is done using Mocha and Chai and can be found in the tests directory.

In order to run the project:

git clone https://github.com/Chomama/war-project.git
cd tank-game
npm install
npm start
Browse to localhost:8081
