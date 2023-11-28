import { useEffect, useState } from "react";

const getRandomImage = async () => {
  try {
    const response = await fetch("https://source.unsplash.com/random/800x600");
    return response.url;
  } catch (error) {
    console.warn("getRandomImage, error", error);
    return "";
  }
};

export default function ListingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://api.noroff.dev/api/v1/auction/listings"
        );
        const data = await res.json();
        console.log("DATA >>> ", data);

        const updatedListings = await Promise.all(
          data.map(async (item) => ({
            ...item,
            media: item?.media ? item.media : await getRandomImage(),
          }))
        );

        setListings(updatedListings);

        setIsLoading(false);
      } catch (error) {
        console.warn("fetchListings, error", error);
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1 className="mb-4 text-4xl font-bold">Listings</h1>
      <div className="flex flex-wrap justify-center">
        {listings.map((item) => (
          <div
            key={item?.id}
            className="w-full max-w-sm m-4 overflow-hidden rounded shadow-lg"
          >
            <div className="relative" style={{ paddingBottom: "75%" }}>
              {item?.media && (
                <img
                  src={item?.media}
                  alt={item?.title}
                  className="absolute object-cover w-full h-full"
                  loading="lazy"
                  onError={async (e) => {
                    e.target.src = await getRandomImage();
                  }}
                />
              )}
            </div>
            <div className="px-6 py-4">
              <h2 className="mb-2 text-xl font-bold">{item?.title}</h2>
              <p className="text-base text-gray-700">{item?.description}</p>
              <p className="text-base text-gray-700">Ends at: {item?.endsAt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
