/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $(".error").slideUp("slow");

  const createTweetElement = function (tweetObj) {
    const tweetArticle = `
  <article>
    <header>
      <span>${tweetObj.user.name}</span>
      <span>${tweetObj.user.handle}</span>
    </header>
    <p class="quote">${tweetObj.content.text}</p>
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

  const renderTweets = function (tweetArray) {
    for (const tweetObj of tweetArray) {
      let tweetArticle = createTweetElement(tweetObj);
      $("#tweets-container").append(tweetArticle);
    }
  };

  const loadTweets = function () {
    $.get("/tweets", function (data) {
      const sortedTweets = data.sort((a, b) => b.created_at - a.created_at);
      renderTweets(sortedTweets);
    });
  };

  loadTweets();

  $(".form").on("submit", function (event) {
    event.preventDefault();
    $(".error").slideUp(200);
    $(".error").empty();

    if ($("#tweet-field").val().length === 0) {
      const error1 = `<div class="error-message">The input field cannot be empty</div>`;
      $(".error").append(error1);
      $(".error").slideDown(800);
      return;
    }

    if ($("#tweet-field").val().length > 140) {
      const error2 = `<div class="error-message">The Tweet must be 140 characters or lower.  Please try again</div>`;
      $(".error").append(error2);
      $(".error").slideDown(800);
      return;
    }

    const string = $(this).serialize();
    $.post("/tweets", string, function () {
      $("#tweets-container").empty();
      loadTweets();
    });
  });
});
