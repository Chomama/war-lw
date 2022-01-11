# WAR-LW

This project is a lightweight version of the card game war written with NodeJs and Javascript.



## API's
The app exposes two endpoints "/start" and "/score".

The "/start" endpoint utilizes the node functionility execFile() to launch a background process that runs the logic the card game in javascript file play_war.

The game simulates two players and once the game ends, writes to a json file to keep track of lifetime wins for each player. The "/score" endpoint utilizes node module fs to read from the json and return the scores.

## Testing
-Basic testing is done using Mocha and Chai and can be found in the tests directory.


## Installation
In order to run the project:

```bash
git clone https://github.com/Chomama/war-project.git
cd war-lw
npm install
npm start
```
Then browse to localhost:8081.
