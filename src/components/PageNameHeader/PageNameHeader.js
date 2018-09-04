import React, { Component } from 'react';
import './PageNameHeader.css';

class PageNameHeader extends Component {
  render() {
    return (
      <div className='page-name-header_wrapper'>
        <div>
          {
            this.props.children()
          }
        </div>
      </div> 
    );
  }
}

export default PageNameHeader;