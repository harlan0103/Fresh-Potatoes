import '../../static/style.css';
import React from 'react';
import banner from '../../static/box_office_banner.jpg';
import { connect } from 'react-redux';
import { selectedItem } from '../../actions';

class Boxoffice extends React.Component {

  componentDidMount() {
    // The default page is the domestic
    this.props.selectedItem('domestic');
  }

  // Render three tables based on the current selected item
  renderDetail = (item) => {
    // Only operate movie data when component recieved data from api request
    if(item === 'domestic') {
      return this.props.data.map(movie => {
        return (
          <tbody key={movie[0]}>
            <tr>
              <td className="ui center aligned">{movie[1]}</td>
              <td className="ui center aligned">{movie[2]}</td>
              <td className="ui center aligned">{movie[3]}</td>
              <td className="ui center aligned">{movie[4]}</td>
              <td className="ui center aligned">{movie[5]}</td>
            </tr>
          </tbody>
        );
      });
    }
    else if(item === 'worldwide') {
      return this.props.data.map(movie => {
        return (
          <tbody key={movie[0]}>
            <tr>
              <td className="ui center aligned">{movie[1]}</td>
              <td className="ui center aligned">{movie[2]}</td>
              <td className="ui center aligned">{movie[3]}</td>
              <td className="ui center aligned">{movie[4]}</td>
              <td className="ui center aligned">{movie[6]}</td>
              <td className="ui center aligned">{movie[8]}</td>
              <td className="ui center aligned">{movie[9]}</td>
            </tr>
          </tbody>
        );
      });
    }
    else {
      return this.props.data.map(movie => {
        return (
          <tbody key={movie[0]}>
            <tr>
              <td className="ui center aligned">{movie[1]}</td>
              <td className="ui center aligned">{movie[2]}</td>
              <td className="ui center aligned">{movie[3]}</td>
              <td className="ui center aligned">{movie[4]}</td>
              <td className="ui center aligned">{movie[5]}</td>
            </tr>
          </tbody>
        );
      });
    }
  }

  renderTable = () => {
    // When movie data is not undefined
    if(this.props.data) {
      if(this.props.item === 'domestic') {
        return (
          <table className="ui basic table">
            <thead className="table-head">
              <tr>
                <th className="table-title ui center aligned">RANK</th>
                <th className="table-title ui center aligned">TITLE</th>
                <th className="table-title ui center aligned">LIFETIME GROSS</th>
                <th className="table-title ui center aligned">STUDIO</th>
                <th className="table-title ui center aligned">YEAR</th>
              </tr>
            </thead>
            {this.renderDetail('domestic')}
          </table>
        );
      }
      else if(this.props.item === 'worldwide') {
        return (
          <table className="ui basic table">
            <thead className="table-head">
              <tr>
                <th className="table-title ui center aligned">RANK</th>
                <th className="table-title ui center aligned">TITLE</th>
                <th className="table-title ui center aligned">WORLDWIDE GROSS</th>
                <th className="table-title ui center aligned">DOMESTIC GROSS</th>
                <th className="table-title ui center aligned">OVERSEAS GROSS</th>
                <th className="table-title ui center aligned">STUDIO</th>
                <th className="table-title ui center aligned">YEAR</th>
              </tr>
            </thead>
            {this.renderDetail('worldwide')}
          </table>
        );
      }
      else {
        return(
          <table className="ui basic table">
            <thead className="table-head">
              <tr>
                <th className="table-title ui center aligned">RANK</th>
                <th className="table-title ui center aligned">TITLE</th>
                <th className="table-title ui center aligned">WEEKEND GROSS</th>
                <th className="table-title ui center aligned">LIFETIME GROSS</th>
                <th className="table-title ui center aligned">STUDIO</th>
              </tr>
            </thead>
            {this.renderDetail('weekend')}
          </table>
        );
      }
    }
  }

  render(){
    return(
      <div>
        <img className="ui image" alt="boxoffice_banner" src={banner} />

        <div className="ui horizontal segments">
          <div className="ui center aligned segment">
            <p className="boxoffice-item" onClick={() => this.props.selectedItem('domestic')}>Domestic</p>
          </div>
          <div className="ui center aligned segment">
            <p className="boxoffice-item" onClick={() => this.props.selectedItem('worldwide')}>Worldwide</p>
          </div>
          <div className="ui center aligned segment">
            <p className="boxoffice-item" onClick={() => this.props.selectedItem('weekend')}>Weekend</p>
          </div>
        </div>
        <div>
          {this.renderTable()}
        </div>
        <div>
          <br/>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.item.data,
    item: state.item.item
  }
};

export default connect(mapStateToProps, { selectedItem })(Boxoffice);
