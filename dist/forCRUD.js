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
  });
});
