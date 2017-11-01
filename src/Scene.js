import React, { Component } from 'react'
import STLViewer from 'stl-viewer'

class Scene extends Component {

  render() {
    return (
	    <div>
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />

<STLViewer
	url='http://corsify.appspot.com/https://raw.github.com/mrdoob/three.js/master/examples/models/stl/ascii/slotted_disk.stl'
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
