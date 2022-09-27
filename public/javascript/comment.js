async function commentFormHandler(event) {
  // prevent default behavior
  event.preventDefault();
  // get the comment's text
  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();
  // get the id of the current blog post from
  // the window location
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  // after testing the comment has text,
  // post to /api/comments, passing the text and blog post id
  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Your comment can not be empty.");
  }
  console.log(comment_text, post_id);
}

document
  .querySelector(".sb-comment-form")
  .addEventListener("submit", commentFormHandler);
