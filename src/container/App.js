import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';

const particlesOption = {
	particles: {
		number: {
			value: 150,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}
const initialState = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			user: {
				id: '',
				name:'',
				email: '',
				entries: 0,
				joined: ''
			}
		}

class App extends Component {
	constructor() {
		super();
		this.state =  initialState;
	}


	loadUser = (data) => {
        this.setState({user: {
        	id: data.id,
        	name: data.name,
        	email: data.email,
        	entries: data.entries,
        	joined: data.joined
        }})
	}

	calculateFaceLocation = (data) => {
		const imageValues = data.outputs[0].data.regions[0].region_info.bounding_box;
		const imageInput = document.getElementById("imageInput");
		const imageWidth = Number(imageInput.width);
		const imageHeight = Number(imageInput.height);
	    return {
	    topRow: imageValues.top_row * imageHeight,
	    leftCol: imageValues.left_col * imageWidth,
	    bottomRow: imageHeight - (imageValues.bottom_row * imageHeight),
	    rightCol: imageWidth - (imageValues.right_col * imageWidth),
	    }
	}

	onInput = (event) => {
		this.setState({ input: event.target.value })
	}

	faceBoxValues = (box) => {
		this.setState({box: box })
	}

	onSubmit = () => {
		this.setState({imageUrl: this.state.input});
		fetch('https://calm-fortress-83891.herokuapp.com/imageurl', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				input: this.state.input
			})
		})
		.then(response => response.json())
		.then(response => {
				if(response) {
					fetch('https://calm-fortress-83891.herokuapp.com/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, { entries: count}))
					})
					.catch(console.log)
				}
				this.faceBoxValues(this.calculateFaceLocation(response));
			}).catch(err => console.log(err));
	}

changeRoute = (route) => {
		if(route === 'signout') {
			this.setState(initialState)
		} else if(route === 'home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

  render() {
  	const { isSignedIn, imageUrl, box,route } = this.state;
    return (
    	<div className="App">
	    	<Particles className="particles"
	              params={particlesOption}
	            />
		    	<Navigation isSignedIn={isSignedIn} changeRoute = {this.changeRoute}/>
		    	{ route === 'home' 
				    ? <div> 
				    	<Logo />
				    	<Rank
		                 name={this.state.user.name}
				    	 entries = {this.state.user.entries} />
				    	<ImageLinkForm onInput = {this.onInput} onSubmit = {this.onSubmit}/>
				    	<FaceRecognition imageUrl = {imageUrl} box = {box}/>
				    	</div>  
			    	: (
			    		route === 'signin'
			    		 ? <Signin  loadUser={this.loadUser} changeRoute = {this.changeRoute}/> 
			    		 : <Register  loadUser={this.loadUser} changeRoute = {this.changeRoute}/>
			    		)
		        }
    	</div>
    ); 
  }
}
export default App;
