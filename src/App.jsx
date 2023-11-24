import { Link, Outlet } from "@tanstack/react-router";
import "./App.css";

function App() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 p-4 text-black bg-white">
        <nav className="flex justify-center space-x-4">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
          <Link to="/listings" className="hover:underline">
            Listings
          </Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>Created with ❤️ by Agnes</small>
      </footer>
    </>
  );
}

export default App;
