// Custom validation messages
// Set msg on 'data-validation-msg' input attribute
// -------------------------------------------------
$(function () {
  var inputs = document.getElementsByTagName("input"),
    // selectbox = document.getElementsByTagName('select'),
    inputsLen = inputs.length,
    // selectLen = selectbox.length,
    input,
    inputMsg,
    inputValidationMsg,
    label,
    button = document.getElementsByClassName("submit-btn")[0],
    form = document.getElementsByTagName("form")[0];

  // Let's hide the default validation msg as
  form.addEventListener(
    "invalid",
    function (e) {
      e.preventDefault();
    },
    true
  );

  // Validate form on submit - display tooltip if input has no value
  button.onclick = function () {
    inputsLen = inputs.length;

    while (inputsLen--) {
      if (inputs[inputsLen].value.length > 0) {
        return true;
      }
      next(inputs[inputsLen]).nextSibling.style.display = "block";
    }

    if ($("#country-selector").val()) {
      $(".custom-error").hide();
      return true;
    } else {
      $(".custom-error").show();
    }
  };

  while (inputsLen--) {
    input = inputs[inputsLen];
    label = next(input);

    if (input.hasAttribute("data-validation-msg")) {
      // Create span element for our validation msg
      inputValidationMsg = input.getAttribute("data-validation-msg");
      inputMsg = document.createElement("span");
      inputMsg.innerHTML = inputValidationMsg;

      label.parentNode.insertBefore(inputMsg, label.nextSibling);

      input.onblur = function (e) {
        // If value does not exist or is invalid, toggle validation msg
        e.target.classList.add("blur");
        next(e.target).nextSibling.style.display =
          !this.value || this.validity.valid === false ? "block" : "none";
      };
    }
  }

  $("input").focus(function () {
    $(this).parents(".form-group").addClass("focused");
  });

  $("input").blur(function () {
    $(this).parents(".form-group").removeClass("focused");
  });
});

function next(elem) {
  do {
    elem = elem.nextSibling;
  } while (elem && elem.nodeType !== 1);
  return elem;
}

$("#samplevideo").on("shown.bs.modal", function () {
  $("#video1")[0].play();
});
$("#samplevideo").on("hidden.bs.modal", function () {
  $("#video1")[0].pause();
});
