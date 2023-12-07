import { useState } from "react";
import { useEffect } from "react";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("path/to/default-avatar.jpg");
  const [newAvatar, setNewAvatar] = useState(null);
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [isAvatarUpdated, setIsAvatarUpdated] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = `url("./images/login-image.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setIsChangingAvatar(true);
      setIsAvatarUpdated(false);
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

  return (
    <div className="max-w-2xl mx-auto mt-20 mb-20">
      <div className="flex items-center justify-center mb-6">
        {isChangingAvatar ? (
          <div className="flex items-center justify-center w-32 h-32 border-4 border-black rounded-full">
            <span className="text-4xl animate-spin">&#x21BB;</span>
          </div>
        ) : (
          <img
            src={avatar}
            alt="Profile"
            className="w-32 h-32 border-4 border-white rounded-full"
          />
        )}
      </div>
      <h1 className="mb-6 text-4xl font-thin text-black">YOUR PROFILE</h1>
      <div className="p-8 rounded-md shadow-md bg-rose-50/50">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Username:
          </label>
          <p className="text-gray-800">YourUsername123</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email:
          </label>
          <p className="text-gray-800">your.email@example.com</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Avatar:
          </label>
          <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
          <form onSubmit={handleSubmit}>
            <label className="block mt-2 text-sm font-bold text-gray-700">
              Upload New Avatar:
            </label>
            <input
              className="border border-black"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <button
              type="submit"
              className="px-4 py-2 mt-2 ml-10 font-thin text-black border border-black rounded-md bg-inherit hover:bg-pink-50"
            >
              Update Avatar
            </button>
          </form>
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
