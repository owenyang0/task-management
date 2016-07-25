import React from 'react'
import { connect } from 'react-redux'

import { newProject, switchProject } from '../../redux/modules/project'

import Column from 'components/Column'
import Statistics from 'components/Statistics'

import Columns from './Columns'

import classnames from 'classnames/bind'
import classes from './HomeView.scss'

const cx = classnames.bind(classes)

export class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
  }

  render() {
    const { project } = this.props
    const total = Object
      .keys(project)
      .reduce((pre, curr) => pre + project[curr].projects.length, 0)

    return (
      <div>
        <div className={ cx('head') }>
          <div className={classes.proj}>
            <label>Add project</label>
            <input
              type="text"
              placeholder="new project"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <div className={ cx('statistic') }>
            <label>Total</label>
            <Statistics count={ total }/>
          </div>
        </div>
        <Columns project={ project } switchProject={ this.props.switchProject }/>
      </div>
    )
  }

  handleChange = e => {
    this.setState({value: e.target.value});
  }

  handleKeyPress = e => {
    const ENTER = 13
    const val = e.target.value
    if (e.charCode === ENTER && val) {
      this.setState({value: ''})
      this.props.newProject(val)
    }
  }
}

const mapStateToProps = (state) => ({
  project: state.project
})
export default connect(mapStateToProps, {
  newProject,
  switchProject
})(HomeView)

