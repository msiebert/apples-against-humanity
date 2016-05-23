// @flow
import React, {Component} from 'react'

import styles from 'styles/common/input/button.scss'

type Props = {
  color: string,
  text: string,
  onClick: () => void,
  className?: string,
};

export default class Button extends Component {
  props: Props;

  render() {
    return (
      <button className={`btn btn-${this.props.color} ${this.props.className}`}
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}
