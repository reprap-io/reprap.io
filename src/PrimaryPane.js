import React, { Component } from 'react';
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
  Segment,
  Visibility,
} from 'semantic-ui-react'

import SearchResult from './SearchResult'

class PrimaryPane extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: []
		};
}
 
	componentDidMount() {

	fetch("https://api.github.com/search/repositories?q=topic:reprapio&sort=updated")
	.then( response => {
		if (!response.ok) throw Error('Response not ok')
		return response.json();})
	.then( json => { 
		let results = json.items.map( (search_result) => {
			console.log("json", json)
			return( 
							<SearchResult 

								name={search_result.name} 
							  contents_url = {search_result.contents_url}
								full_name = {search_result.full_name}
								description={search_result.description} 
								owner={ search_result.owner.login }
								trees_url={ search_result.trees_url }
								stars = { search_result.stargazers_count }
							
							/>
			)
		})

		this.setState({results : results})
		});
	}

	render() {
		return (
			<div>
				<Divider hidden />
						{ this.state.results }
					Loading... { /* TODO loader spinner */ }
			</div>
		);
	}
}

export default PrimaryPane;
