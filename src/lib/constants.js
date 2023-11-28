export const API_URL =
  import.meta.env.VITE_API_URL || "https://api.noroff.dev/api/v1/auction";

export const NAVIGATION = [
  { userMustBeLoggedIn: false, label: "Home", href: "/" },
  { userMustBeLoggedIn: true, label: "Listings", href: "/Listings" },
  { userMustBeLoggedIn: true, label: "Register", href: "/Register" },
  { userMustBeLoggedIn: true, label: "Sign out", href: "/signout" },
];
