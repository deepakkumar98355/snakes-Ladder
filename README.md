# Project Title

Snakes And Ladder Game using Node js and mongo DB  

## Getting Started

use the below steps to get started

## To install:

(assuming you have [node](http://nodejs.org/) and NPM installed)

`npm install`

(if u have any issues realted to bcrypt/node gyp try installing/verifying java env path)

## To Run:

`npm start`

## To Test:

`npm test`

### Prerequisites

node js , java

## Assumptions
> Player UI - An intreactive UI for players to signIn,LogIn and update profile details<br />
> Session UI - This will have details for active open sessions that a player can join<br />
> Game UI - Once player enters the game will have a game UI where player can start playing<br />

## Usage Guide

#player<br />
> player will sign in using 'createplayer' api endpoint<br />
> player will log in using 'playerSignIn' api endpoint<br />
> player can update info using 'updatePlayer' api endpoint<br />

#game<br />
> game start with creating a session using 'createSession' api endpoint<br />

#game play<br />
> players can join an active game room using 'joinGame'<br />
> players will use 'rollDice' to get the dice outcomes<br />


##Testing
> test cases will check if the payloads sent to createplayer is valid or not

![Optional Text](../master/public/architecture.png)

## Built With

- (https://nodejs.org) (framework)
- (https://www.actionherojs.com/)
- (https://mlab.com/) (DB handler)

## Versioning

v1.0

## Further Enhancement
- for responsiveness and smooth UI intreaction cache mechanism like redis can used to enhance the gameplay . 

## Authors

- **DeepakKumar** - _Initial work_ - [snakesnakes-LaddersAndLadder](https://github.com/deepakkumar98355/snakes-Ladder)
