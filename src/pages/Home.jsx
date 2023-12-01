import Listings from "./Listings";

export default function HomePage() {
  return (
    <div>
      <div className="flex justify-center mx-4 mb-16 md:mx-24">
        <div className="flex items-center justify-center h-1/5">
          <video className="w-1/2 mb-4 rounded-t-full" controls>
            <source src="./images/video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex items-center -ml-32">
          <h1 className="text-2xl font-extrabold">
            SIGN UP TODAY AND GET 1000C TO SHOP FOR
          </h1>
        </div>
      </div>

      <section>
        <Listings />
      </section>
    </div>
  );
}
