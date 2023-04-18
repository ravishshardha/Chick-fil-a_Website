import React from 'react'
import '../css/Homepage.css'
import cowCard from '../resources/cowCard.png'
import cowSide from '../resources/cow.png'


export default function HomePage(){
    return (
        <div className='bodyHome'>
        <header>
            <nav className="navHome">
                <ul className="nav-links">
                    <li><a href="/manager">Manager</a></li>
                    <li><a href="/server">Server</a></li>
                    <li><a href="/customer">Order Now</a></li>
                    <li><a href="/menu">Menu</a></li>
                </ul>
            </nav>
        </header>
        <br></br>
{/* cards for manager and server log-in info */}
        <div>
            <div class="cardH" id="leftCard">
                <div class="cardH-front">
                    I am a Manager
                </div>
                <div class="cardH-back">
                    <form>
                        <label for="Username">Username:</label>
                        <input type="text" id="username-manager" name="username" placeholder="Enter your username"/>
                        <label for="Password">Password:</label>
                        <input type="password" id="password-manager" name="password" placeholder="Enter your password"/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            
            <div class="cardH" id="rightCard">
                <div class="cardH-front">
                    I am a Server
                </div>
                <div class="cardH-back">
                    <form>
                        <label for="Username">Username:</label>
                        <input type="text" id="username-server" name="username" placeholder="Enter your username" />
                        <label for="Password">Password:</label>
                        <input type="password" id="password-server" name="password" placeholder="Enter your password" />
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        </div>

        <br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br>
{/* cow with sign image and text */}
        <div className='cowSide'>
            <img src={cowSide} alt='cow with sign' />
            <h1Home>
                hello here is text
            </h1Home>
        </div>
        
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br>



        <div className='cowFooter'>
            <img src={cowCard} alt='cow card' />
        </div>
        </div>
    );
}
