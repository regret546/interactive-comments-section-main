const commentsContainer = document.querySelector("[data-main]");

/* Get data from data.json */
const getData = async function () {
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

  const card = commentCardTemplate.content.cloneNode(true);
  const userName = card.querySelector("[data-username]");
  const userPostDate = card.querySelector("[user-post-date]");
  const userComment = card.querySelector("[data-user-reply]");
  const userScore = card.querySelector("[data-use-score]");
  const userPicture = card.querySelector("[data-user-profile-picture]");

  userName.innerText = data.user.username;
  userPostDate.innerText = data.createdAt;
  userComment.innerText = data.content;
  userPicture.alt = data.user.username;
  userPicture.src = `/images/avatars/image-${data.user.username}.png`;
  userScore.innerText = data.score;

  const toAppendReplyContainer = card.querySelector("#comment-section");
  if (userReplyData.length !== 0) {
    replySection(userReplyData, toAppendReplyContainer);
  } else {
    console.log("no reply");
  }
  commentsContainer.append(card);
};

/* For reply section */
const replyContainer = document.querySelector(
  "[data-reply-container-template]"
);
const replySection = function (data, card) {
  const replyCardTemplate = document.querySelector("[data-reply-template]");
  const userReplyTemplateContainer = replyContainer.content.cloneNode(true);
  card.append(userReplyTemplateContainer);
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
