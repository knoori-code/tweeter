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
    
    if ($("#tweet-field").val().length === 0) {
      return alert("The input field cannot be blank");
    }
    
    if ($("#tweet-field").val().length > 140) {
      return alert("Your tweet must be 140 characters or less");
    }
    
    const string = $(this).serialize();
    $.post("/tweets", string, function() {
      $("#tweets-container").empty();
      loadTweets();
    });
    
  });

});
