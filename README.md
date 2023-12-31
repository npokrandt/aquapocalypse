# Aquapocalypse

One day, the zombie apocalypse occured. While that caused major issues for humanity, no one expected that it might affect the inhabitants of the ocean as well!

## Description

Aquapocalypse is an IO-patterred game in which the player swims around collecting food while avoiding enemy fish. The food is worth points, and the player tries to collect as much food as possible

## Technologies

Aquapocalypse uses phaser to create the game, express and sequelize to store data, session to keep track of logins, and handlebars for HTML templating.

## Usage

To play the game, you must log in as a user. The user is first asked to create an account by giving a username, email address and password. Once given, the user can log in and log out as much as they want to. Once logged in the user is presented with the lobby page. From there they can play the game, see high scores or just log out. The game is explained below. 

![aquapocalypse lobby](./public/assets/readme-pics/lobby.png)
![aquapocalypse high scores](./public/assets/readme-pics/high-score-page.png)


## Gameplay

Upon game start, the user is spawned into the map, along with lots of food and 10 enemy fish. The player can move around the map, where there is plenty of food. Each piece of food is worth 10 points. The user must avoid the enemy fish while they collect the food. If they touch any of the enemy fish, the game is over.

![aquapocalypse gameplay](./public/assets/readme-pics/gameplay.png)

## Link

Play the game here:
https://npokrandt-aquapocalypse-2ae8235b1b2d.herokuapp.com/

## Notes

All code used is our own, based off of phaser examples and the structure of previous assignments
