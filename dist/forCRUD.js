/* for editing current user reply */
function editReply(element) {
  const currentUserReplyContainer = element.closest("#current-user-post");
  const editReplyContainer =
    currentUserReplyContainer.querySelector("#forEdit");
  const currentUserReplyText = editReplyContainer.querySelector(
    "[reply-data-user-reply]"
  );
  const editBtn = currentUserReplyContainer.querySelector("#editBtn");

  if (editReplyContainer.classList.contains("update")) {
    editBtn.classList.remove("pointer-events-none");
    editReplyContainer.classList.remove("update");
    currentUserReplyText.setAttribute("contenteditable", "false");
  } else {
    editReplyContainer.classList.add("update");
    editBtn.classList.add("pointer-events-none");
    editBtn.classList.add("update");
    currentUserReplyText.setAttribute("contenteditable", "true");
    currentUserReplyText.id = "editable-content";
  }

  // automatically place the cursor at the end of the content once //
  document.getElementById("editable-content").addEventListener(
    "click",
    function (event) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(this);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    },
    { once: true }
  );

  // for update button //
  const updateButton = currentUserReplyContainer.querySelector("#updateBtn");
  updateButton.addEventListener("click", function () {
    const commentID = updateButton.closest("#comment-section");
    const replyID = updateButton.closest("#replyContainer");
    editBtn.classList.remove("pointer-events-none");
    editBtn.classList.remove("update");
    editReplyContainer.classList.remove("update");
    currentUserReplyText.setAttribute("contenteditable", "false");
    currentUserReplyText.id = "";
    currentUserReplyText.innerText = currentUserReplyText.textContent;

    updateCommentReply(
      currentUserReplyText.textContent,
      commentID.getAttribute("data"),
      replyID.getAttribute("replyid")
    );
  });
}

/* for deleting current user reply */
const bodyElement = document.querySelector("body");
const deleteButtons = document.querySelectorAll("#delete-post");

function deleteReply(element) {
  bodyElement.classList.add("delete");

  const modal = document.querySelector("#deleteModal");
  const yesDeleteBtn = modal.querySelector("#deleteYes");
  const noDeleteBtn = modal.querySelector("#deleteNo");

  yesDeleteBtn.addEventListener("click", handleDelete);
  noDeleteBtn.addEventListener("click", handleDelete);
  const currentUserPostToDelete = element.closest("#current-user-post");
  const commentId = currentUserPostToDelete
    .closest("#comment-section")
    .getAttribute("data");
  const replyIdToDelete = currentUserPostToDelete
    .closest("#replyContainer")
    .getAttribute("replyid");

  function handleDelete(event) {
    if (event.target === yesDeleteBtn) {
      currentUserPostToDelete.remove();
      deleteReplyOnLocalStorage(commentId - 1, replyIdToDelete);
      console.log("Reply deleted.");
    } else if (event.target === noDeleteBtn) {
      console.log("Delete canceled.");
    }

    bodyElement.classList.remove("delete");
  }
}

//For Comment Reply //
const currentUserComment = function (
  replyingTo,
  comment,
  commentSectiontoAppend,
  commentID,
  numberOfReplies
) {
  if (!commentSectiontoAppend.querySelector("#reply-section")) {
    createReplySection(commentSectiontoAppend);
  }
  const replyArticleContainer =
    commentSectiontoAppend.querySelector("#reply-section");
  const replyCardTemplate = document.querySelector(
    "[data-currentuser-reply-template]"
  );
  const replyCard = replyCardTemplate.content.cloneNode(true);

  const userPicture = replyCard.querySelector(
    "[reply-data-user-profile-picture]"
  );

  const replyID = replyCard.querySelector("#replyContainer");
  replyID.setAttribute("replyid", parseInt(numberOfReplies, 10) + 1);

  const userName = replyCard.querySelector("[reply-data-username]");
  const userPostDate = replyCard.querySelector("[reply-user-post-date]");
  const userReplyingTo = replyCard.querySelector(
    "[reply-data-user-replyingto]"
  );
  const userReply = replyCard.querySelector("[reply-data-user-reply]");
  const userScore = replyCard.querySelector("[reply-data-user-score]");

  userPicture.src = `/images/avatars/image-${currentUser}.png`;
  userName.innerText = currentUser;
  userPostDate.innerText = "few seconds ago";
  userReplyingTo.innerText = `@${replyingTo}`;
  userReply.innerText = comment;
  userScore.innerText = 0;
  replyArticleContainer.append(replyCard);

  const commentIdToUpdate = commentID; // ID of the comment you want to update
  let newReply = {
    id: parseInt(numberOfReplies, 10) + 1,
    content: comment,
    createdAt: new Date(),
    score: 0,
    replyingTo: replyingTo,
    user: {
      image: {
        png: `/images/avatars/image-${currentUser}.png`,
        webp: `/images/avatars/image-${currentUser}.webp`,
      },
      username: `${currentUser}`,
    },
  };

  addCommentReply(commentIdToUpdate, newReply);
};

function postReply(element) {
  const commentSection = element.closest("#comment-section");
  const commentField = commentSection.querySelector("#comment-field");
  if (commentField) {
    console.log('The element "comment-field" exists.');
  } else {
    userCommentField(commentSection, currentUser);
  }
}

function commentReply(element) {
  const commentParentPost = element.closest("#replyContainer");
  const commentField = commentParentPost.querySelector("#comment-field");
  if (commentField) {
    console.log('The element "comment-field" exists.');
  } else {
    userReplyField(commentParentPost, currentUser);
  }
}

function send(element) {
  const commentsContainer = element.closest("#comment-section");
  const numberOfReplies = commentsContainer.getAttribute("numberofreplies");
  const commentID = commentsContainer.getAttribute("data");
  const articleElement = element.closest("#comment-field");
  const messageTextarea = articleElement.querySelector("#message");

  if (messageTextarea.value.trim() !== "") {
    const replyTo = commentsContainer.querySelector(
      "[comment-data-username]"
    ).innerText;
    currentUserComment(
      replyTo,
      messageTextarea.value,
      commentsContainer,
      commentID,
      numberOfReplies
    );
    commentsContainer.querySelector("#comment-field").remove();
  }
}

function reply(element) {
  const replyContainer = element.closest("#replyContainer");
  const replyResponse = replyContainer.querySelector("#message");
  const replyTo = replyContainer.querySelector(
    "[reply-data-username]"
  ).innerText;
  const replyParentContainer = replyContainer.closest("#comment-section");
  const commentID = replyParentContainer.getAttribute("data");
  const numberOfReplies = replyParentContainer.getAttribute("numberofreplies");
  if (replyResponse.value.trim() !== "") {
    currentUserComment(
      replyTo,
      replyResponse.value,
      replyParentContainer,
      commentID,
      numberOfReplies
    );
    replyContainer.querySelector("#message").value = "";
    replyContainer.querySelector("#comment-field").remove();
  }
}
