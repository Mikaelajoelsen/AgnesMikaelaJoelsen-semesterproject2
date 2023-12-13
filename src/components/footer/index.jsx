import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaQuestionCircle,
  FaFileAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-screen text-black border bg-rose-50/50 border-y-black">
      <div className="container flex flex-wrap justify-around py-8 mx-auto">
        <div className="w-full mb-8 md:w-1/4">
          <h3 className="mb-4 text-lg font-bold">About Us</h3>
          <p>
            Welcome to this auction site where u can explore and purchase unique
            items just for you
          </p>
        </div>
        <div className="w-full mb-8 md:w-1/4">
          <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
          <p>
            <FaEnvelope className="inline-block mr-2" /> Email: info@example.com
          </p>
          <p>
            <FaFacebook className="inline-block mr-2 hover:text-2xl hover:text-pink-400" />
            <FaGithub className="inline-block mr-2 hover:text-2xl hover:text-pink-400" />
            <FaInstagram className="inline-block mr-2 hover:text-2xl hover:text-pink-400" />
            <FaTwitter className="inline-block mr-2 hover:text-2xl hover:text-pink-400" />
          </p>
        </div>
        <div className="w-full mb-8 md:w-1/4">
          <h3 className="mb-4 text-lg font-bold">Customer Service</h3>
          <div>
            <FaQuestionCircle className="inline-block mr-2" /> FAQs
          </div>
          <p>
            <FaFileAlt className="inline-block mr-2" /> Terms and Conditions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
