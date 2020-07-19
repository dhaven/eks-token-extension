let getToken = document.getElementById('button');

getToken.addEventListener('click', function (event) {
  let accessKey = document.getElementById('accesskey').value
  let secretKey = document.getElementById('secretkey').value
  const token = get_bearer_token(accessKey, secretKey)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'contentScript.js'},
        function() {
          chrome.tabs.sendMessage(tabs[0].id, token);
          window.close();
        });
  });
})
