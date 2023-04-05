import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Carousel, Button, Container} from 'react-bootstrap';


function Home() {
  const navigate = useNavigate();


  return(
    

<Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="data:image/jpeg;base64,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"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Bu ne saçma hayat, bu ne serkeş hayat, bu ne dingil hayat ya?</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.medyafaresi.com/2/1280/800/storage/old/files/2017/4/5/815327/815327.jpg.webp"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>"Evcil hayvan aranıyor." Benden olur mu la? Hayvanım ama evcil değilim</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="data:image/jpeg;base64,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"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Kadının yaşı, erkeğin maaşı sorulmaz koçum! </h3>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      



    
  );
  }
  
  export default Home;