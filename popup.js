document.addEventListener('DOMContentLoaded', function () {
  window.resizeTo(300,200)
  document.getElementById('button').addEventListener('click', function (event) {
    let accessKey = document.getElementById('accesskey').value
    let secretKey = document.getElementById('secretkey').value
    let clustername = document.getElementById('clustername').value
    let autoFillPassword = document.getElementById("checkbox").checked;
    const token = get_bearer_token(accessKey, secretKey,clustername)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if(accessKey === '' || secretKey === '' || clustername === ''){
        location.reload();
      }else{
        if(autoFillPassword){
          chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'contentScript.js'},
            function() {
              chrome.tabs.sendMessage(tabs[0].id, token);
              window.close();
            }
          );
        }else {
          document.getElementById('content_1').innerHTML += '<p>'+token+'</p>';
        }
      }
    });
  })
})
