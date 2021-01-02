import React from "react";
import "./App.css";
import Navigationbar from "./components/NavigationBar";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Random from "./Pages/Random";
import Search from "./Pages/Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      value: "",
      tweetFinder: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.alternateSubmit = this.alternateSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let currentValue = this.state.value;
    fetch(`/api/tweetUser/${currentValue}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          value: data,
        })
      )
      .catch((error) => console.log(error));
  };

  alternateSubmit = (e) => {
    e.preventDefault();
    let tweetArray = [];
    if (this.state.value > "") {
      for (let i = 0; i < this.state.tweets.length; i++) {
        if (
          this.state.tweets[i].tweet
            .toLowerCase()
            .includes(this.state.value.toLowerCase())
        ) {
          tweetArray.push(this.state.tweets[i]);
        }
        this.setState({
          tweetFinder: tweetArray,
        });
      }
    }
  };

  componentDidMount() {
    fetch(
      "https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=recent",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer AAAAAAAAAAAAAAAAAAAAAPy5LAEAAAAAgnWUGbDhvpF5ZbTuuRld17qV%2FD4%3DWvwkpQ3B4NwfDkyyYjU6iYOpnGStOiwOiPLnFKoST7Dg8W2lWa",
          Accept: "application/json",
        },
        mode: "no-cors",
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  // componentDidMount() {
  //   fetch(
  //     "https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=recent&access_token=AAAAAAAAAAAAAAAAAAAAAPy5LAEAAAAAgnWUGbDhvpF5ZbTuuRld17qV%2FD4%3DWvwkpQ3B4NwfDkyyYjU6iYOpnGStOiwOiPLnFKoST7Dg8W2lWa&Access-Control-Allow-Origin"
  //   )
  //     .then((response) => response.json())
  //     .then((data) =>
  //     console.log(data)
  //     )
  //     .catch((error) => console.log(error));
  // }

  render() {
    return (
      <BrowserRouter>
        <Navigationbar />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/random"
            render={() => <Random tweets={this.state.tweets} />}
          />
          <Route
            path="/search"
            render={() => (
              <Search
                tweetFinder={this.state.tweetFinder}
                tweets={this.state.tweets}
                userSearch={this.state.value}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                alternateSubmit={this.alternateSubmit}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
