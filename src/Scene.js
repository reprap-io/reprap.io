import React, { Component } from 'react'
import {OBJViewer, STLViewer} from 'react-stl-obj-viewer';

class Scene extends Component {

	  render() {
		      return (
			      	<div>
			      		<STLViewer
			      		url= { this.props.url }
			      		width={200}
			      		height={200}
			      		modelColor='#B92C2C'
			      		backgroundColor='#FFFFFF'
			      		/>
			      	</div>
			          )
		    }
}

export default Scene;
