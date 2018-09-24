import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import './LandingMessage.css';
// import { setInterval } from 'timers';

class LandingMessage extends Component {
    constructor(props){
        super(props)
        this.state = {
        }

    }

    render(){
        return (
            <div className="landing-message_wrapper">
                <div className='section1'>
                    <div className='section1Left'>
                        <div className='section1LeftContent'>
                            <h1>Link Riff:</h1>
                            <h1>Share Every Link</h1>
                            <h1>With One Link</h1>
                            <h3>Now with customizable layouts</h3>
                            <Link style={{textDecoration:"none"}} to="/info"><p>Learn More >></p></Link>
                        </div>
                    </div>
                    <div className='section1Right'>
                        <section className="section1RightPhone">
                            <img src="https://res.cloudinary.com/linkbranch/image/upload/v1537431879/Screen_Shot_2018-09-20_at_2.23.05_AM.png"/>
                        </section>
                    </div>
                </div>
            </div>
        )
    }

}

export default LandingMessage;