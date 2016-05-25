// @flow
import React, {Component} from 'react'

import styles from 'styles/common/input/text.scss'

declare type Props = {
  color: string,
  placeholder?: string,
  value?: string,
  onChange?: (event: SyntheticEvent) => void,
  onKeyUp?: (event: SyntheticEvent) => void,
};

export default class Text extends Component {
  props: Props;

  render() {
    const {color, placeholder, value, onChange, onKeyUp} = this.props

    return (
      <input className={`text-${color}`} type="text" placeholder={placeholder}
        value={value} onChange={onChange} onKeyUp={onKeyUp} />
    )
  }
}
