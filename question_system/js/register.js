$('#register_btn').on('click',function() {
    var passwd=document.getElementById("passwd").value;
    var name=document.getElementById("name").value;
    var school=document.getElementById("school").value;
    var classs=document.getElementById("class").value;
    var student_id=document.getElementById("student_id").value;
    var email=document.getElementById("email").value;
    var repeatpasswd=document.getElementById("repeatpasswd").value;
    var nickname = document.getElementById("nickname").value;
    

    var settings = {
      "async":false,
      "url": "/register",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "passwd": passwd,
        "name": name,
        "school": school,
        "class": classs,
        "student_id": student_id,
        "email": email,
        "repeatpasswd":repeatpasswd,
        "nickname":nickname
      }
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      
      alert(response)
      if (response == "註冊成功"){
        var settings = {
          "async":true,
          "url": "/login",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "student_id": student_id,
            "passwd": passwd
          },
          
        };
        $.ajax(settings).done(function (response) {
          console.log(response);
          if(response == 'teacher_login'){
            $(location).attr('href', 'index_teacher.html');
          }else{
            $(location).attr('href', 'index.html');
          }
        });
        //$(location).attr('href', 'login.html');
      }
    });

})
$(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
  var passwd=document.getElementById("passwd");
  var name=document.getElementById("name");
  var school=document.getElementById("school");
  var clas=document.getElementById("class");
  var student_id=document.getElementById("student_id");
  var email=document.getElementById("email");
  var repeatpasswd=document.getElementById("repeatpasswd");
  var nickname = document.getElementById("nickname");
  

  var settings = {
    "async":false,
    "url": "/register",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "passwd": passwd.value,
      "name": name.value,
      "school": school.value,
      "class": clas.value,
      "student_id": student_id.value,
      "email": email.value,
      "repeatpasswd":repeatpasswd.value,
      "nickname":nickname.value
    }
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    
    alert(response)
    if (response == "註冊成功"){
      console.log("jump")
      $(location).attr('href', 'login.html');
    }
  });
}
});
