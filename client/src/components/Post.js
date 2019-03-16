import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
    state = {
        body: this.props.post.body,
        title: this.props.post.title,
        poster: this.props.post.poster,
        date: this.props.post.date,
        id: this.props.index,
        admin: this.props.admin,
        editMode: false,
        editType: '',
    }
    
    constructor(props){
        super(props);
        this.EditPost = this.EditPost.bind(this);    
        this.EditBox = this.EditBox.bind(this);
        this.OnChange = this.OnChange.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
    }

    componentDidMount(){

    }

    EditPost(type){
        if(type === this.state.editType){
            this.setState({editMode: false, editType: ''});
            return;
        }
        this.setState({editType: type, editText: this.state[type], editMode: true});
    }
    
    EditBox(){
        var editBox = null;
        if(!(this.state.admin && this.state.editMode)){
            return editBox;
        }
        editBox = (
            <div>
                <form className='Post-edit' onSubmit={this.HandleSubmit}>
                    <textarea className='Post-input' type='text' rows={5} value={this.state.editText} onChange={e => this.OnChange(e)}/>
                    <input type='submit'/>
                </form>
            </div>
        );

        return editBox;
    }

    OnChange(e){
        this.setState({editText: e.target.value});
    }

    HandleSubmit(e){
        e.preventDefault();
        var adminCode = localStorage.getItem('authcode');
        fetch('/api/EditPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({id: this.state.id, post:{newValue: this.state.editText, type: this.state.editType}, admin: this.state.admin, adminCode: adminCode}),
        })

    }

    render() {
        return (
            <div className='Post-admin'>
                <div className='Post-holder'>
                    <p className='Post-title'  onClick={e => this.EditPost('title')}>{this.state.title}</p>    
                    <p className='Post-poster' onClick={e => this.EditPost('poster')}>by {this.state.poster} on {this.state.date}</p>    
                    <p className='Post-body'   onClick={e => this.EditPost('body')}>{this.state.body}</p>    
                </div>
                <this.EditBox/>
            </div>
        )
    }
}

export default Post;