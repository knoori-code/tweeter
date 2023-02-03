/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Prevent cross-site scripting by escaping input text
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Creates tweet article to be appended
  const createTweetElement = function (tweetObj) {
    const tweetArticle = `
  <article>
    <header>
      <span>
        <i class="fa-regular fa-face-smile"></i>
        <span>${tweetObj.user.name}</span>
      </span>
      <span>${tweetObj.user.handle}</span>
    </header>
    <p class="quote">${escape(tweetObj.content.text)}</p>
    <footer>
      <span>${timeago.format(tweetObj.created_at)}</span>
      <span id="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>
  `;
    return tweetArticle;
  };

  // Renders tweets to be displayed on webpage
  const renderTweets = function (tweetArray) {
    for (const tweetObj of tweetArray) {
      const tweetArticle = createTweetElement(tweetObj);
      $("#tweets-container").append(tweetArticle);
    }
  };

  // Gets tweet information from database and renders them on webpage
  const loadTweets = function () {
    $.get("/tweets", function (data) {
      const sortedTweets = data.sort((a, b) => b.created_at - a.created_at);
      renderTweets(sortedTweets);
    });
  };

  loadTweets();

  $(".form").on("submit", function (event) {
    event.preventDefault();
    $(".error").slideUp("fast");
    $(".error").empty();

    // Displays error message if textarea is left empty
    if ($("#tweet-field").val().length === 0) {
      const error1 = `<div class="error-message">The input field cannot be empty</div>`;
      $(".error").append(error1);
      $(".error").slideDown(100);
      return;
    }

    // Displays error message if user attempts to submit over 140 characters
    if ($("#tweet-field").val().length > 140) {
      const error2 = `<div class="error-message">The Tweet must be 140 characters or lower</div>`;
      $(".error").append(error2);
      $(".error").slideDown(100);
      return;
    }

    const string = $(this).serialize();
    $.post("/tweets", string, function () {
      // Clear tweet textarea and character counter
      $("#tweet-field").val("");
      $("#counter").val(140);

      $("#tweets-container").empty();
      loadTweets();
    }).fail(function () {
      const error2 = `<div class="error-message">Something went wrong with the server</div>`;
      $(".error").append(error2);
      $(".error").slideDown(100);
      return;
    });
  });
});
