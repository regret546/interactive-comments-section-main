/* document.addEventListener("DOMContentLoaded", async () => {
  commentsContainer.innerHTML = "";

  let data;

  // Check if data is in localStorage
  const savedData = localStorage.getItem("commentsData");

  if (savedData) {
    // Parse and use saved data
    data = JSON.parse(savedData);
    console.log("Using saved data:", data);
  } else {
    // Fetch data from the server if not in localStorage
    try {
      const res = await axios.get("/data.json");
      data = res.data;

      // Save fetched data to localStorage
      localStorage.setItem("commentsData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Use the data (e.g., render comments)
  console.log(data);
});

const fetchData = async function () {
  commentsContainer.innerHTML = "";

  try {
    // Fetch data from the server
    const res = await axios.get("/data.json");
    const data = res.data;

    // Save fetched data to localStorage
    localStorage.setItem("commentsData", JSON.stringify(data));

    // Use the fetched data (or update UI, etc.)
    console.log(data.currentUser.username);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}; /*  */

/* fetchData();
 */
