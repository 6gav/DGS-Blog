import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
    state = {
        body: this.props.post.body,
        title: this.props.post.title,
        poster: this.props.post.poster,
        date: this.props.post.date,
        id: this.props.index,
        edit: 'Hi'
    }
    
    componentDidMount(){

    }
    
    render() {
        return (
            <div className='post-Admin'>
                <div className='Post-holder' onClick={e => console.log(this.state.id)}>
                    <p className='Post-title'>{this.state.title}</p>    
                    <p className='Post-poster'>by {this.state.poster} on {this.state.date}</p>    
                    <p className='Post-body'>{this.state.body}</p>    
                </div>
            </div>
        )
    }
}

export default Post;