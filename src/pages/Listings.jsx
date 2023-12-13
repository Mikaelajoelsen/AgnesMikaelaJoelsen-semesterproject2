import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { IoMdSearch } from "react-icons/io";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

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
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 12;

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://api.noroff.dev/api/v1/auction/listings?sort=created&sortOrder=desc"
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

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mt-10 bg-white">
      <h1 className="flex justify-start mb-4 ml-5 text-4xl font-thin text-black">
        SEARCH YOUR FAVOURITE LISTINGS
      </h1>
      <div className="flex justify-start mb-4 ml-2">
        <input
          type="text"
          placeholder="Search item..."
          className="flex w-2/3 p-2 border border-gray-600 rounded-full bg-inherit"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="flex text-xl font-bold text-black pointer-events-none bg-inherit"
          onClick={() => console.log("Performing search for:", searchTerm)}
        >
          <IoMdSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {currentListings.map((item) => (
          <div
            key={item?.id}
            className="w-full max-w-xs overflow-hidden bg-white shadow-lg rounded-t-xl hover:bg-gray-100"
          >
            <Link
              className="item-link"
              to={`/listing/${item.id}?id=${item.id}`}
            >
              <div className="relative" style={{ paddingBottom: "100%" }}>
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
              <div className="px-6 py-4 text-black">
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
      <div className="flex justify-center mt-4 mb-12">
        {filteredListings.length > listingsPerPage && (
          <div className="flex space-x-2">
            <button
              className="px-3 py-2 text-4xl font-thin text-pink-200 bg-inherit"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {<FaArrowAltCircleLeft />}
            </button>
            <button
              className="px-3 py-2 text-4xl font-thin text-pink-200 bg-inherit"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastListing >= filteredListings.length}
            >
              {<FaArrowAltCircleRight />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListingsPage;
