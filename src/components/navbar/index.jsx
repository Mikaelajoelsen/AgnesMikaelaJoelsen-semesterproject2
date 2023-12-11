import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { IoCreateOutline } from "react-icons/io5";
import { SlLogin } from "react-icons/sl";
import { Link } from "@tanstack/react-router";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Login", href: "/login", current: false },
  { name: "Register", href: "/register", current: false },
  { name: "Listings", href: "/listings", current: false },
  { name: "Create", href: "/create", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [credits, setCredits] = useState(0);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("user_email");
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const name = localStorage.getItem("name");
        const accessToken = localStorage.getItem("access_token");

        const results = await fetch(
          `https://api.noroff.dev/api/v1/auction/profiles/${name}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-type": "application/json",
            },
          }
        );

        const data = await results.json();

        if (results.status !== 200) {
          throw new Error(data.errors[0].message);
        }

        setCredits(data.credits);
      } catch (error) {
        console.warn("error", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-black rounded-md hover:bg-pink-100 hover:text-pink-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0"></div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "text-black"
                            : "text-black hover:text-black",
                          "rounded-md px-3 py-2 text-sm font-medium flex items-center"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name === "Create" ? (
                          <>
                            <IoCreateOutline className="mr-1" />
                            {item.name}
                          </>
                        ) : item.name === "Login" ? (
                          <>
                            <SlLogin className="mr-1" />
                            {item.name}
                          </>
                        ) : (
                          item.name
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative p-1 text-black rounded-full hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    {credits}
                    <Menu.Button className="relative flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="w-6 h-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-pink-200 ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-white" : "",
                              "block px-4 py-2 text-sm text-black"
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/create"
                            className={classNames(
                              active ? "bg-white" : "",
                              "block px-4 py-2 text-sm text-black"
                            )}
                          >
                            Create
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/mylistings"
                            className={classNames(
                              active ? "bg-white" : "",
                              "block px-4 py-2 text-sm text-black"
                            )}
                          >
                            My Listings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/login"
                            onClick={logout}
                            className={classNames(
                              active ? "bg-white" : "",
                              "block px-4 py-2 text-sm text-black hover:text-pink-200"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? " text-black"
                      : "text-black hover:text-pink-300",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name === "Create" ? (
                    <>
                      <IoCreateOutline className="mr-1" />
                      {item.name}
                    </>
                  ) : item.name === "Login" ? (
                    <>
                      <SlLogin className="mr-1" />
                      {item.name}
                    </>
                  ) : (
                    item.name
                  )}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
