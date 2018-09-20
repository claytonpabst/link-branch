import React from 'react';
import './LandingMessageFooter.css';

export default function Section2(){
    return (
        <div className='section2'>
            <section className='section2ContentContainer'>
                <div className='section2Content' style={{background:"#8a3ab9"}}>
                    <img src="https://webiconspng.com/wp-content/uploads/2017/01/Open-Box-Transparent-Icon.png" alt=""/>
                    <h3>How It Works</h3>
                    <h1>Discover how Follow You Up is changing the game</h1>
                </div>
                <div className='section2Content' style={{background:"#e95950"}}>
                    <img src="http://www.pagelinestheme.com/wp-content/uploads/2013/10/077332-black-inlay-crystal-clear-bubble-icon-business-lock6-sc48.png" alt=""/>
                    <h3>Security</h3>
                    <h1>Learn how we keep your accounts safe</h1>
                </div>
                <div className='section2Content' style={{background:"#4c68d7"}}>
                    <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/15285-200.png" alt=""/>
                    <h3>Smart Managers</h3>
                    <h1>Learn about each manager and how each boosts your accounts</h1>
                </div>
                <div className='section2Content' style={{background:"#fccc63"}}>
                    <img src="https://images.vexels.com/media/users/3/140908/isolated/preview/bdc30bbe3c022a11e2d7fd0e642c61ae-open-book-icon-by-vexels.png" alt=""/>
                    <h3>Success Stories</h3>
                    <h1>Read about what Follow You Up is doing for our users</h1>
                </div>
                <div className='section2Content' style={{background:"#bc2a8d"}}>
                    <img src="https://cdn2.iconfinder.com/data/icons/e-commerce-4/256/Searching-512.png" alt=""/>
                    <h3>Other Services</h3>
                    <h1>Latest news on our Twitter services, plus more</h1>
                </div>
            </section>
        </div>
    )
}