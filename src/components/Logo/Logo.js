import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className="mt0 ma4">
		<Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 100, width: 100 }} >
		<div className="Tilt-inner pa3"> <img style={{paddingTop: "5px"}} src={brain} alt="logo" /> </div>
		</Tilt>
		</div>
		)
}

export default Logo;