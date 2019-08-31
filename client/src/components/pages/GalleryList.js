import poster from '../../static/default_poster.png';
import React from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { fetchWatchedList } from '../../actions';
import { Link } from 'react-router-dom';

class GalleryList extends React.Component {
  componentDidMount() {
    // Get current logged in username from cookie
    console.log(this.props);
    this.props.fetchWatchedList(this.props.username);
    // Send api request to fetch user watched movies
  }

  renderWatchedList = () => {
    // When we have the watched list
    if(this.props.galleryList.list) {
      //console.log(this.props.galleryList.list.data);
      const movies = this.props.galleryList.list.data;
      return movies.map(movie => {
        return(
          <div className="column" key={movie[1]}>

            <div className="ui card">
              <div className="image">
                <img src={poster} />
              </div>
              <div className="content">
                <Link to={`/movie/${movie[1]}`} className="header">{movie[3]}</Link>
                <div className="meta">
                  <span className="date">Added: {movie[2]}</span>
                </div>
              </div>
            </div>

          </div>
        );
      });
    }
  }

  render() {
    return(
      <div>
        <div className="ui four column grid">
          {this.renderWatchedList()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    galleryList: state.galleryList
  };
}

export default connect(mapStateToProps, { fetchWatchedList })(GalleryList);
