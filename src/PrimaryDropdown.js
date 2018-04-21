import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'

const options = [
	  { key: 'viewgithub', icon: 'github', text: 'View on GitHub', value: 'viewgithub' },
	  { key: 'viewreprapio', icon: 'cubes', text: 'View on reprap.io', value: 'viewreprapio' },
]

const PrimaryDropdown = () => (
	  <Button.Group floated='right' color='teal'>
	    <Button>Download</Button>
	    <Dropdown options={options} floating button className='icon' />
	  </Button.Group>
)

export default PrimaryDropdown
