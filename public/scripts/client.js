/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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

  renderTweets(tweetData);

  
});
