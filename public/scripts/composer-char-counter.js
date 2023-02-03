// Code inside will run when DOM is ready for manipulation
$(document).ready(function () {
  $("#tweet-field").on("input", function () {
    const currentLength = $(this).val().length;
    const charsLeft = 140 - currentLength;
    const counter = $("#counter");

    if (charsLeft < 0) {
      counter.css("color", "red");
    }

    if (charsLeft >= 0) {
      counter.css("color", "black");
    }
    counter.html(charsLeft);
  });
});
