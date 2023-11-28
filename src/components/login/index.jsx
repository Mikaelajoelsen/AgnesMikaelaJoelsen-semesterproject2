import "./index.css";

export default function LoginForm() {
  return (
    <>
      <div className="flex flex-col justify-center px-4 py-6 mt-6 mb-8 bg-gray-100/50 sm:rounded-3xl sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-thin leading-9 text-center text-gray-700 sm:mt-8 sm:text-4xl">
          Login
        </h2>

        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            ></label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full h-12 px-4 mt-1 text-gray-900 placeholder-gray-400 border rounded-full shadow-sm focus:outline-none focus:ring focus:border-zinc-600 sm:text-lg"
              placeholder="email/username"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              ></label>
              <a
                href="#"
                className="text-sm font-semibold text-gray-600 hover:text-gray-500"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full h-12 px-4 mt-1 text-gray-900 placeholder-gray-400 border rounded-full shadow-sm focus:outline-none focus:ring focus:border-gray-600 sm:text-lg"
              placeholder="password"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="flex items-center justify-center w-full h-12 px-4 text-lg font-thin text-white rounded-full shadow-sm bg-zinc-500 hover:bg-gray-500 focus:outline-none focus:ring focus:border-zinc-600"
            >
              Sign in
            </button>
          </div>

          <div className="mb-2 text-center">
            <a
              href="#"
              className="text-sm font-semibold text-zinc-400 hover:text-zinc-500"
            >
              Register here
            </a>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="flex items-center justify-center w-full h-12 px-4 text-lg font-thin text-black border-black rounded-full shadow-sm hover:bg-zinc-400 focus:outline-none focus:ring focus:border-zinc-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
