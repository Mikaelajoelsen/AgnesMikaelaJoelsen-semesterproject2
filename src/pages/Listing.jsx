import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { API_URL } from "../lib/constants";

const initialListingState = {
  title: "No post found",
  body: "Nothing to see here",
  description: "Your Description",
  media: [],
  tags: [],
  created: "2023-09-28T20:32:07.084Z",
  updated: "2023-09-28T20:32:07.084Z",
  endsAt: "2023-10-01T12:00:00.000Z",
  _count: {
    bids: 1,
  },
  userId: null,
  id: null,
};

export default function ListingPage() {
  const [item, setItem] = useState(initialListingState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemId = window.location.pathname.split("/")[2];
        const accessToken = localStorage.getItem("access_token");

        const response = await fetch(`${API_URL}/listings/${itemId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          console.error(`Failed to fetch listing. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Link className="button" to={`/listing/${item.id}`}>
      <div className="flex flex-col max-w-xl mx-auto mb-6 overflow-hidden bg-white border shadow-lg rounded-m sm:flex-row">
        <div className="sm:w-1/2">
          <img className="object-cover w-full h-64" src={item?.media} alt="" />
          <p className="flex justify-center text-black">Description</p>
        </div>
        <div className="p-6 sm:w-1/2">
          <h1 className="flex justify-center mb-2 text-3xl font-bold text-black">
            {item?.title}
          </h1>
          <h3 className="flex justify-center mb-2 text-gray-500 text-l">
            Time left of Auction:
          </h3>
          <p className="flex justify-center mb-2 text-gray-500 text-l">
            dfgjdhghk
          </p>
          <h3 className="flex justify-center mb-2 text-gray-500 text-l">
            Current Bids:
          </h3>
          <p className="flex justify-center mb-2 text-gray-500 text-l">
            dfgjdhghk
          </p>
          <p className="text-gray-700">{item?.body}</p>
          <div className="flex justify-between mt-4"></div>
          <div className="flex flex-wrap justify-center space-x-3 text-black">
            <button className="flex-2">Number</button>
            <button className="flex-2">Place Bid +</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
