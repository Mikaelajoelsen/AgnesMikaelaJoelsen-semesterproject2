import { useEffect, useState } from "react";

const MyListingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      const userName = localStorage.getItem("name");
      const accessToken = localStorage.getItem("access_token");
      try {
        const res = await fetch(
          `https://api.noroff.dev/api/v1/auction/profiles/${userName}/listings?sort=created&sortOrder=desc`,
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setListings(data);
        } else {
          console.warn("API response is not an array:", data);
          setListings([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("fetchListings, error:", error);
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="flex justify-center text-4xl font-thin text-black">
        Your Listings
      </h1>
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="w-full max-w-xs overflow-hidden bg-white shadow-lg rounded-t-xl"
          >
            <div className="relative" style={{ paddingBottom: "100%" }}>
              <img
                src={listing.media[0]}
                alt={listing.title}
                className="absolute object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="px-6 py-4 text-black">
              <h2 className="mb-2 text-xl font-bold">{listing.title}</h2>
              <p className="text-base text-gray-700">{listing.description}</p>
              <p className="text-base text-gray-700">
                Ends at: {new Date(listing.endsAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListingsPage;
