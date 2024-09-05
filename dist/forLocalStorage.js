const savedData = localStorage.getItem("commentsData");

if (savedData) {
  try {
    data = JSON.parse(savedData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle invalid JSON here, perhaps clear localStorage or refetch data
    localStorage.removeItem("commentsData");
    // Refetch data if JSON is invalid
  }
}

removeLocalStorage = function () {
  localStorage.clear();
};

const updateCommentReply = function (commentIdToUpdate, newReply) {
  // Step 1: Retrieve and parse the existing data
  const savedDataString = localStorage.getItem("commentsData");
  if (savedDataString) {
    const savedData = JSON.parse(savedDataString);

    console.log(savedData.comments);

    // Step 2: Find the comment to update
    const commentToUpdate = savedData.comments[commentIdToUpdate - 1];

    if (commentToUpdate) {
      // Add the new reply to the replies array of the comment
      commentToUpdate.replies.push(newReply);

      // Step 3: Save the updated data back to localStorage
      localStorage.setItem("commentsData", JSON.stringify(savedData));
      console.log("Updated data saved to localStorage.");
    } else {
      console.log("Comment not found.");
    }
  } else {
    console.log("No data found in localStorage.");
  }
};

removeLocalStorage();
