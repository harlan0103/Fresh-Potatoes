import '../static/style.css';
import React from 'react';
import LOGO from '../static/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectedMenu } from '../actions';

// This header contains:
// App logo
// 'BOX OFFICE' button
// 'SEARCH' button
// 'GALLERY' button
// 'ABOUT' button
class Header extends React.Component {

  // Get the current location when page is loaded
  componentDidMount(){
    const location = window.location.pathname.substring(1);
    this.props.selectedMenu(location);
  }

  // Call action when selected different menu
  onCategorySelected = (category) => {
    this.props.selectedMenu(category);
  }

  // Set class style to active if actegory is selected
  setActiveCategory(category) {
    return (category === this.props.menu) ? "item active" : "item";
  }

  render() {
    return(
      <div className="ui-menu ui secondary pointing menu">
        <div className="header-item header item">
          <img className="ui mini image" alt='LOGO' src={LOGO} />
          <div className="header-logo">FRESH POTATOES</div>
        </div>
        <div className="right menu">
          <Link to="/"
            className={this.setActiveCategory('home')}
            onClick={() => this.onCategorySelected('home')}
          >
            HOME
          </Link>
          <Link to="/boxoffice"
            className={this.setActiveCategory('boxoffice')}
            onClick={() => this.onCategorySelected('boxoffice')}
          >
            BOX OFFICE
          </Link>
          <Link to="/search"
            className={this.setActiveCategory('search')}
            onClick={() => this.onCategorySelected('search')}
          >
            SEARCH
          </Link>
          <Link to="/gallery"
            className={this.setActiveCategory('gallery')}
            onClick={() => this.onCategorySelected('gallery')}
          >
            GALLERY
          </Link>
          <Link to="about"
            className={this.setActiveCategory('about')}
            onClick={() => this.onCategorySelected('about')}
          >
            ABOUT
          </Link>
        </div>
      </div>
    );
  };
};

// Get current state from reducers
const mapStateToProps = (state) => {
  return {
    menu: state.menu
  };
}

export default connect(mapStateToProps, { selectedMenu })(Header);
