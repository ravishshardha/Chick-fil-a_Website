import React from 'react'
import '../css/Homepage.css'
import CarouselItem from '../components/Carousel.js';
import cowCard from '../resources/cowCard.png'
import cowSide from '../resources/cow.png'
import fullMeal from '../resources/chickenMeal.jpg'
import drinkPic from '../resources/drinkPic.jpg'
import sandwitchVideo from '../resources/clubSandwitchVid.mp4'
import Login from "./auth/Login";


export default function HomePage(){
    return (
        <div className='bodyHome'>
            <header>
                <nav className="navHome">
                    <ul className="nav-links">
                        <li><a href="/customer">ORDER NOW</a></li>
                        <li><a href="/menu">MENU</a></li>
                    </ul>
                </nav>
            </header>

            <div className='fullMeal'>
                <img src={fullMeal} alt='Full Meal' />
            </div>
        <br></br><br></br>

    {/* cow with sign image and text */}
            <div className='cowSide'>
                <img src={cowSide} alt='cow picture'/>
                <cowSideWords>
                    Scroll 4 good food.
                </cowSideWords>
            </div>
    <br></br><br></br>

    {/* drink pic  */}
            <div className='drinkPic'>
                <img src={drinkPic} alt='tea picture'/>
                <div className='drinkbox'>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    <teaHeading>
                        It's <b>THE</b> tea.
                    </teaHeading>
                    <a href="/customer">
                        <button class="comic-button">Grab that Sunjoy!</button>
                    </a>
                </div>
            </div>

            <br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br>

            <div className='clubBox'>
                <video className='clubSandVid' controls muted autoPlay playsinline loop>
                    <source src={sandwitchVideo} type='video/mp4'/>
                    Your browser does not support the video tag.
                </video>
                <div className='clubBoxBackground'>
                    <div className='rightclubBox'>
                            <br></br>
                            Whole wheat bun + lettuce + tomato + grilled chicken + colby jack cheese + bacon + whole wheat bun...<br></br><br></br>
                            <b>Yes please.</b>
                            <br></br>
                            <a href="/customer">
                                <button class="comic-button">Order now!</button>
                            </a>
                            <br></br><br></br>
                    </div>
                </div>
                <br></br><br></br>
            </div>
            <br></br><br></br><br></br>
            <br></br><br></br><br></br>
            
            <div className='titleForMerch'>
                New Chick-fil-a Merch available now!
            </div>

            <br></br><br></br><br></br>
            <CarouselItem/>
            <br></br><br></br><br></br>
            {/* cards for manager and server log-in info */}
            <div>
                <div class="cardH" id="leftCard">
                    <div class="cardH-front">
                        I'm a Manager
                    </div>
                    <div class="cardH-back">
                        <form>
                            <label for="Log-in">Please 
                            <br></br>sign in:<br></br><br></br></label>
                            <Login/>
                        </form>
                    </div>
                </div>

                <div class="cardH" id="rightCard">
                    <div class="cardH-front">
                        I'm a Server
                    </div>
                    <div class="cardH-back">
                        <form>
                            <label for="Log-in">Please
                                <br></br>sign in:<br></br><br></br></label>
                            <Login />
                        </form>
                    </div>
                </div>
            </div>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br>

            
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br>

            <div className='byeMessage'>
                It's our pleasure.
            </div>
            <div className='cowFooter'>
                <img src={cowCard} alt='cow card' />
            </div>
            
        </div>

    );
}
