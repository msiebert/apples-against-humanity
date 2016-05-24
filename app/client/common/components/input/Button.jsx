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
    const {color, text, onClick, className} = this.props
    const additional = className || ''

    return (
      <button className={`btn btn-${color} ${additional}`} onClick={onClick}>
        {text}
      </button>
    )
  }
}
