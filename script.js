"use strict";

const users = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "<span class='to-reply-to'>@maxblagun </span>If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "<span class='to-reply-to'>@maxblagun </span>I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};
const body = document.querySelector("body");
const commentSection = document.querySelector(".comments");
const btnSend = document.querySelector(".btn-send");
const comment = document.querySelector(".comment-send-textarea");
const btnsReply = document.querySelectorAll(".btn-reply");
const commentContainers = document.querySelectorAll(".comment-reply-box");
let deletingBtns = document.querySelectorAll(".btn-delete");
let btnsEdit = document.querySelectorAll(".btn-edit");
const commentTextarea = document.querySelector(".comment-send-textarea");

const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => (textarea.value = ""));

const resetInputFields = function () {
  commentTextarea.value = "";
};

const generateCommentHtml = function (comment) {
  const html = `<div class="comment-reply-box" id='${comment.id}'>
    <div class="comment-container">
    <div class="vote-box">
    <button class='btn-vote'>
    <img src="images/icon-plus.svg" alt="upvote icon" />
    </button>
    <p class="vote">${comment.score}</p>
    <button class='btn-vote'>
    <img src="images/icon-minus.svg" alt="downvote icon" />
    </button>
    </div>
    <div class="comment-box">
    <div class="user-info-box">
    <div class="user-info">
    <img
    class="avatar"
    src="${comment.user.image.png}"
    alt="${comment.user.username} avatar"
    />
    
    <h3 class="user-name">${comment.user.username}</h3>
    <p class="comment-time">${comment.createdAt}</p>
    </div>
    <div class="btn-container">
    ${
      comment.user.username === users.currentUser.username
        ? `<button class="btn btn-delete">
    <img src="images/icon-delete.svg" alt="delete icon" />
    <span>Delete</span>
    </button>
    <button class="btn btn-edit">
    <img src="images/icon-edit.svg" alt="reply icon" />
    <span>Edit</span>
    </button>`
        : `<button class="btn btn-reply">
    <img src="images/icon-edit.svg" alt="reply icon" />
    <span>Reply</span>
    </button>`
    }
    
    </div>
    </div>
    <div>
    <p class="user-comment">
    ${comment.content}
    </p>
    </div>
    </div>
    </div>
    <div class="replies">
              <div class="add-comment-box add-reply comment-container hidden">
                <img
                  src="images/avatars/image-juliusomo.png"
                  alt="juliusomo avatar"
                />
                <textarea
                  type="textarea"
                  placeholder="Add a comment..."
                  class="comment-reply-textarea"
                ></textarea>
                <button class="btn btn-send-reply"><span>Reply</span></button>
              </div>
    </div>
    </div>
    </div>
    
    `;
  return html;
};

const generateHtmlReply = function (reply) {
  const { id, user, createdAt, content, score } = reply;
  const isCurrentUser = user.username === users.currentUser.username;

  return `
    <div class='splitter'></div>
    <div class="comment-reply-box" id="${id}">
      <div class="comment-container">
        <div class="vote-box">
          <button class="btn-vote">
            <img src="images/icon-plus.svg" alt="upvote icon" />
          </button>
          <p class="vote">${score}</p>
          <button class="btn-vote">
            <img src="images/icon-minus.svg" alt="downvote icon" />
          </button>
        </div>
        <div class="comment-box">
          <div class="user-info-box">
            <div class="user-info">
              <img class="avatar" src="${user.image.png}" alt="${
    user.username
  } avatar" />
              <h3 class="user-name">${user.username}</h3>
              <p class="comment-time">${createdAt}</p>
            </div>
            <div class="btn-container">
              ${
                isCurrentUser
                  ? `
                    <button class="btn btn-delete">
                      <img src="images/icon-delete.svg" alt="delete icon" />
                      <span>Delete</span>
                    </button>
                    <button class="btn btn-edit">
                      <img src="images/icon-edit.svg" alt="edit icon" />
                      <span>Edit</span>
                    </button>`
                  : `
                    <button class="btn btn-reply">
                      <img src="images/icon-edit.svg" alt="reply icon" />
                      <span>Reply</span>
                    </button>`
              }
            </div>
          </div>
          <div>
            <p class="user-comment">${content}</p>
          </div>
        </div>
      </div>
      <div class="replies">
        <div class="add-comment-box add-reply comment-container hidden">
          <img src="images/avatars/image-juliusomo.png" alt="juliusomo avatar" />
          <textarea type="textarea" placeholder="Add a comment..." class="comment-reply-textarea"></textarea>
          <button class="btn btn-send-reply"><span>Reply</span></button>
        </div>
      </div>
    </div>
  `;
};

