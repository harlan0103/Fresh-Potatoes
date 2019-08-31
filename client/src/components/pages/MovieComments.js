import '../../static/style.css';
import React from 'react';
import { connect } from 'react-redux';
import { movieCommentsRequest, submitComment } from '../../actions';
import Faker from 'faker';
import user from '../../static/user.png';

class MovieComments extends React.Component {

  state = {
    comment: {}
  };

  componentDidMount() {
    console.log(this.props);
    // Make api request to get comments for this movie
    this.props.movieCommentsRequest(this.props.movieId);
  }

  onSubmitComment = (event) => {
    event.preventDefault();
    this.props.submitComment(this.state.comment, this.props.auth.userId);
  }

  // Update state.comment when user type new comment
  onTextAreaChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  renderList = () => {
    const img = Faker.image.avatar();
    // If has data, render it
    if(this.props.comments.data) {
      const comments = this.props.comments.data;
      return comments.map(comment => {
        return (
          <div className="comment" key={comment[1]+comment[2]+comment[3]}>
            <div className="avatar">
              <img alt="userImg" className="user circle icon" src={user} />
            </div>
            <div className="content">
              <label className="author">{comment[1]}</label>
              <div className="metadata">
                <div className="date">{comment[3]}</div>
              </div>
              <div className="text">
                <p>{comment[2]}</p>
                <hr/>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  renderReplyForm = () => {
    return(
      <div>
        <form className="ui reply form" onSubmit={this.onSubmitComment}>
          <div className="field">
            <textarea onChange={this.onTextAreaChange} placeholder="Say something..."></textarea>
          </div>

          <button className="ui primary submit labeled icon button">
            <i className="icon edit"></i> Add comment
          </button>
        </form>
        <div><br/></div>
      </div>
    );
  }

  render() {
    return(
      <div>
        <div className="comment-container">
          {this.renderReplyForm()}
        </div>

        <div className="comment-container">
          <div className="ui segment">
            <div className="ui large comments">
              <h3 className="ui dividing header">Comments</h3>
              {this.renderList()}
            </div>
          </div>
        </div>

        <div><br/></div>
      </div>
    );
  }
};

const mapStateToProps= (state) => {
  return {
    movie: state.movieDetail,
    comments: state.movieComments,
    postComment: state.postComment,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { movieCommentsRequest, submitComment })(MovieComments);
