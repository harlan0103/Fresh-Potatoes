import '../../static/style.css';
import React from 'react';
import banner from '../../static/search_banner.jpg';
import { connect } from 'react-redux';
import { searchBar, submitSearchTerm } from '../../actions';
import { Link } from 'react-router-dom';

class Search extends React.Component {

  inputOnChange = (event) => {
    this.props.searchBar(event.target.value);
  };

  onSearchMovie = (event) => {
    // Prevent page refresh
    event.preventDefault();
    this.props.submitSearchTerm(this.props.searchTerm);
  };

  renderSearchResult = () => {
    if(this.props.searchResult) {
      return this.props.searchResult.map(result => {
        return (
          <div className="item" key={result[1]}>
            <i className="file video icon"></i>
            <div className="content">
              <Link to={`/movie/${result[1]}`}>
                {result[0]}
              </Link>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return(
      <div>
        <img className="ui image" alt="boxoffice_banner" src={banner} />
        <div><br/></div>
        <div className="ui segment">
          <form onSubmit={this.onSearchMovie} className="ui form">
            <div className="field">
              <label>Search Movies</label>
              <input
                type="text"
                placeholder="Search movies"
                onChange={this.inputOnChange}
              />
            </div>
          </form>
        </div>
        <div className="results">
        </div>

        <div className="ui large aligned divided list">
          {this.renderSearchResult()}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    searchResult: state.searchResult.result
  };
};

export default connect(mapStateToProps, { searchBar, submitSearchTerm })(Search);
