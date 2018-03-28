import React, { Component } from 'react'
import { select } from 'd3-selection'
// eslint-disable-next-line
import { transition } from 'd3-transition'
import { easeCubicIn } from 'd3-ease'
import styled from 'styled-components'

import trash from './trash-alt.svg'

const bars = ['M0,0', 'L20,0', 'M0,7', 'L20, 7', 'M0,14', 'L20,14']
const cross = ['M2,0', 'L18,14', 'M10,7', 'L10, 7', 'M2,14', 'L18,0']

export default class BarsCross extends Component {
  state = {
    index: 0,
    states: [
      { primitive: bars, height: 3, opacity: 0 },
      { primitive: cross, height: 60, opacity: 1 },
    ],
    icon: null,
  }

  toggle = () => {
    let { index, states } = this.state
    index++
    this.setState({ index })
    const next = index % 2
    return states[next]
  }

  componentDidMount() {
    const { states } = this.state
    const svg = select(this.node)

    const icon = svg.append('g').attr('transform', `translate(${10}, ${12})`)

    icon
      .append('path')
      .attr('d', states[0]['primitive'])
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-linecap', 'round')

    this.setState({ icon })
  }

  transition = () => {
    const { icon } = this.state
    const { primitive, height, opacity } = this.toggle()

    icon
      .select('path')
      .transition(easeCubicIn)
      .duration(250)
      .attr('d', primitive)

    select('img.trash')
      .transition(easeCubicIn)
      .duration(250)
      .style('top', `${height}px`)
      .style('opacity', `${opacity}`)
  }

  onTrashClick = () => {
    console.log('trashed!')
  }

  render() {
    const { height, width } = this.props

    return (
      <styles.Wrapper>
        <svg
          style={{ border: '1px solid black' }}
          ref={node => (this.node = node)}
          width={`${width}px`}
          height={`${height}px`}
        />
        <styles.Trash
          src={trash}
          alt="trash"
          className="trash"
          onClick={this.onTrashClick}
        />
        <styles.Button onClick={this.transition} />
      </styles.Wrapper>
    )
  }
}

const styles = {
  Wrapper: styled.div`
    position: relative;
  `,
  Trash: styled.img`
    position: absolute;
    top: 3px;
    left: 8px;
    fill: #f1f7ed;
    width: 25px;
    height: 25px;
    user-select: none;
    opacity: 0;
  `,
  Button: styled.div`
    position: absolute;
    top: 0px;
    left: 1px;
    width: 40px;
    height: 40px;
    z-index: 100;
    user-select: none;
  `,
}
