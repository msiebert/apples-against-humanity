// @flow
import React, {Component} from 'react'

import styles from 'styles/common/input/text.scss'

declare type Props = {
  color: string,
  placeholder?: string,
  value?: string,
  onChange?: (event: SyntheticEvent) => void,
};

export default class Text extends Component {
  props: Props;

  render() {
    return (
      <input className={`text-${this.props.color}`} type="text"
        placeholder={this.props.placeholder} value={this.props.value}
        onChange={this.props.onChange} />
    )
  }
}
