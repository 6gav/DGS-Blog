import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    state = {
        username: null,
        password: null,
    }

    constructor(props){
        super(props);

        this.submitLogin = this.submitLogin.bind(this);
    }
    
    componentDidMount(){

    }

    render() {
        return (
            <div className='Login-page'>
                <form onSubmit={this.submitLogin} className='Login-form'>
                    <input type='text' placeholder='Username' onChange={e => this.setState({username: e.target.value})} style={{width: '10vw', padding: 0}}/>
                    <input type='password' placeholder='Password' onChange={e => this.setState({password: e.target.value})} style={{width: '10vw', padding: 0}}/>
                    <input type='submit' value='Login' style={{width: '10vw', height: '2vh'}}/>

                    <p style={{fontSize: '0.8em', color: 'red'}} >{this.state.error}</p>
                </form>
            </div>
        );
    }

    submitLogin(e){
        e.preventDefault();
        console.log(this.state);
        fetch('/api/SubmitLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('authcode', res.auth);
            console.log(res);
            if(res.auth == -1){
                this.setState({error: 'Invalid username/password'});
                return;
            }

            window.location = '/';
        });
    }

}

export default Login;