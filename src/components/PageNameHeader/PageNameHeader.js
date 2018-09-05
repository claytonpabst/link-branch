import React, { Component } from 'react';
import './PageNameHeader.css';

class PageNameHeader extends Component {
  render() {
    return (
      <div className='page-name-header_wrapper'>
        <section>
          <div>
            {
              this.props.children()
            }
          </div>
        </section>
      </div> 
    );
  }
}

export default PageNameHeader;