import { useEffect, useState } from "react";

export default function ListingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://api.noroff.dev/api/v1/auction/listings"
        );

        const data = await res.json();
        console.log("DATA >>> ", data);
        setListings(data);

        setIsLoading(false);
      } catch (error) {
        console.warn("deletePost, error", error);
      }
    };
    fetchListings();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <section>
      <h1>Listings</h1>
      {listing.map((item) => {
        return <div key={item?.id}>{item?.title}</div>;
      })}
    </section>
  );
}
