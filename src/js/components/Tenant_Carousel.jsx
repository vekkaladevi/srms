'use strict';

import Carousel from 'nuka-carousel';
import React from 'react/addons';

window.React = React;


const tcStyles = {};
const TenantCarousel = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    let tc;
    tc = this.props.tenants.map(function(tenant, id) {
      return (
        <div key={id} style={tcStyles.wrapper}>
         
	  <h3>{tenant.name}</h3>
        
	    <h4>{tenant.phone}</h4>
        </div>
      );  
    });
    
    return (
      <div style={{width: '50%', margin: 'auto'}}>
        <Carousel
          ref="carousel"
          data={this.setCarouselData.bind(this, 'carousel')}>
          {tc}
        </Carousel>
      </div>
    )
  }
});

tcStyles.wrapper = {
  width: '1000',
  height: '400',
  background:'blue'
};

export default TenantCarousel;
