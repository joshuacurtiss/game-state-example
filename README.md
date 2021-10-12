Example of State History in a Game
==================================

By creating a very simple class `State` to handle a character's state at a given
point in time, we can create an array of `State` objects to track a character's
actions over time. It is then relatively simple to traverse or replay that history.

This example project demonstrates this. The [Kaboom](https://kaboomjs.com) library
is used as a simple game demonstration.

## How to install?

You will need Git and Node.js installed.

Clone the project to your computer:
```
git clone https://github.com/joshuacurtiss/game-state-example.git
```

Go into the cloned directory.

Install dependencies and run the project:
```
npm install
npm start
```

You should now be able to access the sample at <http://localhost:8000>.

## Hosted Sample

This sample can also be viewed at <https://www.curtiss.me/game-state-example>.
