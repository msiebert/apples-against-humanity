// @flow
import React, {Component} from 'react'

import styles from 'styles/player/header.scss'

type Props = {
  title: string,
};
export default class Header extends Component {
  props: Props;

  render() {
    return (
      <header>
        <h1 className="title">{this.props.title}</h1>
      </header>
    )
  }
}
