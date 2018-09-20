import React, { Component } from 'react';

import LandingMessageFooter from './LandingMessageFooter.js'

import './LandingMessage.css';
// import { setInterval } from 'timers';

class LandingMessage extends Component {
    constructor(props){
        super(props)
        this.state = {
            followers:999,
        }

    }

    // componentDidMount(){
    //     this.incrementFollowers()
    // }

    // componentWillUnmount(){
    //     clearInterval(this.increment);
    // }

    // incrementFollowers = () => {
    //     this.increment = setInterval(() => {
    //         let followers = this.state.followers + 1;
    //         if(followers > 999999){
    //             followers = 999;
    //         }
    //         this.setState({
    //             followers
    //         }) 
    //     }, 10 );
    // }

    formatNumberForThousands = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render(){
        return (
            <div className="landing-message_wrapper">
                <div className='section1'>
                    <div className='section1Left'>
                        <div className='section1LeftContent'>
                            <h1>Discover Your Next Level Of</h1>
                            <h1>Social Media Managment</h1>
                            <h3>Introducing all-new, hands-off, smart automation</h3>
                            <p>Learn More >></p>
                        </div>
                    </div>
                    <div className='section1Right'>
                        <div>
                            <h2>Followers</h2>
                            <p>{this.formatNumberForThousands(this.state.followers)}</p>
                        </div>
                        <img src="https://360studio.org/spacery/Westerplattedata/graphics/alpo.start.screen-v1.0.5/_3.gif" alt="" />
                    </div>
                </div>
                < LandingMessageFooter />
            </div>
        )
    }

}

export default LandingMessage;