$('#login_button').on('click',function() {
    
  var student_id=document.getElementById("student_id").value;
  var passwd=document.getElementById("password").value;
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
        if (response == 'login_fail'){
          alert("資料有誤 請重新登入");
        }else{
          alert('登入成功');
          if(response == 'teacher_login'){
            $(location).attr('href', 'index_teacher.html');
          }else if (response == "reporter_login"){
            $(location).attr('href', 'index_teacher.html');
          }
          else{
            $(location).attr('href', 'index.html');
          }
          
        }
    });

})
$(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    var student_id=document.getElementById("student_id").value;
  var passwd=document.getElementById("password").value;
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
        if (response == 'login_fail'){
          alert("資料有誤 請重新登入");
        }else{
          alert('登入成功');
          if(response == 'teacher_login'){
            $(location).attr('href', 'index_teacher.html');
          }else if (response == "reporter_login"){
            $(location).attr('href', 'index_teacher.html');
          }
          else{
            $(location).attr('href', 'index.html');
          }
          
        }
    });
  }
});
