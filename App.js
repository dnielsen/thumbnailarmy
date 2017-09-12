import React, {Component} from 'react'
import Card from './card'
import {View} from 'react-native'

export default class App extends Component {

  state = {
    profileIndex: 1,
  }

  componentDidMount() {
    return fetch(api)
      .then((response) => response.json())
      .then((responseJson) => {
        profiles = responseJson
        this.setState ({
          profiles: profiles,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  swipeLeft = () => {
    fetch('http://13.56.182.231:8000/notfruit/' + profiles[this.state.profileIndex-1].id + '/?format=json', {
      method: 'PUT',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        swipe_val: '-1'
      })
    }),
    this.setState({profileIndex: this.state.profileIndex + 1})
  }

  swipeRight = () => {
    fetch('http://13.56.182.231:8000/notfruit/' + profiles[this.state.profileIndex-1].id + '/?format=json', {
      method: 'PUT',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        swipe_val: '1'
      })
    }),
    this.setState({profileIndex: this.state.profileIndex + 1})
  }

  render() {
    const {profileIndex} = this.state
    return (
      <View style={{flex:1}}>
        {profiles.slice(profileIndex-1, profileIndex + indexInc).reverse().map((profile) => {
          return (
            <Card
              key={profile.id}
              profile={profile}
              onSwipeRight={this.swipeRight}
              onSwipeLeft={this.swipeLeft}
            />
          )
        })}
      </View>
    )
  }
}

let profiles = [
  {
    id: 0,
    label: '',
    url: 'http://store.akamai.steamstatic.com/public/images/game/game_highlight_image_spacer.gif',
  },
]

let indexInc = 3
let api = 'http://13.56.182.231:8000/notfruit/?format=json'
