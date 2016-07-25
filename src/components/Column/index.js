import React from 'react'
import { SortableComposition as Sortable } from './../../lib/Sort'

import SortableList from '../SortableList'

import Statics from '../Statistics'
import classnames from 'classnames/bind'
import classes from './Column.scss'

const cx = classnames.bind(classes)

export class Column extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      draggingIndex: null,
      projects: props.projects
    }
  }
  render () {
    const { title, count, className, type, draggingType } = this.props

    return (
      <div className={ cx('column', className) }>
        <div className={ cx('head') }>
          <h3>{ title }</h3>
          <Statics count={ count } />
        </div>
        <div className={ cx('body') }>
          <ul>
            {
              this.state.projects.map((p, i) => {
                return (
                  <SortableList
                    key={ i }
                    type={ type }
                    updateState={ this.updateState }
                    onDrop={ this.handleDrop }
                    items={ this.state.projects }
                    draggingIndex={ this.state.draggingIndex }
                    sortId={ i }
                    draggingType={ draggingType }
                    outline="list">{ p }</SortableList>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  handleDrop = (obj) => {
    this.props.onDrop && this.props.onDrop(obj)
  }

  updateState = (obj) => {
    this.props.updateState && this.props.updateState(obj)
    this.setState(obj)
  }
}

Column.propTypes = {
  title: React.PropTypes.string.isRequired,
  projects: React.PropTypes.array.isRequired
}

Column.defaultProps = {
  projects: []
}

export default Column
