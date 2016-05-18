// @flow
import React, {Component} from 'react'

import styles from 'styles/common/input/button.scss'

type Props = {
  color: string,
  text: string,
  onClick: () => void,
};

export default class Button extends Component {
  props: Props;

  render() {
    return (
      <button className={`btn btn-${this.props.color}`} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}
