import { API_URL } from "./../lib/constants";
import { useEffect } from "react";
import { useState } from "react";

import { useNavigate } from "@tanstack/react-router";

export default function CreatePage() {
  const navigate = useNavigate();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    url: "",
    tag: "",
    endAuctionDate: "",
  });

  useEffect(() => {
    document.body.style.backgroundImage = `url("./images/login-image.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  const createListing = (event) => {
    event.preventDefault();

    const { title, text, url, tag, endAuctionDate } = formData;
    const accessToken = localStorage.getItem("access_token");

    fetch(`${API_URL}/listings`, {
      method: "POST",
      body: JSON.stringify({
        title,
        body: text,
        tags: [tag],
        media: url,
        endAuctionDate,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.status < 300) {
        navigate({ to: "/" });
      }
    });
  };

  const previewImage = (event) => {
    const imageUrl = event.target.value;
    setImagePreviewUrl(imageUrl);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="max-w-4xl p-8 mx-auto mt-5 mb-5 rounded-md shadow-md bg-rose-50/50">
        <h1 className="mb-6 text-4xl font-thin">Create an Auction Listing</h1>

        <form onSubmit={createListing}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full p-2 mt-1 border rounded-md"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="text"
                name="text"
                className="w-full p-2 mt-1 border rounded-md"
                required
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Gallery Images
              </label>
              <input
                type="text"
                id="url"
                name="url"
                className="w-full p-2 mt-1 border rounded-md"
                onChange={previewImage}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-700"
              >
                Tag:
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                className="w-full p-2 mt-1 border rounded-md"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="endAuctionDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Auction Date:
              </label>
              <input
                type="datetime-local"
                id="endAuctionDate"
                name="endAuctionDate"
                className="w-full p-2 mt-1 border rounded-md"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Image Preview"
                  className="rounded-md max-h-32"
                />
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2 font-thin text-black border border-black rounded-md bg-inherit hover:bg-pink-50 focus:outline-none focus:ring focus:border-gray-300"
            >
              CREATE AUCTION
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
