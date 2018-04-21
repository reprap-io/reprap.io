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
import LoadingMessage from './LoadingMessage'
import SearchResult from './SearchResult'

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			loading: true,
		};
}


        searchreprapio(query) {
	fetch("https://api.github.com/search/repositories?q=" + query + "+topic:reprapio")
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
								html_url = {search_result.html_url}
								full_name = {search_result.full_name}
								description={search_result.description} 
								owner={ search_result.owner.login }
								trees_url={ search_result.trees_url }
								stars = { search_result.stargazers_count }
								license = { search_result.license }
								created_at = { search_result.created_at }
								updated_at  = { search_result.updated_at }
							
							/>
			)
		})

		this.setState({results : results})
		this.setState({loading: false})

		console.log("QUERY:   " + this.props.match.params.query)
		});
	}



	componentDidMount(props) {
		this.searchreprapio(this.props.match.params.query)
	}

	handleQuery() {
		this.searchreprapio(this.props.match.params.query)
	}

	render() {
		return (
			<div>
				<Divider hidden />

					{ this.state.results }
					{ this.state.loading ? <LoadingMessage /> : null }
			</div>
		);
	}
}

export default SearchResults;
