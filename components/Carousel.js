import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const Carousel = ({images,slides = 4, size = 105, speed = 15000, autoplay = true, dots = false}) => {
    const settings = {
        dots:dots,
        infinite:true,
        autoplay:autoplay,
        speed: speed,
        autoplaySpeed: 50,
        cssEase: "linear",
        slidesToShow: slides,
        slidesToScroll: images.length,
        arrows:false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: images.length,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: images.length,
                infinite: true,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: images.length,
                infinite: true,
              }
            }
          ]
    }

    return (

            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} >
                        <Image  key={index} src={image} alt='ACM Venezuela' width={size} height={size}/>
                    </div>

                ))}
            </Slider>
     );
}

export default Carousel;