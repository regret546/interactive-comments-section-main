const getData = async function () {
  const res = await axios.get("/data.json");
  console.log(res.data.comments);
};

getData();

/* const replyCardTemplate = document.querySelector("[date-user-reply-template]"); */

/* for upvote */
/* const incrementBtn = document.querySelectorAll("#increment");
incrementBtn.forEach((button) => {
  const parentContainer = button.parentElement;
  button.addEventListener("click", function () {
    const voteText = parentContainer.querySelector("p");
    const currentVote = parseInt(voteText.textContent);
    voteText.innerText = currentVote + 1;
  });
}); */

/* for downvote */
/* const decrementBtn = document.querySelectorAll("#decrement");
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
 */
