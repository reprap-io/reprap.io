import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'


/* eslint-disable react/no-multi-comp */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='reprap.io'
      inverted
      style={{
        fontSize: mobile ? '2em' : '2em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '1.5em',
      }}
    />
    <Header
      as='h2'
      content='Discover open source 3D printable objects on GitHub'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.5em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '0.5em',
      }}
    />
	<SearchForm handleSearch='' />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em', backgroundImage: 'url(' + 'http://sf.co.ua/15/06/wallpaper-12d3fe.jpg' + ')', backgroundSize: 'cover' }} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
		    <Menu.Item as={ Link } to='/new' name='new'  active>New</Menu.Item>
		    <Menu.Item as={ Link } to='/popular' name='popular'>Popular</Menu.Item>
		    <Menu.Item as={ Link } to='/featured' name='featured'>Featured</Menu.Item>
		    <Menu.Item as={ Link } to='/recent' name='recent'>Recently Updated</Menu.Item>
                  <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>Migrate from Thingiverse</Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Why reprap.io?</Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
                  <Menu.Item as={ Link } to='/new' name='new' onClick={ this.handleToggle } active>New</Menu.Item>
	          <Menu.Item as={ Link } to='/popular' name='popular' onClick={ this.handleToggle }>Popular</Menu.Item>
	          <Menu.Item as={ Link } to='/featured' name='featured' onClick={ this.handleToggle }>Fetured</Menu.Item>
	          <Menu.Item as={ Link } to='/recent' name='recent' onClick={ this.handleToggle }>Recently Updated</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em', backgroundImage: 'url(' + 'http://sf.co.ua/15/06/wallpaper-12d3fe.jpg' + ')', backgroundSize: 'cover'}} vertical>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>Migrate from Thingiverse</Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Why reprap.io?</Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
     <Route exact path="/recent" render={(props) => <SearchResults {...props} sort='updated' query='' />} />
     <Route exact path="/new" render={(props) => <SearchResults {...props} sort='updated' query='' />} />
     <Route exact path="/popular" render={(props) => <SearchResults {...props} sort='stars' query='' />} />
     <Route path="/search/:query" render={(props) => <SearchResults {...props} sort='stars' query={props.match.params.query} />} />
  </ResponsiveContainer>
)

export default HomepageLayout
