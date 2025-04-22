import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const MyCarousel = () => (
  <div className="object-cover h-[600px] rounded-xl">
    <Carousel autoPlay infiniteLoop showThumbs={false}>
      <div>
        <img
          src="/images/p8.jpg"
          className="object-cover h-[600px] rounded-xl"
          alt="Slide 1"
        />
        <p className="legend">Slide 1</p>
      </div>
      <div>
        <img
          src="/images/p6.jpg"
          className="object-cover h-[600px] rounded-xl"
          alt="Slide 2"
        />
        <p className="legend">Slide 2</p>
      </div>
      <div>
        <img
          src="/images/p9.webp"
          className="  object-fill h-[600px] rounded-xl"
          alt="Slide 3"
        />
        <p className="legend">Slide 3</p>
      </div>
      <div>
        <img
          src="/images/p10.webp"
          className="  object-fill h-[600px] rounded-xl"
          alt="Slide 3"
        />
        <p className="legend">Slide 3</p>
      </div>
      <div>
        <img
          src="/images/p11.webp"
          className="  object-fill h-[600px] rounded-xl"
          alt="Slide 3"
        />
        <p className="legend">Slide 3</p>
      </div>
      <div>
        <img
          src="/images/p12.webp"
          className="  object-fill h-[600px] rounded-xl"
          alt="Slide 3"
        />
        <p className="legend">Slide 3</p>
      </div>
    </Carousel>
  </div>
);

export default MyCarousel;
