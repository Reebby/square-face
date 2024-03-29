import React from 'react';

class Signin extends React.Component  {
	constructor(props) {
		super(props);
		this.state = {
			signinEmail: '',
			signinPassword: ''
		}
	}

	signinEmail = (event) => {
    this.setState({signinEmail: event.target.value})
	}

	signinPassword = (event) => {
		this.setState({signinPassword: event.target.value})
	}

	signinSubmit = () => {
		fetch('https://calm-fortress-83891.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signinEmail,
				password: this.state.signinPassword
			})
		})
		.then(response => response.json()) 
		.then(user => {
		  	if(user.id) {
		  		this.props.loadUser(user)
		  		this.props.changeRoute('home');
		  	}
		}).catch(console.log)
	}

render() {
	const {changeRoute} = this.props;
	return (
		<div>
		<article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
				<div className="measure ">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				<legend className="f2 fw6 ph0 mh0">Sign In</legend>
				<div className="mt3">
					<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					<input onChange={this.signinEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				</div>
				<div className="mv3">
					<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					<input onChange={this.signinPassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				</div>
				</fieldset>
				<div className="">
				<input onClick={this.signinSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
				</div>
				<div className="lh-copy mt3">
				<p onClick={() => changeRoute('register')} className="f6 link dim black db pointer">Register</p>
				</div>
				</div>
			</main>
		</article>
		</div>

		);

}
}

export default Signin;