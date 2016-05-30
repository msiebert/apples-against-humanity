// @flow
import {Map, Set} from 'immutable';
import React, {Component} from 'react'

import * as ajax from 'client/common/ajax'
import Button from 'client/common/components/input/Button.jsx'
import Checkbox from 'client/common/components/input/Checkbox.jsx'

import styles from 'styles/game/content-selection.scss'

type CheckboxState = {
  file: string,
  name: string,
  checked: boolean,
};
type PackTuple = {
  cards: Set<string>,
  prompts: Set<string>,
};
type State = {
  packs: Map<string, CheckboxState>,
};
type Props = {
  loadContentPack: (cards: Set<string>, prompts: Set<string>) => void,
};
export default class ContentSelection extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props)
    this.state = {
      packs: new Map(),
    }
  }

  componentDidMount() {
    ajax.get(`http://${serverAddress}/content`)
      .then((result: string) => {
        this.setState({
          packs: new Map(JSON.parse(result).map((pack) => [
            pack.file,
            {
              file: pack.file,
              name: pack.name,
              checked: true
            }
          ])),
        })
      })
  }

  generateCheckboxClick(checkbox: CheckboxState): () => void {
    return () => {
      this.setState({
        packs: this.state.packs.set(checkbox.file, Object.assign({}, checkbox, {
          checked: !checkbox.checked
        }))
      })
    }
  }

  onConfirm(): void {
    const packFiles = this.state.packs.filter((checkbox) =>
      checkbox.checked
    ).keySeq().toList().map((file) =>
      ajax.get(`http://${serverAddress}/content/${file}`).then((result: string): PackTuple => {
        const pack = JSON.parse(result)
        return {cards: pack.cards, prompts: pack.prompts}
      })
    )

    Promise.all(packFiles.toJS()).then((values) => {
      const {cards, prompts} = values.reduce((previous: PackTuple, current: PackTuple): PackTuple => {
        return {
          cards: previous.cards.union(current.cards),
          prompts: previous.prompts.union(current.prompts),
        }
      }, {cards: Set(), prompts: Set()})

      this.props.loadContentPack(cards, prompts)
    })
  }

  render() {
    const checkboxes = this.state.packs.valueSeq()
      .map((checkbox: CheckboxState) => {
        return <Checkbox key={`checkbox-${checkbox.file}`} text={checkbox.name}
          checked={checkbox.checked}
          onClick={this.generateCheckboxClick(checkbox)} />
      }).toJS()

    return (
      <div className="content-selection">
        <h1>Select Content Packs to Use</h1>
        <Button color="blue" text="Confirm Selection"
          className="confirm-selection" onClick={this.onConfirm.bind(this)} />
        <div className="checkboxes">
          {checkboxes}
        </div>
      </div>
    )
  }
}
