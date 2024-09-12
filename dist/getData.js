const commentsContainer = document.querySelector("[data-main]");
let currentUser;

document.addEventListener("DOMContentLoaded", async () => {
  commentsContainer.innerHTML = "";

  let data;
  const savedData = localStorage.getItem("commentsData");

  if (savedData) {
    data = JSON.parse(savedData);
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
  currentUser = data.currentUser.username;
  const commentsData = data.comments;
  commentsData.forEach((comment) => {
    commentSection(comment);
  });
  const currentData = JSON.parse(localStorage.getItem("commentsData"));
  document.dispatchEvent(new Event("dataLoaded"));
});

/* For comment section */
const commentSection = function (data) {
  const userReplyData = data.replies;
  const commentCardTemplate = document.querySelector(
    "[data-user-comment-template]"
  );
  const commentCard = commentCardTemplate.content.cloneNode(true);

  const rootElement = commentCard.querySelector("section");

  const userName = commentCard.querySelector("[comment-data-username]");
  const userPostDate = commentCard.querySelector("[comment-user-post-date]");
  const userComment = commentCard.querySelector("[comment-data-user-comment]");
  const userScore = commentCard.querySelector("[comment-data-user-score]");
  const userPicture = commentCard.querySelector(
    "[comment-data-user-profile-picture]"
  );

  userName.innerText = data.user.username;
  userPostDate.innerText = getRelativeTime(data.createdAt);
  userComment.innerText = data.content;
  userPicture.alt = data.user.username;
  userPicture.src = `/images/avatars/image-${data.user.username}.png`;
  userScore.innerText = data.score;

  /* If there's a reply, it will call the replySection function */
  if (userReplyData.length !== 0) {
    const commentSectionContainer =
      commentCard.querySelector("#comment-section");

    userReplyData.forEach((reply) => {
      if (reply.user.username === currentUser) {
        currentReplySection(reply, commentSectionContainer, reply.id);
      } else {
        replySection(reply, commentSectionContainer, reply.id);
      }
    });
  }

  rootElement.setAttribute("data", `${data.id}`);
  rootElement.setAttribute("numberOfReplies", `${userReplyData.length}`);
  commentsContainer.append(commentCard);
};

/* For reply section */

const replySection = function (data, commentSectiontoAppend, replyID) {
  const replyArticleContainer =
    commentSectiontoAppend.querySelector("#reply-section");
  const replyCardTemplate = document.querySelector("[data-reply-template]");
  const replyCard = replyCardTemplate.content.cloneNode(true);

  const rootElement = replyCard.querySelector("#replyContainer");

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

  userPicture.src = `/images/avatars/image-${data.user.username}.png`;
  userName.innerText = data.user.username;
  userPostDate.innerText = data.createdAt;
  userReplyingTo.innerText = `@${data.replyingTo}`;
  userReply.innerText = data.content;
  userScore.innerText = data.score;
  rootElement.setAttribute("replyId", `${replyID}`);
  replyArticleContainer.append(replyCard);
};

/* For reply section of currentUser*/
const currentReplySection = function (data, commentSectiontoAppend, replyID) {
  const replyArticleContainer =
    commentSectiontoAppend.querySelector("#reply-section");
  const replyCardTemplate = document.querySelector(
    "[data-currentuser-reply-template]"
  );
  const replyCard = replyCardTemplate.content.cloneNode(true);

  const rootElement = replyCard.querySelector("#replyContainer");

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

  userPicture.src = `/images/avatars/image-${data.user.username}.png`;
  userName.innerText = data.user.username;
  userPostDate.innerText = getRelativeTime(`${data.createdAt}`);
  userReplyingTo.innerText = `@${data.replyingTo}`;
  userReply.innerText = data.content;
  userScore.innerText = data.score;
  rootElement.setAttribute("replyId", `${replyID}`);
  replyArticleContainer.append(replyCard);
};

/* For upvote and downvote */
function upVote(element) {
  const parentContainer = element.parentElement;
  const voteText = parentContainer.querySelector("p");
  const currentVote = parseInt(voteText.textContent);
  voteText.innerText = currentVote + 1;

  if (parentContainer.querySelector("[comment-data-user-score]")) {
    updateVoteCommentOnLocalStorage(parentContainer, currentVote + 1);
  } else {
    updateVoteReplyOnLocalStorage(parentContainer, currentVote + 1);
  }
}

function downVote(element) {
  const parentContainer = element.parentElement;
  const voteText = parentContainer.querySelector("p");
  const currentVote = parseInt(voteText.textContent);
  if (currentVote === 0) {
    return;
  } else {
    voteText.innerText = currentVote - 1;
  }

  if (parentContainer.querySelector("[comment-data-user-score]")) {
    updateVoteCommentOnLocalStorage(parentContainer, currentVote - 1);
  } else {
    updateVoteReplyOnLocalStorage(parentContainer, currentVote - 1);
  }
}

/* for comment field */
const userCommentField = function (comment, user) {
  const commentFieldCardTemplate = document.querySelector(
    "[data-user-comment-field]"
  );

  const commentField = commentFieldCardTemplate.content.cloneNode(true);
  const userProfile = commentField.querySelector("[data-currentuser]");
  userProfile.src = `/images/avatars/image-${currentUser}.png`;
  comment.append(commentField);
};

document.addEventListener("dataLoaded", function () {
  const allComment = document.querySelectorAll("#comment-section");
  const lastComment = allComment[allComment.length - 1];
  userCommentField(lastComment, currentUser);
});

/* for reply field */
const userReplyField = function (comment, user) {
  const replyFieldCardTemplate = document.querySelector(
    "[data-user-reply-field]"
  );

  const commentField = replyFieldCardTemplate.content.cloneNode(true);
  const userProfile = commentField.querySelector("[data-currentuser]");
  userProfile.src = `/images/avatars/image-${currentUser}.png`;
  comment.append(commentField);
};
