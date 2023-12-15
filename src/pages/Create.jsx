import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { API_URL } from "./../lib/constants";

export default function CreatePage() {
  const navigate = useNavigate();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: [""],
    endsAt: "",
    tag: "",
  });

  const [success, setSuccess] = useState(false);
  console.log(success);

  useEffect(() => {
    document.body.style.backgroundImage = `url("/login-image.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  const createListing = async (event) => {
    event.preventDefault();

    const { title, description, media, endsAt, tag } = formData;
    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${API_URL}/listings`, {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          tags: [tag],
          media,
          endsAt,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Created Post:", responseData);

        navigate("/Mylistings");

        setFormData({
          title: "",
          description: "",
          media: [""],
          endsAt: "",
          tag: "",
        });
        setImagePreviewUrl("");

        setSuccess(true);
      } else if (response.status === 400 && responseData.errors) {
        responseData.errors.forEach((error) => {
          if (error.code === "invalid_type" && error.path[0] === "endsAt") {
            console.error("Error: endsAt is required");
          } else {
            console.error("Error:", error.message);
          }
        });
      } else {
        console.error("Error:", responseData.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const previewImage = (event) => {
    const imageUrl = event.target.value;
    setImagePreviewUrl(imageUrl);

    setFormData({
      ...formData,
      media: [imageUrl],
    });
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
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 mt-1 border rounded-md"
                required
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="media"
                className="block text-sm font-medium text-gray-700"
              >
                Gallery Images
              </label>
              <input
                type="text"
                id="media"
                name="media"
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
                htmlFor="endsAt"
                className="block text-sm font-medium text-gray-700"
              >
                End Auction Date:
              </label>
              <input
                type="datetime-local"
                id="endsAt"
                name="endsAt"
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
            </div>{" "}
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
