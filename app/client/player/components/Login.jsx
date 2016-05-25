// @flow
import React, {Component} from 'react'

import Button from 'client/common/components/input/Button.jsx'
import Text from 'client/common/components/input/Text.jsx'

import styles from 'styles/player/login.scss'

type Props = {
  color: string,
  onLogin: (name: string) => void,
};

export default class Login extends Component {
  props: Props;
  state: {
    name: string,
  };
  onLogin: () => void;

  constructor(props: Props) {
    super(props)

    this.state = {
      name: ''
    }

    this.onLogin = () => {
      this.props.onLogin(this.state.name)
    }
  }

  onTextEntered(event: SyntheticEvent): void {
    const target = event.target
    if (target instanceof HTMLInputElement) {
      this.setState({
        name: target.value.substring(0, 100),
      })
    }
  }

  onEnterKey(event: SyntheticEvent): void {
    if (event.key == 'Enter') {
      this.onLogin()
    }
  }

  render() {
    return (
      <div className="player-login">
        <h1>Enter Your Name</h1>
        <Text color={this.props.color} placeholder="name"
          onChange={this.onTextEntered.bind(this)} value={this.state.name}
          onKeyUp={this.onEnterKey.bind(this)} />
        <Button color={this.props.color} text="Go!" onClick={this.onLogin } />
      </div>
    )
  }
}
