const commentsContainer = document.querySelector("[data-main]");

/* Get data from data.json */
const getData = async function () {
  commentsContainer.innerHTML = "";
  const res = await axios.get("/data.json");
  const commentsData = res.data.comments;
  commentsData.forEach((comment) => {
    commentSection(comment);
  });

  userScoreCounter();
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
    const replyContainer = document.querySelector(
      "[data-reply-container-template]"
    );
    const userReplyTemplateContainer = replyContainer.content.cloneNode(true);
    commentSectionContainer.append(userReplyTemplateContainer);
    userReplyData.forEach((reply) => {
      replySection(reply, userReplyTemplateContainer);
    });
  } else {
    console.log("no reply");
  }

  commentsContainer.append(commentCard);
};

/* For reply section */

const replySection = function (data, commentSectiontoAppend) {
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
  commentSectiontoAppend.append(replyCard);
};

/* For upvote and downvote */
const userScoreCounter = function () {
  const incrementBtn = document.querySelectorAll("#increment");
  incrementBtn.forEach((button) => {
    const parentContainer = button.parentElement;
    button.addEventListener("click", function () {
      const voteText = parentContainer.querySelector("p");
      const currentVote = parseInt(voteText.textContent);
      voteText.innerText = currentVote + 1;
    });
  });

  const decrementBtn = document.querySelectorAll("#decrement");
  decrementBtn.forEach((button) => {
    const parentContainer = button.parentElement;
    button.addEventListener("click", function () {
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
