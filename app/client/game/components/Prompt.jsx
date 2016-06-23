// @flow
import React, {Component} from 'react'

import styles from 'styles/game/prompt.scss'

type Props = {
  prompt: string,
};
export default class Prompt extends Component {
  props: Props;

  render() {
    return (
      <h1 className="prompt">{this.props.prompt}</h1>
    )
  }
}
