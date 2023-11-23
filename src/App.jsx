import { Link, Outlet } from "@tanstack/react-router";

import "./App.css";

function App() {
  return (
    <>
      <header>
        <Link to="/login">Login</Link>
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
