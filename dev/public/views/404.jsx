var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({

  displayName: '404 Page Not Found',

  render: function render() {

    return (
      <div id='pageNotFound'>
        <h1>{this.props.name}404 Page Not Found</h1>
        <h6>We are sorry but the page you were looking for could not be found!</h6> 
        <br />
        <br />
        <div onClick={() => this.goBack()}>Go back</div>       
      </div>
    );
  }
});