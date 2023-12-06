import Listings from "./Listings";
import { Link } from "@tanstack/react-router";
import { MdExplore } from "react-icons/md";

export default function HomePage() {
  return (
    <section>
      <div className="flex flex-col mb-12 text-white bg-black md:flex-row">
        <div className="md:w-1/2">
          <video
            className="w-full bg-transparent md:w-full backdrop-blur-sm"
            autoPlay
            loop
            muted
          >
            <source src="./images/farge.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="p-4 mt-12 md:w-1/2">
          <h1 className="flex justify-center mb-2 text-3xl font-thin">
            WELCOME TO THIS AUCTION SITE
          </h1>
          <p className="flex justify-center mb-4 text-base">
            Explore a world of exciting auctions and find unique items just for
            you.
          </p>
          <button className="flex items-center px-4 py-2 mx-auto font-bold text-white border border-white rounded-full bg-inherit">
            <Link
              to="/register"
              className="flex items-center justify-center w-full h-full text-white"
            >
              SIGN UP
            </Link>
          </button>
          <button className="flex px-4 py-2 mx-auto mt-3 font-bold text-white border border-white rounded-full bg-inherit">
            <Link
              to="/listings"
              className="flex items-center justify-center w-full h-full text-white"
            >
              <MdExplore className="mr-2" />
              EXPLORE
            </Link>
          </button>
        </div>
      </div>
      <div>
        <Listings />
      </div>
    </section>
  );
}