//DISPLAY COMMENTS AND REPLIES
const displayComments = function (comments) {
  commentSection.innerHTML = "";
  const sortedComments = comments.sort((a, b) => b.score - a.score);
  sortedComments.forEach((comment) => {
    const html = generateCommentHtml(comment);
    commentSection.insertAdjacentHTML("beforeend", html);
  });
  resetInputFields();
  displayReplies(users.comments);

  sortedComments.forEach((comment) => {
    if (comment.replies.length > 0) {
      displayReplies(comment.replies, comment.id);
    }
  });
};
const displayReplies = function (comments) {
  comments.forEach((comment) => {
    if (comment?.replies?.length) {
      // Sort the replies by score in descending order
      const sortedReplies = comment.replies.sort((a, b) => b.score - a.score);
      // Initialize an empty string to store the HTML
      let repliesHTML = "";
      // Use a normal for loop to generate the HTML for each reply
      for (let i = 0; i < sortedReplies.length; i++) {
        repliesHTML += generateHtmlReply(sortedReplies[i]);
      }
      // Insert the replies HTML into the main comment container
      document.getElementById(comment.id).insertAdjacentHTML(
        "beforeend",
        `<div class="replies">
          <div class="add-comment-box add-reply comment-container hidden">
            <img src="images/avatars/image-juliusomo.png" alt="juliusomo avatar" />
            <textarea type="textarea" placeholder="Add a comment..." class="comment-reply-textarea"></textarea>
            <button class="btn btn-send-reply"><span>Reply</span></button>
          </div>
          ${repliesHTML}
        </div>`
      );
    }
  });
};

displayComments(users.comments);
/* adding a comment case 1 */
btnSend.addEventListener("click", function () {
  const text = btnSend.parentNode.querySelector(".comment-send-textarea").value;
  if (text) {
    // Calculate the new comment ID based on existing comments and replies count
    let counter = 1;
    // Loop through the comments and their replies to calculate the new comment ID
    for (let i = 0; i < users.comments.length; i++) {
      counter++; // Increment for the current comment
      counter += users.comments[i].replies.length; // Increment for each reply in the comment
    }

    // Create a new comment object
    const newComment = {
      id: counter,
      content: text,
      createdAt: "Today",
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };

    // Add the new comment to the users' comments array
    users.comments.push(newComment);

    // Display the updated comments
    displayComments(users.comments);
    // Clear the textarea
    resetInputFields();
  }
});

//HIDE REPLY BOXES
function hideAllReplyBoxes() {
  document
    .querySelectorAll(".add-comment-box.add-reply.comment-container")
    .forEach((el) => el.classList.add("hidden"));
}

// Event listener to handle clicks on the window
window.addEventListener("click", function (e) {
  const target = e.target;

  // If the click is on the main container or outside a reply box, hide all reply boxes
  if (target === document.querySelector("main")) {
    hideAllReplyBoxes();
    return;
  }

  // If the click is on a reply button, show the corresponding reply box
  const btn = target.closest(".btn-reply");
  if (btn) {
    hideAllReplyBoxes();

    // Find the comment container and show the corresponding reply box
    const commentContainer = btn.closest(".comment-reply-box");
    const replyBox = commentContainer.querySelector(
      ".add-comment-box.add-reply.comment-container"
    );
    replyBox.classList.remove("hidden");

    // Set the placeholder with the username of the person being replied to
    const repliedTo = commentContainer.querySelector(".user-name").innerText;

    replyBox.querySelector(
      "textarea"
    ).placeholder = `Reply to @${repliedTo}...`;
  }
});

//DELETE COMMENT
// Utility function to toggle the delete confirmation modal
function toggleDeleteModal(show) {
  const sectionDelete = document.querySelector(".section-delete");
  // add or remove the hidden class based on the show parameter
  sectionDelete.classList.toggle("hidden", !show);
}

// Utility function to remove the comment with the specified id
function hardDelete(arr, id) {
  // Remove replies with the specified id
  arr.forEach((comment) => {
    comment.replies = comment.replies.filter((reply) => reply.id !== id);
  });
  // Remove the main comment with the specified id
  return arr.filter((comment) => comment.id !== id);
}

