// Code inside will run when DOM is ready for manipulation
$(document).ready(function () {
  $("#tweet-field").on("input", function () {
    let currentLength = $(this).val().length;
    let charsLeft = 140 - currentLength;

    let counter = document.getElementById("counter");

    if (charsLeft < 0) {
      $(counter).css("color", "red");
    }

    if (charsLeft >= 0) {
      $(counter).css("color", "black");
    }
    $(counter).html(charsLeft);
  });
});
