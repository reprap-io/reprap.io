import React, { Component } from 'react'
import * as THREE from 'three'
import * as THREESTLLoader from 'three-stl-loader'

class Scene extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {

    var STLLoader = new THREESTLLoader(THREE) // Added THREE
    var loader = new STLLoader() // Removed THREE
		console.log("loader", loader)


    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material)
    const cube2 = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('#FFFFFF')
    renderer.setSize(width, height)



	 var url = 'http://corsify.appspot.com/https://raw.github.com/mrdoob/three.js/master/examples/models/stl/ascii/slotted_disk.stl'
	 
 	 loader.load('url', function (geometry) {
		console.log("LOADING!")
 	 	console.log("geometry", geometry)
 		var material = new THREE.MeshNormalMaterial()
 	 	var mesh = new THREE.Mesh(geometry, material)
 	 	scene.add(mesh)
 	 	console.log("scene", scene)
	})

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Scene
