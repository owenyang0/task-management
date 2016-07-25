import React from 'react'

import Column from 'components/Column'
import Statistics from 'components/Statistics'

import classnames from 'classnames/bind'
import classes from './Columns.scss'

const cx = classnames.bind(classes)


export class Columns extends React.Component {
  constructor (props) {
    super(props)
    this.state = { draggingType: '' }
  }

  render() {
    const { project } = this.props

    return (
      <div className={ cx('wrapper') }>
        {
          Object.keys(project).map((key, i) => {
            const proj = project[key]
            const count = proj.projects.length
            return (
              <Column
                key={i }
                className={ cx('column') }
                title={ proj.title }
                count={ count }
                type={ key }
                updateState={ this.updateState }
                onDrop={ this.handleDrop }
                draggingType={ this.state.draggingType }
                projects={ proj.projects }
              />
            )
          })
        }
      </div>
    )
  }

  handleDrop = (obj) => {
    this.props.switchProject(obj)
  }

  updateState = (obj) => {
    if(obj.draggingType) {
      this.setState({
        draggingType: obj.draggingType
      })
    }
  }
}

export default Columns
