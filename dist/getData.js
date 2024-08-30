const commentsContainer = document.querySelector("[data-main]");
let currentUser;

const createReplySection = function (container) {
  const replyContainer = document.querySelector(
    "[data-reply-container-template]"
  );
  const userReplyTemplateContainer = replyContainer.content.cloneNode(true);
  container.append(userReplyTemplateContainer);
};
/* Get data from data.json */
const getData = async function () {
  commentsContainer.innerHTML = "";
  const res = await axios.get("/data.json");
  currentUser = res.data.currentUser.username;
  const commentsData = res.data.comments;
  commentsData.forEach((comment) => {
    commentSection(comment);
  });

  userScoreCounter();
  document.dispatchEvent(new Event("dataLoaded"));
};

getData();

/* For comment section */
const commentSection = function (data) {
  const userReplyData = data.replies;
  const commentCardTemplate = document.querySelector(
    "[data-user-comment-template]"
  );
  const commentCard = commentCardTemplate.content.cloneNode(true);

  const userName = commentCard.querySelector("[comment-data-username]");
  const userPostDate = commentCard.querySelector("[comment-user-post-date]");
  const userComment = commentCard.querySelector("[comment-data-user-comment]");
  const userScore = commentCard.querySelector("[comment-data-user-score]");
  const userPicture = commentCard.querySelector(
    "[comment-data-user-profile-picture]"
  );

  userName.innerText = data.user.username;
  userPostDate.innerText = data.createdAt;
  userComment.innerText = data.content;
  userPicture.alt = data.user.username;
  userPicture.src = `/images/avatars/image-${data.user.username}.png`;
  userScore.innerText = data.score;

  /*  if theres a reply it will throw to replySection function */

  if (userReplyData.length !== 0) {
    const commentSectionContainer =
      commentCard.querySelector("#comment-section");
    createReplySection(commentSectionContainer);
    userReplyData.forEach((reply) => {
      if (reply.user.username === currentUser) {
        currentReplySection(reply, commentSectionContainer);
      } else {
        replySection(reply, commentSectionContainer);
      }
    });
  }

  commentsContainer.append(commentCard);
};

/* For reply section */

const replySection = function (data, commentSectiontoAppend) {
  const replyArticleContainer =
    commentSectiontoAppend.querySelector("#reply-section");
  const replyCardTemplate = document.querySelector("[data-reply-template]");
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

  userPicture.src = `/images/avatars/image-${data.user.username}.png`;
  userName.innerText = data.user.username;
  userPostDate.innerText = data.createdAt;
  userReplyingTo.innerText = `@${data.replyingTo}`;
  userReply.innerText = data.content;
  userScore.innerText = data.score;
  replyArticleContainer.append(replyCard);
};

/* For reply section of currentUser*/
const currentReplySection = function (data, commentSectiontoAppend) {
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

  userPicture.src = `/images/avatars/image-${data.user.username}.png`;
  userName.innerText = data.user.username;
  userPostDate.innerText = data.createdAt;
  userReplyingTo.innerText = `@${data.replyingTo}`;
  userReply.innerText = data.content;
  userScore.innerText = data.score;
  replyArticleContainer.append(replyCard);
};

/* For upvote and downvote */
const userScoreCounter = function () {
  const incrementBtn = document.querySelectorAll("#increment");
  incrementBtn.forEach((button) => {
    const parentContainer = button.parentElement;
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const voteText = parentContainer.querySelector("p");
      const currentVote = parseInt(voteText.textContent);
      voteText.innerText = currentVote + 1;
    });
  });

  const decrementBtn = document.querySelectorAll("#decrement");
  decrementBtn.forEach((button) => {
    const parentContainer = button.parentElement;
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const voteText = parentContainer.querySelector("p");
      const currentVote = parseInt(voteText.textContent);
      if (currentVote === 0) {
        return;
      } else {
        voteText.innerText = currentVote - 1;
      }
    });
  });
};

/* for comment fileld */
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
