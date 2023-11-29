import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const getRandomImage = async () => {
  try {
    const response = await fetch("https://source.unsplash.com/random/800x600");
    return response.url;
  } catch (error) {
    console.warn("getRandomImage, error", error);
    return "";
  }
};

const ListingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://api.noroff.dev/api/v1/auction/listings"
        );
        const data = await res.json();

        const updatedListings = await Promise.all(
          data.map(async (item) => ({
            ...item,
            media: item?.media ? item.media : await getRandomImage(),
          }))
        );

        setListings(updatedListings);
        setFilteredListings(updatedListings);

        setIsLoading(false);
      } catch (error) {
        console.warn("fetchListings, error", error);
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = listings.filter((item) =>
      item.title.toLowerCase().startsWith(searchTerm)
    );

    setFilteredListings(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1 className="flex justify-center mb-4 text-4xl font-bold">
        All Listings
      </h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="flex w-4/6 p-2 border border-gray-600 bg-inherit"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="flex font-thin text-black border-gray-600 rounded-none bg-inherit"
          onClick={() => console.log("Performing search for:", searchTerm)}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredListings.map((item) => (
          <div
            key={item?.id}
            className="w-full max-w-xs m-4 overflow-hidden bg-white rounded shadow-lg"
          >
            <Link
              className="item-link"
              to={`/listing/${item.id}?id=${item.id}`}
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
                <p className="text-base text-gray-700">
                  Ends at: {item?.endsAt}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListingsPage;
