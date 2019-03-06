import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    state = {
        postList: null,
        count: 10,
    }

    constructor(props){
        super(props);

        this.GetPosts = this.GetPosts.bind(this);
    }

    componentDidMount(){
        this.GetPosts();
    }

    render() {
        return (
            <div className='Home'>
                <a href='/admin/login' style={{opacity: 0, 'font-size': 'calc(1vh + 0.5vw)'}}>Login</a>
                <UserPosts postList={this.state.postList}/>
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
}

function UserPosts(props){
    var posts = null;

    if(!props.postList){
        return posts;
    }
    var postList = props.postList;
    posts = [];
    for(var i = 0; i < postList.length; i++){
        var component = (
        <div key={i} className='Post-holder'>
            <p className='Post-title'>{postList[i].title}</p>    
            <p className='Post-poster'>by {postList[i].poster}</p>    
            <p className='Post-body'>{postList[i].body}</p>    
        </div>)
        posts.push(component);
        console.log(postList[i]);
    }

    return(<div className='Post-list'>{posts}</div>);
}

export default Home;