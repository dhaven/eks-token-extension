chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var inputs = document.querySelectorAll("input[type='password']");
  inputs[0].focus();
  inputs[0].value=message;
  var r = inputs[0].ownerDocument.createEvent("Events");
  r.initEvent("change", !0, !0);
  inputs[0].dispatchEvent(r);
  var event = new InputEvent("input", {inputType: "insertFromPaste",bubbles: true, composed: true});
  inputs[0].dispatchEvent(event);
});
