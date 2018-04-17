import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

let correctGuesses = 0;
let highScore = 0;
let clickMessage = "Click on an image to earn points, but don't click on any of them more than once!";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    correctGuesses,
    highScore,
    clickMessage
  };

  setClicked = id => {
    
    // Setting the friends array
    const friends = this.state.friends;
    // console.log(friends);

    // Filter array to see if friend has already been clicked
    const clickedFriend = friends.filter(friend => friend.id === id);

    // If friend has already been clicked (meaning if friend.clicked = true), game over
    if (clickedFriend[0].clicked) {
      // console.log("Correct Guesses: " + correctGuesses);
      // console.log("High Score: " + highScore);

      correctGuesses = 0;
      clickMessage = "Dang! You already clicked on that one! Now you have to start over!";

      for (let i = 0 ; i < friends.length ; i++){
        friends[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ friends });
    }
    // If friend has not already been clicked (meaning if friend.clicked = false), increase score by 1 and continue playing
    else if (correctGuesses < 11) {

      // Change clicked value to true
      clickedFriend[0].clicked = true;

      // Increment the counter
      correctGuesses++;

      clickMessage = "Great! You haven't click on that one yet! Keep going!";

      // Set high score
      if (correctGuesses > highScore) {
        highScore = correctGuesses;
        this.setState({ highScore });
      }

      // Shuffle the friend array to be rendered in a random order
      friends.sort(function(a, b){return 0.5 - Math.random()});

      this.setState({ clickMessage });
      this.setState({ friends });
      this.setState({ correctGuesses });
    }
    // User guesses all correctly, end game
    else {
      // Change clicked value to true
      clickedFriend[0].clicked = true;

      // Restart counter
      correctGuesses = 0;

      clickMessage = "WOW!!! You got ALL of them!!! Now, let's see if you can do it again!";

      // Set high score
      highScore = 12;
      this.setState({ highScore });

      // Shuffle the friend array to be rendered in a random order
      friends.sort(function(a, b){return 0.5 - Math.random()});

      this.setState({ clickMessage });
      this.setState({ friends });
      this.setState({ correctGuesses });
    }
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Memory Game (featuring)</Title>
        <div className="gameStats">
          <div className="message"> 
            <h3>
              {this.state.clickMessage}
            </h3>
          </div>
          <div className="correctGuesses">
            <h3>
              Correct Guesses: {this.state.correctGuesses} 
            </h3>
          </div>
          <div className="highScore">
            <h3>
              High Score: {this.state.highScore} 
            </h3>
          </div>
        </div>
        <br />
        {this.state.friends.map(friend => (
          <FriendCard
            setClicked={this.setClicked}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
