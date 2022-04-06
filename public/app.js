const buttons = document.querySelectorAll(".button");
const result = document.querySelector(".result");
const maxLength = 14;
var answer;
var preValue = 0;
var pre = "";
var changeValue = false;

const handleBtnClick = (event) => {
  const resultValue = Number(result.innerText.replaceAll(",", ""));
  if (event.target.value === "C") {
    window.location.reload();
  } else if (event.target.value === "T") {
    result.innerText = Number(-resultValue).toLocaleString();
  } else if (event.target.value === "B") {
    result.innerText = parseInt(resultValue / 10).toLocaleString();
    event.target.classList.toggle("clicked");
    event.target.classList.toggle("unclicked");
  }
  if (event.target.value === "=") {
    console.log(preValue, resultValue);
    answer = Calculate(preValue, resultValue, pre.value);
    result.innerText = answer;
    pre.classList.toggle("clicked");
    pre.classList.toggle("unclicked");
    pre = "";
  }
  if (String(resultValue).length < maxLength) {
    if (isNaN(event.target.value) && event.target.value !== ".") {
      if (
        event.target.value !== "C" &&
        event.target.value !== "T" &&
        event.target.value !== "="
      ) {
        if (pre !== "") {
          pre.classList.toggle("clicked");
          pre.classList.toggle("unclicked");
          result.innerText = Calculate(preValue, resultValue, pre.value);
          preValue = result.innerText;
        }
        if (pre === event.target) {
          pre.classList.toggle("clicked");
          pre.classList.toggle("unclicked");
          changeValue = false;
        }
        if (preValue != result.innerText) {
          preValue = resultValue;
        }
        pre = event.target.classList.contains("unclicked") ? event.target : "";
        event.target.classList.toggle("unclicked");
        event.target.classList.toggle("clicked");

        if (event.target.classList.contains("clicked")) {
          changeValue = true;
        }
      }
    } else {
      result.innerText = Number(
        resultValue + event.target.value
      ).toLocaleString();
      if (changeValue) {
        result.innerText = event.target.value;
        changeValue = false;
      }
    }
  }
};

const Calculate = (A, B, op) => {
  if (op === "+") {
    return (A + B).toLocaleString();
  } else if (op === "-") {
    return (A - B).toLocaleString();
  } else if (op === "*") {
    return (A * B).toLocaleString();
  } else if (op === "/") {
    return (A / B).toLocaleString();
  } else if (op === "%") {
    return (A % B).toLocaleString();
  }
};

[].forEach.call(buttons, (cols) => {
  cols.addEventListener("click", handleBtnClick);
});
