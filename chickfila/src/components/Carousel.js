import Carousel from 'react-bootstrap/Carousel';
import React from 'react'
import saucePeople from '../resources/saucePeople.png'
import greenSauce from '../resources/green.jpg'
import blueSauce from '../resources/blue.jpg'
import purpleSauce from '../resources/purple.jpg'
import whiteSauce from '../resources/white.jpg'
import orangeSauce from '../resources/orange.jpg'
import yellowSauce from '../resources/yellow.jpg'
import redSauce from '../resources/red.jpg'

import '../css/Carousel.css'

function CarouselItem() {
    return (
        <Carousel>
            <Carousel.Item interval={3000}>
                <img className="people" src={saucePeople} alt="Second slide" />
            </Carousel.Item>

            <Carousel.Item interval={3000}>
                <img className="d-block w-100" src={greenSauce} alt="Third slide" />
            </Carousel.Item>

            <Carousel.Item interval={3000}>
                <img className="d-block w-100" src={blueSauce} alt="Fourth slide" />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img className="d-block w-100" src={purpleSauce} alt="Fifth slide" />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img className="d-block w-100" src={redSauce} alt="Sixth slide" />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img className="d-block w-100" src={orangeSauce} alt="Seventh slide" />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img className="d-block w-100" src={yellowSauce} alt="Eigth slide" />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img className="d-block w-100" src={whiteSauce} alt="Ninth slide" />
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselItem;