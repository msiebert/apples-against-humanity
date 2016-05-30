// @flow
import React, {Component} from 'react'

import styles from 'styles/common/input/checkbox.scss'

type Props = {
  text: string,
  checked: boolean,
  onClick: () => void,
};
export default class Checkbox extends Component {
  props: Props;

  render() {
    const {text, checked, onClick} = this.props
    const checkedStatus = checked ? 'checked' : 'unchecked'

    return (
      <div className={`checkbox ${checkedStatus}`} onClick={onClick}>
        <div className="box"></div>
        <span className="text">{text}</span>
      </div>
    )
  }
}
