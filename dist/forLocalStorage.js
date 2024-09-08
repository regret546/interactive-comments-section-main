const savedData = localStorage.getItem("commentsData");

if (savedData) {
  try {
    data = JSON.parse(savedData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle invalid JSON here, perhaps clear localStorage or refetch data
    localStorage.removeItem("commentsData");
    console.log(savedData);
    // Refetch data if JSON is invalid
  }
}

removeLocalStorage = function () {
  localStorage.clear();
};

const addCommentReply = function (commentIdToUpdate, newReply) {
  const savedDataString = localStorage.getItem("commentsData");
  if (savedDataString) {
    const savedData = JSON.parse(savedDataString);

    const commentToUpdate = savedData.comments[commentIdToUpdate - 1];

    if (commentToUpdate) {
      commentToUpdate.replies.push(newReply);

      localStorage.setItem("commentsData", JSON.stringify(savedData));
      console.log("Updated data saved to localStorage.");
    } else {
      console.log("Comment not found.");
    }
  } else {
    console.log("No data found in localStorage.");
  }
};

const updateCommentReply = function (updatedReply, commentId, replyID) {
  /*   const replyToUpdate = savedData.comments; */
  const savedDataString = localStorage.getItem("commentsData");
  if (savedDataString) {
    const savedData = JSON.parse(savedDataString);
    const replyToUpdate = savedData.comments[commentId - 1].replies[replyID];

    if (replyToUpdate) {
      replyToUpdate.content = updatedReply;
      localStorage.setItem("commentsData", JSON.stringify(savedData));
    } else {
      console.log("Reply not found");
    }
  }
};

const deleteReplyOnLocalStorage = function (commentsId, replyIdToDelete) {
  let data = JSON.parse(localStorage.getItem("commentsData"));

  let comment = data.comments[commentsId];
  console.log(replyIdToDelete);
  console.log(commentsId);

  if (comment) {
    // Filter out the reply with the given replyId
    comment.replies = comment.replies.filter(
      (reply) => reply.id !== replyIdToDelete
    );

    // Save the updated data back to localStorage
    localStorage.setItem("commentsData", JSON.stringify(data));

    console.log("Reply deleted successfully!");
  } else {
    console.log("Comment not found.");
  }
  console.log(data);
};

/* removeLocalStorage(); */
