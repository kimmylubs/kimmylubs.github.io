let input = document.getElementById("input");
let currentState = "Standby";
let Ans = 0;

function onInput(event) {
  let keyValue = event.target.textContent;
  switch (keyValue) {
    case "ON":
      currentState = "Standby";
      input.value = "";
      break;
    case "ANS":
      onNumberPress(Ans);
      break;
    case "AC":
      currentState = "Standby";
      input.value = "";
      Ans = 0;
      break;
    case "DEL":
      input.value = input.value.slice(0, -1);
      break;
    default:
      if (currentState === "Standby") {
        input.value = keyValue;
        currentState = "Input";
      } else {
        input.value += keyValue;
      }
  }
}

function onNumberPress(number) {
  if (currentState === "Standby") {
    input.value = number;
    currentState = "Input";
  } else {
    input.value += number;
  }
}

function onOperatorPress(operator) {
  if (currentState === "Input") {
    input.value += operator;
    currentState = "Operator";
  }
}

function onEqualsPress() {
  let result = eval(input.value);
  input.value = result;
  Ans = result;
  currentState = "Standby";
}

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll("button");
  buttons.forEach(function (button) {
    button.addEventListener("click", onInput);
  });
});