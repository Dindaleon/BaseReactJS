var React = require('react');

module.exports = React.createClass({

  displayName: 'account',

  onButtonClick: function() {
    alert('Happy Reacting!');
  },

  render: function render() {

    return (
      <div id='account'>
        <h1>{this.props.name}</h1>
        <h6>Welcome to my Base ReactJS app!</h6>
        <button onClick={this.onButtonClick}>Click me for some fun...</button>
        <br />
        <br />
        <a href='/some_unknown'>This is an unhadled route</a>
      </div>
    );
  }
});