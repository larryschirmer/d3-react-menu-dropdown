import React, { Component } from 'react'
import styled from 'styled-components'

import BarsCross from './BarsCross'

class App extends Component {
  render() {
    return (
      <styles.Wrapper>
        <BarsCross width={40} height={40} />
      </styles.Wrapper>
    )
  }
}

export default App

const styles = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    height: 300px;
  `,
}
