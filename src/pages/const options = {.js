const options = {
  method: "POST",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk2LCJuYW1lIjoiZGVtb2FndXNlciIsImVtYWlsIjoiZGVtby5wYXNzd29yZDEyMzRAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImNyZWRpdHMiOjEwMDAsIndpbnMiOltdLCJpYXQiOjE3MDA3MzMyMTd9.dRRMtuk_lBH-nkzUkkKUfGa4CwHXlXF1UL8ZFC7dExw",
  },
  body: '{"amount":300}',
};

fetch(
  "https://api.noroff.dev/api/v1/auction/listings/77ca0955-0245-49b7-96ed-60c2633dd0e2/bids",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
