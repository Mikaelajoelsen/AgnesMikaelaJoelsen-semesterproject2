import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [isAvatarUpdated, setIsAvatarUpdated] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    document.body.style.backgroundImage = `url("/login-image.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";

    const userName = window.localStorage.getItem("name");
    const fetchUserProfile = async (userName) => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/auction/profiles/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        console.log(data);

        setAvatar(data.avatar);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile(userName);
    console.log(profileData);
    return;
  }, []);

  const handleAvatarChange = (e) => {
    const input = e.target.value;
    setIsChangingAvatar(true);
    setIsAvatarUpdated(false);

    if (input.startsWith("http") || input.startsWith("https")) {
      setNewAvatar(input);
    } else {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewAvatar(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newAvatar) {
      setAvatar(newAvatar);
      setIsAvatarUpdated(true);
    }
    setNewAvatar(null);
    setIsChangingAvatar(false);
  };

  console.log(profileData);
  return (
    <div className="max-w-2xl px-4 mx-auto mt-20 mb-20">
      <div className="flex items-center justify-center mb-6">
        {isChangingAvatar ? (
          <div className="flex items-center justify-center w-32 h-32 border-4 border-black rounded-full">
            <FaSpinner className="text-4xl animate-spin" />
          </div>
        ) : (
          <div className="w-32 h-32">
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            ) : (
              <CiUser className="w-full h-full text-black-50/50" />
            )}
          </div>
        )}
      </div>
      <h1 className="mb-6 text-2xl font-thin text-black md:text-4xl">
        YOUR PROFILE
      </h1>
      <div className="p-4 rounded-md shadow-md md:p-8 bg-rose-50/50">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-black">
            Username:
          </label>
          <p className="text-black">{profileData?.name}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-black">
            Email:
          </label>
          <p className="text-gray-800">{profileData?.email}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-black">
            Avatar:
          </label>
          <div className="flex flex-col items-center md:flex-row">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-16 h-16 mb-2 rounded-full md:mr-4"
              />
            ) : (
              <CiUser className="w-16 h-16 mb-2 text-black md:mr-4" />
            )}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="text-sm font-bold text-black">
                Upload New Avatar (URL or File):
              </label>
              <div className="flex flex-col items-center md:flex-row">
                <input
                  className="w-full px-2 py-1 mb-2 border border-black md:mb-0 md:mr-2"
                  type="text"
                  placeholder="Enter URL or choose a file"
                  onChange={handleAvatarChange}
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-thin text-black border border-black rounded-md md:w-auto bg-inherit hover:bg-pink-50"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          {isAvatarUpdated && (
            <div className="mt-2 text-green-500">
              Avatar updated successfully! &#x2713;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
