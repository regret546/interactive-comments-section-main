document.addEventListener("dataLoaded", function () {
  const userCommentField = function (lastComment, user) {
    const commentFieldCardTemplate = document.querySelector(
      "[data-user-comment-field]"
    );

    const commentField = commentFieldCardTemplate.content.cloneNode(true);
    const userProfile = commentField.querySelector("[data-currentuser]");

    userProfile.src = `/images/avatars/image-${currentUser}.png`;

    lastComment.append(commentField);
  };
  const allComment = document.querySelectorAll("#comment-section");
  const lastComment = allComment[allComment.length - 1];
  userCommentField(lastComment, currentUser);
});
