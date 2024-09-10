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
    const replies = savedData.comments[commentId - 1].replies;

    if (replies) {
      replies.forEach((reply) => {
        if (reply.id === Number(replyID)) {
          reply.content = updatedReply;
          console.log("Reply successfully updated");
        }
      });
      localStorage.setItem("commentsData", JSON.stringify(savedData));
    } else {
      console.log("Reply not found");
    }
  }
};

const deleteReplyOnLocalStorage = function (commentsId, replyIdToDelete) {
  const savedDataString = localStorage.getItem("commentsData");

  if (savedDataString) {
    const savedData = JSON.parse(savedDataString);
    const comment = savedData.comments[commentsId];

    if (comment) {
      // Ensure replyIdToDelete is a number
      comment.replies = comment.replies.filter(
        (reply) => reply.id !== Number(replyIdToDelete)
      );

      localStorage.setItem("commentsData", JSON.stringify(savedData));
    } else {
      console.log("Comment not found.");
    }
  }
};
/* removeLocalStorage();
 */
