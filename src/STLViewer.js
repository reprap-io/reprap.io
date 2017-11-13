import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import THREE from 'three';
import PropTypes from 'prop-types';

let OrbitControls = require('three-orbit-controls')(THREE);

class STLViewer extends Component {
	static propTypes = {
		className: PropTypes.string,
		url: PropTypes.string,
		width: PropTypes.number,
		height: PropTypes.number,
		backgroundColor: PropTypes.string,
		modelColor: PropTypes.string,
		rotate: PropTypes.bool,
		orbitControls: PropTypes.bool,
	};

	static defaultProps = {
		backgroundColor: '#EAEAEA',
		modelColor: '#B92C2C',
		height: 400,
		width: 400,
		rotate: true,
		orbitControls: true,
	};

	componentDidMount() {
		let camera, scene, renderer, mesh, distance, controls;
		const { url, width, height, modelColor, backgroundColor, orbitControls } = this.props;
		let xDims, yDims, zDims;
		let component = this;
		let rotate = this.props.rotate;

		init();

		/**
		 * The init method for the 3D scene
		 * @returns {void}
		 */
		function init() {
			//Detector.addGetWebGLMessage();
			scene = new THREE.Scene();
			distance = 10000;
			let directionalLight = new THREE.DirectionalLight( 0xffffff );
			directionalLight.position.x = 0;
			directionalLight.position.y = 0;
			directionalLight.position.z = 1;
			directionalLight.position.normalize();
			scene.add( directionalLight );

			let loader = new THREE.STLLoader();
			loader.crossOrigin = '';
			loader.load(url, ( geometry ) => {
				
				// Calculate mesh noramls for MeshLambertMaterial.
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();

				// Center the object
				geometry.center();

				mesh = new THREE.Mesh(
					geometry,
					new THREE.MeshLambertMaterial({
						overdraw:true,
						color: modelColor,
					}
				));
				// Set the object's dimensions
				geometry.computeBoundingBox();
				xDims = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
				yDims = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
				zDims = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
				if(rotate) {
					mesh.rotation.x = 5;
					mesh.rotation.z = .25;
				}
				scene.add( mesh );

				// Add the camera
				camera = new THREE.PerspectiveCamera( 30, width / height, 1, distance );
				camera.position.set(0,0,Math.max(xDims*3,yDims*3,zDims*3));

				scene.add( camera );

				renderer = new THREE.WebGLRenderer(); //new THREE.CanvasRenderer();
				renderer.setSize( width, height );
				renderer.setClearColor(backgroundColor, 1);

				// Add controls for mouse interaction
				if(orbitControls) {
					controls = new OrbitControls(camera, ReactDOM.findDOMNode(component));
					controls.enableKeys = false
					controls.addEventListener( 'change', orbitRender );
				}

				// Add to the React Component
				ReactDOM.findDOMNode(component).replaceChild( renderer.domElement,
					ReactDOM.findDOMNode(component).firstChild);

				// Start the animation
				animate();
			});
		}

		/**
		 * Animate the scene
		 * @returns {void}
		 */
		let animate = () => {
			// note: three.js includes requestAnimationFrame shim
			if(rotate) {
				requestAnimationFrame( animate );
			}
			if(this.props.orbitControls) {
				controls.update();
			}
			render();
		};

		/**
		 * Render the scene after turning off the rotation
		 * @returns {void}
		 */
		let orbitRender = () => {
			if(rotate) {
				rotate = false;
			}

			render();
		};


		/**
		 * Render the scene
		 * @returns {void}
		 */
		let render = () => {
			if (mesh && rotate) {
				mesh.rotation.z += 0.02;
			}

			renderer.render( scene, camera );
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if( JSON.stringify(nextProps) === JSON.stringify(this.props)){
			return false
		}
		return true
	}

	componentWillUpdate(nextProps, nextState) {
		let camera, scene, renderer, mesh, distance, controls;
		const { url, width, height, modelColor, backgroundColor, orbitControls } = nextProps;
		let xDims, yDims, zDims;
		let component = this;
		let rotate = nextProps.rotate;

		init();

		/**
		 * The init method for the 3D scene
		 * @returns {void}
		 */
		function init() {
			//Detector.addGetWebGLMessage();
			scene = new THREE.Scene();
			distance = 10000;
			let directionalLight = new THREE.DirectionalLight( 0xffffff );
			directionalLight.position.x = 0;
			directionalLight.position.y = 0;
			directionalLight.position.z = 1;
			directionalLight.position.normalize();
			scene.add( directionalLight );

			let loader = new THREE.STLLoader();
			loader.crossOrigin = '';
			loader.load(url, ( geometry ) => {
				
				// Calculate mesh noramls for MeshLambertMaterial.
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();

				// Center the object
				geometry.center();

				mesh = new THREE.Mesh(
					geometry,
					new THREE.MeshLambertMaterial({
						overdraw:true,
						color: modelColor,
					}
				));
				// Set the object's dimensions
				geometry.computeBoundingBox();
				xDims = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
				yDims = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
				zDims = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
				if(rotate) {
					mesh.rotation.x = 5;
					mesh.rotation.z = .25;
				}
				scene.add( mesh );

				// Add the camera
				camera = new THREE.PerspectiveCamera( 30, width / height, 1, distance );
				camera.position.set(0,0,Math.max(xDims*3,yDims*3,zDims*3));

				scene.add( camera );

				renderer = new THREE.WebGLRenderer(); //new THREE.CanvasRenderer();
				renderer.setSize( width, height );
				renderer.setClearColor(backgroundColor, 1);

				// Add controls for mouse interaction
				if(orbitControls) {
					controls = new OrbitControls(camera, ReactDOM.findDOMNode(component));
					controls.addEventListener( 'change', orbitRender );
				}

				// Add to the React Component
				ReactDOM.findDOMNode(component).replaceChild( renderer.domElement,
					ReactDOM.findDOMNode(component).firstChild);

				// Start the animation
				animate();
			});
		}

		/**
		 * Animate the scene
		 * @returns {void}
		 */
		let animate = () => {
			// note: three.js includes requestAnimationFrame shim
			if(rotate) {
				requestAnimationFrame( animate );
			}
			if(nextProps.orbitControls) {
				controls.update();
			}
			render();
		};

		/**
		 * Render the scene after turning off the rotation
		 * @returns {void}
		 */
		let orbitRender = () => {
			if(rotate) {
				rotate = false;
			}

			render();
		};


		/**
		 * Render the scene
		 * @returns {void}
		 */
		let render = () => {
			if (mesh && rotate) {
				mesh.rotation.z += 0.02;
			}

			renderer.render( scene, camera );
		};
	}

	render() {
		const {width, height, modelColor} = this.props;

		return(
			<div
				className={this.props.className}
				style={{
					width: width,
					height: height,
					overflow: 'hidden',
				}}
			>
				<div style={{
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}} >
				</div>
			</div>
		);
	};
};

module.exports = STLViewer;
