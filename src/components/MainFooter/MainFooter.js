import React from 'react';

export default function MainFooter() {
  let date = new Date().getFullYear()
  return (
    <div style={{width:"100%", padding:"21px", background:"#333"}}>
      <p style={{color:"white", transform:"scale(.8, 1)", textAlign:"center", margin:"0"}}>Link Riff {date}</p>
    </div>
  )
}