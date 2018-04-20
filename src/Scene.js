import React, { Component } from 'react'
import {OBJViewer, STLViewer} from 'react-stl-obj-viewer';

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
			      		/>
			      	</div>
			          )
		    }
}

export default Scene;
