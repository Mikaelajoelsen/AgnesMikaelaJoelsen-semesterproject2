import "./index.css";

export default function LoginForm() {
  return (
    <>
      <div className="justify-center flex-1 min-h-full px-6 py-12 mx-auto mt-6 align-middle lex-col md-flex rounded-3xl bg-gray-100/50 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-5xl font-thin leading-7 tracking-tight text-center text-gray-700">
            Login
          </h2>
        </div>

        <div className="flex mt-10 md-flex sm:mx-auto sm:w-full sm:max-w px-7">
          <div className="w-96">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="flex mt-2">
                  <input
                    id="email"
                    name="email"
                    placeholder="email/username"
                    type="email"
                    autoComplete="email"
                    required
                    className="h-12 block w-full rounded-full border-0 py-1.5 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-xl sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="flex font-semibold text-grey-600 hover:text-grey-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="flex mt-2">
                  <input
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block h-12 w-full rounded-full border-0 py-1.5 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-xl sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="h-12 flex w-64 justify-center items-center rounded-full bg-zinc-500 px-3 py-1.5 text-2xl font-thin leading-6 text-white shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
                >
                  Sign in
                </button>
              </div>
              <div className="flex justify-center mt-2">
                <a
                  href="#"
                  className="flex font-semibold leading-6 text-zinc-400 hover:text-zinc-500"
                >
                  Register her
                </a>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="h-12 text-center flex w-64 justify-center items-center rounded-full bg-zinc-500 px-3 py-1.5 text-3xl font-thin leading-6 text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
