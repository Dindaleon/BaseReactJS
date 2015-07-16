var React = require('react');

module.exports = React.createClass({

  render: function render() {
    var scripts;
    

    if (!this.props.isProduction) {
      scripts = <div>
                  <script src='/public/vendors.js'/>
                  <script src='/public/a.js'/><script src='/public/b.js'/>
                  <script src='/public/app.js'/>
                </div>;
    } else {
      scripts =  <div>
                  <script src='/public/vendors.js'/>
                  <script src='/public/app.js'/>
                </div>;
    }

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>
            {this.props.title}
          </title>
        </head>
        <body>
          {this.props.children}
        </body>      
        {scripts}
      </html>
    );
  }
});