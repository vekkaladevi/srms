

import React from 'react';  

class DefaultLayout extends React.Component {
  render() {
    return(
      <html>
	<head>
	<meta charSet="utf-8"/>
	<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	    <title>{this.props.title}</title>
	</head>
	<body>
	    <div id='app'></div> <!-- Add this -->
	    {this.props.children}	
	    <script src="/bundle.js"/>
	</body>
      </html>
    )
  }
};

export default DefaultLayout;
