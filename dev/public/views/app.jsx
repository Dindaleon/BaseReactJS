var Layout = require('./layout');
var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({

  render: function render() {

    return (
      <Layout {...this.props}>
        <Router.RouteHandler {...this.props}/>
      </Layout>
    );
  }
});