// @flow
import React, {Component} from 'react'

import styles from 'styles/game/colored-block.scss'

type Props = {
  color: string,
  additionalClasses: string,
  children?: Array<React$Element>,
};
export default class ColoredBlock extends Component {
  props: Props;

  render() {
    const c = `colored-block ${this.props.color} ${this.props.additionalClasses}`

    return (
      <div className={c}>
        {this.props.children}
      </div>
    )
  }
}
