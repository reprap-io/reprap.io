import React, { Component } from 'react'
import {
  Form,
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
	Input,
  List,
  Menu,
  Segment, Visibility,

} from 'semantic-ui-react'


const FixedMenu = () => (
  <Menu fixed='top' size='large'>
    <Container>
      <Menu.Item as='a' active>New</Menu.Item>
      <Menu.Item as='a'>Popular</Menu.Item>
      <Menu.Item as='a'>Recently Updated</Menu.Item>
      <Menu.Item as='a'>Featured</Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item className='item'>
          <Button as='a'>Info</Button>
        </Menu.Item>
        <Menu.Item>
          <Button as='a' primary>New Object</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
)



class Hero extends Component  {
  state = {}

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  render() {

    const { visible } = this.state

    return (
      <div className="App">

        { visible ? <FixedMenu /> : null }

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 250, padding: '1em 0em' }}
            vertical
          >
                  <Container text>
              <Header
                as='h1'
                content='reprap.io'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
              />

<Divider hidden />
  <Input
    icon={<Icon name='search' inverted circular link />}
		size='massive'
    placeholder='Search...'
  />
		 <Divider hidden / >

           </Container>
  	     <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item as='a' active>New</Menu.Item>
                <Menu.Item as='a'>Popular</Menu.Item>
                <Menu.Item as='a'>Recently Updated</Menu.Item>
                <Menu.Item as='a'>Featured</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>Info</Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>New Object</Button>
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

        </Visibility>
	</div>
	);


		}
}

export default Hero;
