import React from 'react'
import { connect } from 'react-redux'
import { afTapIn } from '../../redux/actions.js'

const mapDispatchToProps = (dispatch) => ({
  tap: () => dispatch(afTapIn()),
})

const TapIn = ({tap}) => (
  <button onClick={tap}>Tap</button>
)

export default connect(
  undefined,
  mapDispatchToProps
)(TapIn)
