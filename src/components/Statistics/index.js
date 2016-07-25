import React from 'react'

import classnames from 'classnames/bind'
import classes from './Statistics.scss'

const cx = classnames.bind(classes)

export const Statistics = (props) => (
		<div className={ cx('statistic', props.className) }>
			<span className={ cx('count') }>{props.count}</span>
			<span className={ cx('desc') }>PROJECTS</span>
		</div>
)

export default Statistics
