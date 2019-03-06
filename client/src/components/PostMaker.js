import React, { Component } from 'react';
import './PostMaker.css';

class PostMaker extends Component {
    state = {
        admin: false,
    }

    constructor(props){
        super(props);

        this.CheckAdmin = this.CheckAdmin.bind(this);
        this.SubmitPost = this.SubmitPost.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
    }

    componentDidMount(){
        this.CheckAdmin();
    }

    render() {
        return (
            <div className='Submit-page'>
                <AdminError admin={this.state.admin}/>
                <form onSubmit={this.SubmitPost}>
                    <div className='Submit-radio'>
                        <label>
                            <input type='radio' name='poster' value='Gavin' onChange={this.HandleChange}/>
                            Gavin
                        </label>
                        <label>
                            <input type='radio' name='poster' value='Sabian' onChange={this.HandleChange}/>
                            Sabian
                        </label>
                        <label>
                            <input type='radio' name='poster' value="De'Angelo" onChange={this.HandleChange}/>
                            De'Angelo
                        </label>
                    </div>
                    <div className='Submit-form'>
                        <input type='text' placeholder='Title' onChange={e => this.setState({title: e.target.value})} className='Submit-title'/>
                        <textarea placeholder='Body' onChange={e => this.setState({body: e.target.value})} className='Submit-body'/>
                        <input type='submit' value='Create Post' className='Submit-button'/>
                    <p style={{color: 'red'}}>{this.state.postError}</p>
                    </div>
                </form>
            </div>
        );
    }

    CheckAdmin(){
        fetch('/api/CheckAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({auth: localStorage.getItem('authcode')}),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            
            if(res.error !== 0){
                console.log(res.error);
                return;
            }

            this.setState({admin: true});

        });
    }

    SubmitPost(e){
        e.preventDefault();

        if(!this.state.poster || !this.state.body || !this.state.title)
        {
            console.log('Unable to post!');
            this.setState({postError: 'All fields must be filled out!'});
            return;
        }

        console.log(this.state);

        var title = this.state.title, body=this.state.body, poster=this.state.poster;

        fetch('/api/AddPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({title: title, body: body, poster: poster}),
        })
        .then(res => res.json())
        .then(res => {
            if(res.error === 0){
                window.location = '/';
            }
            else
            {
                this.setState({error: res.error});
            }
        });
    }

    HandleChange(e){
        this.setState({poster: e.target.value});
    }

}


function AdminError(props){
    if(props.admin){
        return null;
    }
    else
    {
        return <p style={{color: 'red'}} >Error: not an admin.</p>
    }
}

export default PostMaker;