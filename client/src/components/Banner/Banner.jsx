import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const images = [
  "https://via.placeholder.com/1200x400?text=Ad+1",
  "https://via.placeholder.com/1200x400?text=Ad+2",
  "https://via.placeholder.com/1200x400?text=Ad+3",
];

const Banner = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto mt-4 rounded-lg overflow-hidden shadow-lg">
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
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;