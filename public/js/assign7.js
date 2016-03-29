// Author: Kewen Gu
// URL: https://kgu-cs4241-main.herokuapp.com


    function addMsg() {

      var el1 = document.getElementById('username-text');
      var el2 = document.getElementById('msgbody-text');

      if (el1.value != "" && el2.value != "") {
        var req = new XMLHttpRequest();
        req.open('POST', '/add', true);
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        req.onload = function () {
          getSID('/sid');
          getMsg('/msg');
        };
        console.log('username=' + el1.value + "&msgbody=" + el2.value);
        req.send('username=' + el1.value + "&msgbody=" + el2.value);
      }
    }

    function operation(postUrl, name) {
      var req = new XMLHttpRequest();
      req.open('POST', postUrl, true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      req.onload = function () {
        getMsg('/msg');
      };
      console.log('username=' + name);
      req.send('username=' + name);
    }

    getSID('/sid');
    getMsg('/msg');

    function getMsg(url) {
      var req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        handleRes(req);
      };

      req.open('GET', url);
      req.send();
    }

    function handleRes(req) {
      if( req.readyState !== XMLHttpRequest.DONE )
        return;

      if(req.status === 200) {
        var el = document.querySelector("#message-list");
        el.innerHTML = "";
        el.innerHTML += req.responseText;
      }
    }

    function getSID(url) {
      var req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        if(req.status === 200) {
          var el = document.querySelector("#sid");
          el.innerHTML = "Your Session ID is&nbsp";
          el.innerHTML += req.responseText;
        }
      };

      req.open('GET', url);
      req.send();
    }
