# WAR-LW

This project runs the card game war and is written with NodeJs and Javascript.


## API's
The app exposes two endpoints "/start" and "/score".

The "/start" endpoint utilizes the node functionility execFile() to launch a child process that runs the logic of the card game in javascript file play_war.

The game simulates two players and once the game ends, writes to a json file to keep track of lifetime wins for each player. The "/score" endpoint utilizes node module fs to read from the json and return the scores.

## Testing
Basic testing is done using Mocha and Chai and can be found in the tests directory.

## Docker
To run using docker

```bash
https://github.com/Chomama/war-lw.git
cd war-lw
docker build -t war-docker .
docker run -it -p 8081:8081 war-docker
```
App will be running on localhost:8081

## Usage
**Installation**

```bash
https://github.com/Chomama/war-lw.git
cd war-lw
npm install
```
**Start the application in dev mode running on localhost localhost:8081/**

```
npm start
```

**Run tests**
```
npm test
```

**Build for production**
```
npm run build
```
