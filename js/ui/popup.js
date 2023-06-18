document.querySelectorAll("[data-action]").forEach((actionBtn) => {
  actionBtn.addEventListener("click", async(e) => {
    const action = actionBtn.dataset.action;
    let input = actionBtn.dataset.input;
    if (input) {
      input = document.querySelector(input).value || null;
    }
    let inputSec = actionBtn.dataset.inputSecondary;
    if (inputSec) {
      inputSec = document.querySelector(inputSec).value || null;
    }
    void chrome.runtime.sendMessage({action, input, inputSec});
  });
});
