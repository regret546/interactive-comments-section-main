document.addEventListener("dataLoaded", function () {
  /* for deleting reply of current-user */
  const bodyElement = document.querySelector("body");
  const deleteButtons = document.querySelectorAll("#delete-post");

  // Outer Delete Button //
  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      bodyElement.classList.add("delete");
      // For Inner Delete Button //
      const modal = document.querySelector("#deleteModal");
      const yesDeleteBtn = modal.querySelector("#deleteYes");
      const noDeleteBtn = modal.querySelector("#deleteNo");

      //Option to proceed to delete or no//
      yesDeleteBtn.addEventListener("click", handleDelete);
      noDeleteBtn.addEventListener("click", handleDelete);
      const currentUserPostToDelete = this.closest("#current-user-post");

      function handleDelete(event) {
        if (event.target === yesDeleteBtn) {
          // If the 'Yes' button is clicked
          currentUserPostToDelete.remove();
          console.log("Post deleted.");
        } else if (event.target === noDeleteBtn) {
          // If the 'No' button is clicked
          console.log("Delete canceled.");
        }

        bodyElement.classList.remove("delete");
      }
    });
  });

  /* for updating reply of current-user */
  const editButtons = document.querySelectorAll("#editBtn");
  editButtons.forEach((editBtn) => {
    editBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const currentUserReplyContainer = this.closest("#current-user-post");
      const editReplyContainer =
        currentUserReplyContainer.querySelector("#forEdit");
      const currentUserReplyText = editReplyContainer.querySelector(
        "[reply-data-user-reply]"
      );

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
      const updateButton = document.querySelector("#updateBtn");
      updateButton.addEventListener("click", function () {
        editBtn.classList.remove("pointer-events-none");
        editBtn.classList.remove("update");
        editReplyContainer.classList.remove("update");
        currentUserReplyText.setAttribute("contenteditable", "false");
        currentUserReplyText.id = "";
        currentUserReplyText.innerText = currentUserReplyText.textContent;
      });
    });
  });

  /* for creating reply of current-user */

  //For Comment Reply //
  const currentUserComment = function (
    replyingTo,
    comment,
    commentSectiontoAppend
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
    const userName = replyCard.querySelector("[reply-data-username]");
    const userPostDate = replyCard.querySelector("[reply-user-post-date]");
    const userReplyingTo = replyCard.querySelector(
      "[reply-data-user-replyingto]"
    );
    const userReply = replyCard.querySelector("[reply-data-user-reply]");
    const userScore = replyCard.querySelector("[reply-data-user-score]");

    userPicture.src = `/images/avatars/image-${currentUser}.png`;
    userName.innerText = currentUser;
    userPostDate.innerText = "1 min ago";
    userReplyingTo.innerText = replyingTo;
    userReply.innerText = comment;
    userScore.innerText = 0;
    replyArticleContainer.append(replyCard);
  };

  const commentReply = document.querySelectorAll("#comment-reply");
  commentReply.forEach((reply) => {
    reply.addEventListener("click", function () {
      const commentSection = reply.closest("#comment-section");
      const commentField = commentSection.querySelector("#comment-field");
      if (commentField) {
        console.log('The element "comment-field" exists.');
      } else {
        userCommentField(commentSection, currentUser);
      }
    });
  });

  const allCommentsContainer = document.querySelectorAll("#comment-section");
  allCommentsContainer.forEach((commentsContainer) => {
    commentsContainer.addEventListener("click", function (event) {
      if (event.target.id === "sendBtn") {
        const commentResponse =
          commentsContainer.querySelector("#message").value;
        const replyTo = commentsContainer.querySelector(
          "[comment-data-username]"
        ).innerText;
        console.log(commentsContainer);

        currentUserComment(replyTo, commentResponse, commentsContainer);
      }
    });
  });
});
