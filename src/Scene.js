import React, { Component } from 'react'
import STLViewer from 'stl-viewer'

class Scene extends Component {

  render() {
    return (
	<div>
		<STLViewer
		url= { this.props.url }
		width={400}
		height={400}
		modelColor='#B92C2C'
		backgroundColor='#EAEAEA'
		rotate={true}
		orbitControls={true}
		/>
	</div>
    )
  }
}

export default Scene
