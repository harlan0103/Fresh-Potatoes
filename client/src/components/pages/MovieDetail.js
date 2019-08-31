import '../../static/style.css';
import React from 'react';
import { movieDetailRequest, checkMovieStatus, updateGallery } from '../../actions';
import { connect } from 'react-redux';
import MovieComments from './MovieComments';
import Cookies from 'universal-cookie';

class MovieDetail extends React.Component {

  // We don't want header to show active in any category
  componentDidMount(){
    console.log(this.props);
    const movieId = this.props.match.params.id
    this.props.movieDetailRequest(movieId);
    const cookies = new Cookies();
    if(cookies.get('username')){
      this.props.checkMovieStatus(this.props.match.params.id);
    }
  }

  onWatchedMovie = () => {
    // Add new movieId and username into database
    const movieId = this.props.match.params.id;
    this.props.updateGallery(movieId);
  }

  renderGalleryButton = () => {
    const cookies = new Cookies();
    // If has user logged in
    if(cookies.get('username')) {

      console.log(this.props.galleryBtn);
      // If the return value is 200 means user have watched this movie
      if(this.props.galleryBtn) {
        if(this.props.galleryBtn.status === 200) {
          return (
            <div>
              <button className="ui disabled button">You have watched</button>
            </div>
          );
        }
        else{
          return (
            <div>
              <button className="ui primary button" onClick={this.onWatchedMovie}>Watched</button>
            </div>
          );
        }
      }
    }
    // No user logged in
    else{
      return (
        <div>
          <button className="ui disabled button">Login to add movies!</button>
        </div>
      );
    }
  }

  renderMovieDetail = () => {
    if(this.props.movie.data) {
      const movieArray = this.props.movie.data[0];
      const movieId = this.props.match.params.id;
      return(
        <div>
          <h3 className="ui block center aligned header">
            {movieArray[2]}
          </h3>
          <div className="ui grid">
            <div className="ui row">
              <div className="nine wide column">
              </div>
              <div className="seven wide column">
                <div className="ui list">
                  <div className="movie-item item">Director: {movieArray[5]} </div>
                  <div className="movie-item item">Genre: {movieArray[12]} </div>
                  <div className="movie-item item">Country: {movieArray[13]} </div>
                  <div className="movie-item item">Language: {movieArray[15]} </div>
                  <div className="movie-item item">Year: {movieArray[3]} </div>
                  <div className="movie-item item">Production: {movieArray[4]} </div>
                  <div className="movie-item item">Rated: {movieArray[14]} </div>
                  <div className="movie-item item">Length: {movieArray[11]} </div>
                  <div className="movie-item item">IMDb: {movieArray[6]} </div>
                </div>
                <div>
                  {this.renderGalleryButton()}
                </div>
              </div>

            </div>
          </div>

          <div className="movie-segment ui segments">

            <div className="score-segment ui segment">
              <div className="ui horizontal divided list">
                <div className="item">
                  <div className="content">
                    <p className="score-content"> MetaScore: {movieArray[7]} </p>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <p className="score-content"> IMDB: {movieArray[8]} </p>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <p className="score-content"> Rotten Tomato: {movieArray[9]} </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="storyline-segment ui segment">
              <label className="movie-item">Story line:</label>
              <p className="movie-item">{movieArray[10]}</p>
            </div>
          </div>
          <div><br/></div>
          <MovieComments movieId={movieId} />
        </div>
      );
    }
  }

  render(){
    return(
      <div>
        {this.renderMovieDetail()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movieDetail,
    auth: state.auth,
    galleryBtn: state.galleryBtn
  };
}

export default connect(mapStateToProps, { movieDetailRequest, checkMovieStatus, updateGallery })(MovieDetail);
