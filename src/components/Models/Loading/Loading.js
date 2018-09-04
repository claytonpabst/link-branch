import React from 'react';

export default function LoadingPopover() {
  return (
    <div className='sign-in_wrapper'>
      <div style={{width:'350px'}} id="sign-in_content-wrapper">
        <h2 id="sign-in_header">Loading...</h2>
        <img style={{width:'250px', display:'block', margin:'0 auto'}} src='https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' alt='loading gif' />
      </div>
    </div>
  )
}