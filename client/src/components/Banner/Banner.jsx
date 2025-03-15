import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Banner1 from "..//../assets/banner1.jpeg";
import Banner2 from "..//../assets/banner2.jpeg";
import Banner3 from "..//../assets/banner3.jpeg";
import Banner4 from "..//../assets/banner4.png";

const images = [Banner1, Banner2, Banner3, Banner4];

const Banner = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto mt-[80px] rounded-lg overflow-hidden shadow-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="rounded-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
