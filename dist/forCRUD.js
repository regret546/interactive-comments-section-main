document.addEventListener("dataLoaded", function () {
  /* for deleting reply */
  const deleteButtons = document.querySelectorAll("#delete-post");
  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      this.closest("#current-user-post").remove();
    });
  });
});
