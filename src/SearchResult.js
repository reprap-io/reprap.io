import React, { Component } from 'react'
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table,
} from 'semantic-ui-react'
import Scene from './Scene'
import PrimaryDropdown from './PrimaryDropdown'
import TimeAgo from 'react-timeago'


class SearchResult extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stl_files: [] //a list of stl files we find in a repository
		};
	}

	componentDidMount() {
	let tree_url = this.props.trees_url.replace('{/sha}',''); //the tree URL property ends with {/sha}, trim it off
	let download_url = "https://raw.githubusercontent.com/" + this.props.full_name + "/master/" //build the URL manually to avoid making the call to contents API
	let html_url = this.props.html_url

	//first we call GitHub's tree API endpoint to recursively fetch the tree and gather all STL files in the repository
	fetch( tree_url + "/master?recursive=1") //we only consider the master branch
	.then( response => {
		if (!response.ok) throw Error('Response not ok')
		return response.json();})
	.then( json => { 
		let stl_files = json.tree.map( (file) => { //loop (map) over the resulting files in the tree

			var file_extension = file.path.slice((file.path.lastIndexOf(".") - 1 >>> 0) + 2); //get the file extension
			var match = file_extension.match(/stl/i); //case insensitive match on 'stl'

			if(match && file.type == "blob"){ //if it's an stl file
						// return a scene rendered by threeJS to display the STL file
						return(
									<div>																				
										<Scene url={download_url + file.path} />
										<a href={html_url + "/blob/master/" + file.path} target="_blank">
										View on GitHub
										</a>
									</div>
									)
					}
		})

  //remove the undefined elements from the array of STL files we found
	var temp = [];
		for(let i of stl_files)
		i && temp.push(i); // copy each non-empty value to the 'temp' array
		stl_files = temp;
		this.setState({stl_files: stl_files})
		//delete temp; // discard the variable doesn't work
		});
	}


   render() {
    return (
    <Container>
      <Item.Group divided>
        <Item>
	    <Item.Image size={ 200 }>
	   { this.state.stl_files[0] }
	    </Item.Image>
	   {/*<Item.Image src='/assets/images/wireframe/image.png' /> */}
          <Item.Content verticalAlign='middle'>
            <Item.Header as='a'>{ this.props.name }</Item.Header>
            <Item.Meta>
		<span>By { this.props.owner } </span>

            </Item.Meta>
            <Item.Description>
	    	{ this.props.description }
            </Item.Description>
            <Item.Extra>
							  <Label>
							    <Icon name='star' /> { this.props.stars }
							  </Label>
							  <Label>
							    <Icon name='legal' /> { this.props.license.key }
							  </Label>
	    				<span> Created <TimeAgo date= { this.props.created_at } />, 
							last updated <TimeAgo date={ this.props.updated_at } /> </span>
						<PrimaryDropdown />
	    { /* <Label>Limited</Label> */ }
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
}
}

export default SearchResult;