// Event listener for delete actions
window.addEventListener("click", function (e) {
  const target = e.target;
  const btn = target.closest(".btn-delete");

  if (btn) {
    const commentToDelete = target.closest(".comment-reply-box");
    toggleDeleteModal(true); // Show the delete modal

    const handleYesClick = () => {
      toggleDeleteModal(false); // Hide the modal
      const id = Number(commentToDelete.getAttribute("id"));
      users.comments = hardDelete(users.comments, id);
      displayComments(users.comments); // Update displayed comments

      // Clean up event listeners
      removeDeleteListeners();
    };

    const handleNoClick = () => {
      toggleDeleteModal(false); // Hide the modal
      removeDeleteListeners();
    };

    // Helper function to remove the event listeners
    function removeDeleteListeners() {
      document
        .querySelector(".yes")
        .removeEventListener("click", handleYesClick);
      document.querySelector(".no").removeEventListener("click", handleNoClick);
    }

    // Attach event listeners for Yes and No buttons
    document.querySelector(".yes").addEventListener("click", handleYesClick);
    document.querySelector(".no").addEventListener("click", handleNoClick);
  }
});

/* EDIT */
window.addEventListener("click", function (e) {
  const target = e.target;
  const btnEdit = target.closest(".btn-edit");
  if (btnEdit) {
    const comment = btnEdit.closest(".comment-reply-box");
    let text = comment.querySelector(".user-comment").innerText;

    comment.querySelector(
      ".user-comment"
    ).parentNode.innerHTML = `<textarea class='textarea'>${text}</textarea>`;
    btnEdit.classList.remove("btn-edit");
    btnEdit.classList.add("btn-submit");
  }
});

window.addEventListener("dblclick", function (e) {
  const target = e.target;
  const btnEdit = target.closest(".btn-submit");
  if (btnEdit) {
    const commentBox = btnEdit.closest(".comment-reply-box");
    let id = Number(commentBox.getAttribute("id"));
    let textarea = commentBox.querySelector("textarea");
    for (const comment of users.comments) {
      if (comment.id === id) {
        comment.content = textarea.value;
      }
      comment.replies.forEach((reply) => {
        if (reply.id === id) {
          reply.content = textarea.value;
        }
      });
    }
    displayComments(users.comments);
  }
});

//VOTES
window.addEventListener("click", function (e) {
  const target = e.target;
  const btnVote = target.closest(".btn-vote");
  if (btnVote) {
    let type = target.getAttribute("alt");
    let id = Number(btnVote.closest(".comment-reply-box").getAttribute("id"));
    if (type === "upvote icon") {
      users.comments.map((comment) => {
        if (comment.id === id) comment.score++;
      });
      users.comments.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === id) {
            reply.score++;
          }
        });
      });

      displayComments(users.comments);
    } else {
      users.comments.map((comment) => {
        if (comment.id === id && comment.score > 0) comment.score--;
      });
      users.comments.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === id && reply.score > 0) {
            reply.score--;
          }
        });
      });

      displayComments(users.comments);
    }
  }
});

//REPLY TO COMMENT
function generateUniqueReplyId(comments) {
  let counter = 1;
  comments.forEach((comment) => {
    counter++; // Count the comment itself
    counter += comment.replies.length; // Add count of each reply
  });
  return counter;
}

// Utility function to format the current time
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `Today ${hours}:${minutes}`;
}

// Adds a new reply to the specified comment ID
function addReplyToComment(comments, commentId, replyText) {
  const uniqueId = generateUniqueReplyId(comments);
  const timestamp = getCurrentTime();

  comments.forEach((comment) => {
    if (comment.id === commentId) {
      comment.replies.push({
        id: uniqueId,
        content: `<span class='to-reply-to'>@${comment.user.username}</span> ${replyText}`,
        createdAt: timestamp,
        score: 0,
        replyingTo: comment.user.username,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      });
    }
  });
}

// Main event listener for sending replies
window.addEventListener("click", function (e) {
  const target = e.target;
  const sendReplyBtn = target.closest(".btn-send-reply");

  if (sendReplyBtn) {
    const replyText = sendReplyBtn.parentNode.querySelector("textarea").value;
    if (replyText) {
      const commentBox = sendReplyBtn.closest(".comment-reply-box");
      const commentId = Number(commentBox.getAttribute("id"));

      addReplyToComment(users.comments, commentId, replyText);

      // Update the comments display
      displayComments(users.comments);

      sendReplyBtn.parentNode.querySelector("textarea").value = "";
    }
  }
});
