import React, { Component } from 'react';
import './Home.css';
import Post from './Post.js';


class Home extends Component {
    state = {
        postList: null,
        count: 10,
        admin: false,
    }

    constructor(props){
        super(props);

        this.GetPosts = this.GetPosts.bind(this);
        this.CheckAdmin = this.CheckAdmin.bind(this);
    }

    componentDidMount(){
        this.GetPosts();
        this.CheckAdmin();
    }

    render() {
        return (
            <div className='Home'>
                <a href='/admin/login' style={{opacity: 0, 'fontSize': 'calc(1vh + 0.5vw)'}}>Login</a>
                <AdminControl auth={this.state.admin}/>
                <UserPosts admin={this.state.admin} postList={this.state.postList}/>
                <div className='Home-background'></div>
            </div>
        );
    }
    
    GetPosts(){
        var url = '/api/GetPosts/count=' + this.state.count;
        fetch(url)
        .then(res => res.json())
        .then(res => {
            this.setState({postList: res.posts});
        })
    }
    
    CheckAdmin(){
        var auth = localStorage.getItem('authcode');
        
        fetch('/api/CheckAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({auth: auth}),
        })
        .then(res => res.json())
        .then(res => {
            if(res.error !== 0)
            {
                return;
            }
            else
            {
                this.setState({admin: true});
            }
        })
    }
}
var postList = null;

function UserPosts(props){
    var posts = null;

    if(!props.postList){
        return posts;
    }
    postList = props.postList;
    posts = [];
    for(var i = 0; i < postList.length; i++){
        var component = (<Post key={i} admin={props.admin} index={i} post={postList[i]}/>)
        posts.push(component);
    }

    return(<div className='Post-list'>{posts}</div>);
}

function AdminControl(props){
    var component = null;
    if(!props.auth){
        return component;
    }

    component = (<a href='/admin/CreatePost' className='Create-post'>Create Post</a>);
    return component;
}

export default Home;