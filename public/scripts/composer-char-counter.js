// Code inside will run when DOM is ready for manipulation
$(document).ready(function () {
  $("#tweet-field").on("input", function () {
    let currentLength = $(this).val().length;
    let charsLeft = 140 - currentLength;
    console.log(charsLeft);

    if (charsLeft < 0) {
      $(".counter").css("color", "red");
      $(".counter").html(charsLeft);
    }

    if (charsLeft >= 0) {
      $(".counter").html(charsLeft);
      $(".counter").css("color", "black");
    }
  });
});
