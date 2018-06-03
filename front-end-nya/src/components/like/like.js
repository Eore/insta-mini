import React, {Component} from 'react';

class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.props.entry.liked,
            likes: this.props.entry.likes_count
        }
        this.post = this.post.bind(this);
        this.delete = this.delete.bind(this);
    }

    post() {
        if (!(this.state.like)) {
            fetch({
                method: "POST",
                url: "/api/v1/likes",
                data: {
                    log_entry_id: this.props.entry.id
                },
            })
                .then((response) => {
                    this.setState({ like: true })
                    let likes = this.state.likes;
                    likes++;
                    this.setState({ likes: likes });
                    this.props.entry.liked = true;
                    this.props.entry.likes_count = likes;
                });
        }
    }

    delete() {
        if (this.state.like) {
            fetch({
                method: "DELETE",
                url: "/api/v1/likes/" + this.props.entry.id
            })
                .then((response) => {
                    this.setState({ like: false })
                    let likes = this.state.likes;
                    likes--;
                    this.setState({ likes: likes });
                    this.props.entry.liked = false;
                    this.props.entry.likes_count = likes;
                });
        }
    }

    render() {
        let show_likes = "";
        if (this.state.like) {
            show_likes = (this.state.likes > 1) ? ("You and " + (this.state.likes - 1) + ((this.state.likes === 2) ? (" other person") : (" others")) + (" like this.")) : ("You like this.");
        } else if (this.state.likes > 0) {
            show_likes = (this.state.likes === 1) ? (this.state.likes + " person likes this.") : (this.state.likes + " people like this.");
        }
        let like_button = this.state.like ?
            <a onClick={this.delete} className=" pull-right"><i className="fa fa-thumbs-o-down"></i> Dislike</a> :
            <a onClick={this.post} className=" pull-right"><i className="fa fa-thumbs-o-up"></i> Like</a>
        return (
            <div>
                <span>
                    {show_likes}
                </span>
                    {like_button}
            </div>
        );
    }
}

export default Like;