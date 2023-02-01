/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const createTweetElement = function (tweetObj) {
    const tweetArticle = `
  <article>
    <header>
      <span>${tweetObj.user.name}</span>
      <span>${tweetObj.user.handle}</span>
    </header>
    <p class="quote">${tweetObj.content.text}</p>
    <footer>
      <span>${tweetObj.created_at}</span>
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
      renderTweets(data);
      console.log(data)
    });
  };

  // renderTweets(tweetData);

  loadTweets()

  $(".form").on("submit", function (event) {
    event.preventDefault();
    const string = $(this).serialize();
    $.post("/tweets", string);
  });
});
