/* eslint-disable */
import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const { products } = useLoaderData();
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const interval = setInterval(() => {
      const totalItems = products.length;
      const newIndex = (index + 1) % totalItems;
      setIndex(newIndex);

      const carousel = carouselRef.current;
      const itemWidth = carousel?.firstChild?.offsetWidth || 0;

      // Scroll ke item berikutnya
      carousel.scrollTo({
        left: itemWidth * newIndex,
        behavior: "smooth",
      });
    }, 3000); // pindah setiap 3 detik

    return () => clearInterval(interval);
  }, [index, products]);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to <span className="text-primary">DiShop</span>
          </h1>
          <p className="mt-10 max-w-xl text-3xl leading-8 font-bold">
            Find Your Own Style !
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Carousel Otomatis */}
        <div
          ref={carouselRef}
          className="hidden lg:flex overflow-x-scroll scroll-smooth no-scrollbar bg-neutral rounded-box max-w-md space-x-4 p-4"
        >
          {products.map((item) => (
            <div
              className="carousel-item w-full flex-shrink-0 flex justify-center items-center"
              key={item._id}
            >
              <img
                src={item.image}
                className="rounded-box w-full h-auto object-contain"
                alt="product"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
