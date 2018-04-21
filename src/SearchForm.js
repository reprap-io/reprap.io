import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {
  Form, Input, Icon
} from 'semantic-ui-react'


class SearchForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stl_files: [], //a list of stl files we find in a repository
			value: ''
		};
	    	this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    /*alert('A name was submitted: ' + this.state.value);*/
    this.props.history.push('/search/' + this.state.value);
    event.preventDefault();
  }


   render() {
    return (
	<Form onSubmit={this.handleSubmit}>
	  <Input fluid
	    icon={<Icon name='search' onClick={this.handleSubmit} inverted circular link />}
			size='massive'
	    		placeholder='Search...'
			value={this.state.value} onChange={this.handleChange}
	  />
	</Form>
  );
}
}

export default withRouter(SearchForm);
