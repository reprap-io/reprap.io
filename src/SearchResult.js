import React, { Component } from 'react'
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table,
} from 'semantic-ui-react'
import Scene from './Scene'



class SearchResult extends Component {

	constructor(props) {
		super(props);
		this.state = {
			results: [],
			stl_files: [] //a list of stl files we find in a repository
		};
}

	componentDidMount() {
	let tree_url = this.props.trees_url.replace('{/sha}',''); //The tree URL property ends with {/sha}, trim it off
	let contents_url = this.props.contents_url.replace('{+path}',''); //The contents URL

	//first we recursively fetch the tree and gather all STL files in the repo
	fetch( tree_url + "/master?recursive=1") //we only consider the master branch
	.then( response => {
		if (!response.ok) throw Error('Response not ok')
		return response.json();})
	.then( json => { 
		let stl_files = json.tree.map( (file) => { //loop (map) over the resulting files in the tree
			var file_extension = file.path.slice((file.path.lastIndexOf(".") - 1 >>> 0) + 2); //extract file extension
			var match = file_extension.match(/stl/i); //case insensitive match on 'stl'

			if(match && file.type == "blob"){ //if it's an stl file
						//add the stl file path we found to our list of stls
						return( file.path )
					}

		})
		this.setState({stl_files: stl_files})

    //remove the undefined elements
	  var temp = [];
		for(let i of this.state.stl_files)
    i && temp.push(i); // copy each non-empty value to the 'temp' array
		this.state.stl_files = temp;
		//delete temp; // discard the variable doesn't work

		console.log(this.state.stl_files)

		let scene_markup = this.state.stl_files.map( (file) => {
			let url_to_fetch = contents_url + file
			fetch( url_to_fetch )
			.then( response => {
					if (!response.ok) console.log('Response not ok')
					return response.json();})
			.then( json => { 
							return( 
										<div>	
											<Scene url = { json.download_url }/>
										</div>
							)

							})

		});	

		});

		//now we have a list of STL files in the repository, let's retrieve their download url
		//this only works for files <4.5MB, a 403 is returned and the request is rejected when files are over the limit
		
	}


   render() {
    return (
    <Container>
      <Item.Group divided>
        <Item>
          <Item.Image src='/assets/images/wireframe/image.png' />
          <Item.Content>
            <Item.Header as='a'>{ this.props.name }</Item.Header>
            <Item.Meta>
              <span>By { this.props.owner } </span>
            </Item.Meta>
            <Item.Description>
	    	{ this.props.description }
            </Item.Description>
            <Item.Extra>
              <Button floated='right' primary>
                Primary
                <Icon name='right chevron' />
              </Button>
							  <Label>
							    <Icon name='star' /> { this.props.stars }
							  </Label>
						{ this.state.results }
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
