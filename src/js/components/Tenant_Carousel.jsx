'use strict';

import Carousel from 'nuka-carousel';
import React from 'react/addons';

window.React = React;


const Decorators = [
  {
    component: React.createClass({
      render() {
        return (
          <button
            style={this.getButtonStyles(this.props.currentSlide === 0)}
            onClick={this.props.previousSlide}>
            <i className="fa fa-chevron-circle-left"></i>
          </button>
        )
      },
      getButtonStyles(disabled) {
        return {
          border: 0,
          color: 'rgb(192, 57, 43)',
          fontSize: 24,
          lineHeight: 1,
          padding: 10,
          display: 'block',
          outline: 0,
          opacity: 1,
          cursor: 'pointer',
          background: 'transparent'
        }
      }
    }),
    position: 'CenterLeft'
  },
  {
    component: React.createClass({
      render() {
        return (
          <button
            style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount)}
            onClick={this.props.nextSlide}>
            <i className="fa fa-chevron-circle-right"></i>
          </button>
        )
      },
      getButtonStyles(disabled) {
        return {
          border: 0,
          color: 'rgb(192, 57, 43)',
          fontSize: 24,
          lineHeight: 1,
          padding: 10,
          display: 'block',
          outline: 0,
          opacity: 1,
          cursor: 'pointer',
          background: 'transparent'
        }
      }
    }),
    position: 'CenterRight'
  },
  {
    component: React.createClass({
      render() {
        var self = this;
        var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
        return (
          <ul style={self.getListStyles()}>
            {
              indexes.map(function(index) {
                return (
                  <li style={self.getListItemStyles()} key={index}>
                    <button
                      style={self.getButtonStyles(self.props.currentSlide === index)}
                      onClick={self.props.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      },
      getIndexes(count, inc) {
        var arr = [];
        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      },
      getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          top: -10,
          padding: 0
        }
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block'
        }
      },
      getButtonStyles(active) {
        return {
          border: 0,
          background: 'transparent',
          color: 'black',
          cursor: 'pointer',
          padding: 10,
          outline: 0,
          fontSize: 24,
          opacity: active ? 1 : 0.5
        }
      }
    }),
    position: 'BottomCenter'
  }
];


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
          decorators={Decorators}
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
  background: '#337ab7',
  color:'#fff'
};

export default TenantCarousel;
