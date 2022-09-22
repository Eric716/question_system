$( document ).ready(function() {
    var settings = {
      "url": "/whoami",
      "method": "get",
      "timeout": 0,
  
  
    };
    $.ajax(settings).done(function (response) {
      var user_id = document.getElementsByClassName("user_id")
      if(response=="reporter"){
          
        $(".not_reporter").css("display","none");
      }
      for (var res in user_id){
        user_id[res].innerText = response
        var settings = {
          "url": "/whoami",
          "method": "get",
          "timeout": 0,
      
      
        };
      
      }
    });
});
  $('#logout_btn').on('click',function() {
    var settings = {
      "url": "/logout",
      "method": "get",
      "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
      if (response == 'logout'){
        $(location).attr('href', 'login.html');
      }
    });
  })