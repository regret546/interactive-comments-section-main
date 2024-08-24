document.addEventListener("dataLoaded", function () {
  /* for deleting reply of current-user */
  const deleteButtons = document.querySelectorAll("#delete-post");
  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      this.closest("#current-user-post").remove();
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

        if (editReplyContainer.classList.contains("open")) {
          editBtn.classList.remove("pointer-events-none");
          editReplyContainer.classList.remove("open");
          currentUserReplyText.setAttribute("contenteditable", "false");
        } else {
          editReplyContainer.classList.add("open");
          editBtn.classList.add("pointer-events-none");
          editBtn.classList.add("open");
          currentUserReplyText.setAttribute("contenteditable", "true");
        }

        const updateButton = document.querySelector("#updateBtn");

        updateButton.addEventListener("click", function () {
          editBtn.classList.remove("pointer-events-none");
          editBtn.classList.remove("open");
          editReplyContainer.classList.remove("open");
          currentUserReplyText.setAttribute("contenteditable", "false");
          currentUserReplyText.innerText = currentUserReplyText.textContent;
        });
      });
    });
  });
});
