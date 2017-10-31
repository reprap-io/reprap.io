import React, { Component } from 'react'
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table,
} from 'semantic-ui-react'
import Scene from './Scene'




class SearchResult extends Component {

	constructor(props) {
		super(props);
		this.state = {
			results: []
		};
}

	componentDidMount() {
	let tree_url = this.props.trees_url.replace('{/sha}',''); //The tree URL property ends with {/sha}, trim it off

	fetch( tree_url + "/master?recursive=1")
	.then( response => {
		if (!response.ok) throw Error('Response not ok')
		return response.json();})
	.then( json => { 
		let results = json.tree.map( (file) => {
						
			var file_extension = file.path.slice((file.path.lastIndexOf(".") - 1 >>> 0) + 2); //get file extension
			var match = file_extension.match(/stl/i); //case insensitive match on file extension for STL

			if(match && file.type == "blob"){
						let embed_3d = "https://embed.github.com/view/3d/" + this.props.full_name + "/master/" + file.path
						const script = document.createElement("script");
						script.type = 'text/javascript';
						script.src = embed_3d
						document.body.appendChild(script);


						script.async = true;
	
						console.log("json", file)
							return( 
										<div>	
											<Scene /> { file.path }
										</div>
							
							)


						}

							//console.log("wew lads", file.path.split('.').pop())
		})

		this.setState({results : results})
		});
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
