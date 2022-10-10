
//--------------新增課程
$('#add_course_button').on('click',function() {
    
    var course_name=document.getElementById("course_name").value;
    var settings = {
        "async":true,
        "url": "/new_course",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "course_name": course_name,
        },
        
      };
      $.ajax(settings).done(function (response) {
          if (response == '請輸入完整資料！'){
            alert("請輸入完整資料！");
          }
          else{
            alert('新增成功');
            nowcourse()
          }
      });

  })
$(document).keypress(function(event){
  var status = $(".add_course").css("display");
  console.log(status)
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13' && status!="none"){
      var course_name=document.getElementById("course_name").value;
      var course_id=document.getElementById("course_id").value;

      if (course_name=="" && course_id =="" ){
          return
      }
  var settings = {
      "async":true,
      "url": "/new_course",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
          "course_name": course_name,
          "course_id": course_id
        },
      
    };
    $.ajax(settings).done(function (response) {

        if (response == '請輸入完整資料！'){
          alert("請輸入完整資料！");
        }else if(response == "課程重複"){
          alert("課程重複")
        }
        else{
          alert('新增成功');
          nowcourse()
        }
    });
  }
});
//--------------目前課程
$('.now_course_button').on('click',nowcourse)

$('.new_course_button').on('click',function() {
  $( "#main" ).html( "<h1>新增課程</h1>" );
  addcourse_display("show")
})


function nowcourse() {

  var settings = {
      "async":true,
      "url": "/get_course",
      "method": "get",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      
    };
    $.ajax(settings).done(function (response) {
      coursetable_display("show")
      $( "#main" ).html( "<h1>選擇課程</h1>" );
      $( "#course_table" ).html( "<tr><th>課程名稱</th></tr>" );
      console.log(response)
      for (var k in response){
        $( "#course_table" ).append( "<tr>" );
        $( "#course_table" ).append( "<td>" + "<button class='btn btn-user btn-block nav-link bg-gradient-dark classes_btn' id='"+k+"'type='button'>  <span class='text-white-50'>" + response[k]['course_name'] + "</span></a></button>" + "</td>" );
        $( "#course_table" ).append( "<tr>" );
      }
    });

}

$('.user_info_button').on('click',userinfo
);
function userinfo(){
  var settings = {
  "async":true,
  "url": "/user_info" ,
  "method": "get",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};
$.ajax(settings).done(function (response) {
console.log(response)
userinfo_display("show");
$( "#main" ).html( "<h1>個人資料</h1>" );
$( "#user_info_table" ).html( "<tr><th>暱稱</th><td>"+response["nickname"] + "</td></tr>" );
$( "#user_info_table" ).append( "<tr><th>姓名</th><td >"+response["name"] + "</td></tr>" );
$( "#user_info_table" ).append( "<tr><th>學校</th><td>"+response["school"] + "</td></tr>" );
$( "#user_info_table" ).append( "<tr><th>班級/科系</th><td>"+response["class"] + "</td></tr>" );
$( "#user_info_table" ).append( "<tr><th>學號</th><td>"+response["student_id"] + "</td></tr>" );
$( "#user_info_table" ).append( "<tr><th>E-mail</th><td>"+response["email"] + "</td></tr>" );
$( "#user_info_table" ).append( "<tr><th>身分</th><td>"+response["permission"] + "</td></tr>" )
});
}
//--------------顯示學生
$('.student_info_button').on('click',studentinfo);
function studentinfo() {
  var school=document.getElementById("school").value;
  var clas=document.getElementById("class").value;
  var student_id=document.getElementById("student_id").value;
  var settings = {
    "async":true,
    "url": "/student_info/condition",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "school": school,
      "class": clas,
      "student_id": student_id
    },
  };
  $.ajax(settings).done(function (response) {

  
  studentinfo_display("show");
  $( "#main" ).html( "<h1>學生資料</h1>" );
  $( "#student_info" ).html("<tr><td>暱稱</td><td>姓名</td><td>學校</td><td>班級/科系</td><td>學號</td><td>E-mail</td></tr>")
  var list=['nickname','name','school','class','student_id','email']
  for(var student in response){
    var string = "<tr>"
    for (var key in list){

      string += "<td>"
      string += response[student][list[key]]
      string += "</td>"
    }
    string += "</tr>"
    $( "#student_info" ).append(string)
  }
  });
}
//-------------選擇課程
$('#course_table').on('click','.classes_btn',function() {
  window.location.href = "teacher_question.html?course_id="+this.id;
})
$('#user_info_modify_btn' ).on('click',function() {
  //console.log(document.getElementById("user_info_table").getElementsByTagName("tr").length)
  for(let td=0;td<document.getElementById("user_info_table").getElementsByTagName("tr").length-1;td++ ){
    if(td == 4){
      continue
    }
    document.getElementById("user_info_table").getElementsByTagName("tr")[td].getElementsByTagName("td")[0].setAttribute("contenteditable","true")
    document.getElementById("user_info_table").getElementsByTagName("tr")[td].getElementsByTagName("td")[0].setAttribute("bgcolor","white")
  }
  user_info_modifying('show')
  $('#user_info_modify_btn').css("display","none");
})

$('#user_info_modify_cancel' ).on('click',userinfo)
$('#user_info_modify_commit' ).on('click',function() {
  let nickname = document.getElementById("user_info_table").getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML
  let name = document.getElementById("user_info_table").getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML
  let school = document.getElementById("user_info_table").getElementsByTagName("tr")[2].getElementsByTagName("td")[0].innerHTML
  let classs = document.getElementById("user_info_table").getElementsByTagName("tr")[3].getElementsByTagName("td")[0].innerHTML
  let student_id = document.getElementById("user_info_table").getElementsByTagName("tr")[4].getElementsByTagName("td")[0].innerHTML
  let email = document.getElementById("user_info_table").getElementsByTagName("tr")[5].getElementsByTagName("td")[0].innerHTML
    var settings = {

    "url": "/user_info_update" ,
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data":{
      "nickname":nickname,
      "name":name,
      "school":school,
      "class":classs,
      "student_id":student_id,
      "email":email,
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response)
    if(response =="ok"){
      alert("修改成功")
      userinfo()
    }
  })
})
function user_info_modifying(status){
  if(status == "hide"){
    $(".user_info_modifying").css("display","none");
  }else{
    $(".user_info_modifying").css("display","inline");;

  }
}
function userinfo_display(status){
  if(status == "hide"){
    $(".user_info").css("display","none");
  }else{
    $(".user_info").css("display","table");
    coursetable_display("hide")
    addcourse_display("hide")
    studentinfo_display('hide')
    user_info_modifying('hide')
  }
}
function studentinfo_display(status){
  if(status == "hide"){
    $("#student_info").css("display","none");
    $(".student_info2").css("display","none");
  }else{
    $(".student_info2").css("display","block");
    $("#student_info").css("display","table");
    coursetable_display("hide")
    addcourse_display("hide")
    userinfo_display('hide')
    user_info_modifying('hide')
  }
}
function addcourse_display(status){
  if(status == "hide"){
    $(".add_course").css("display","none");
  }else{
    $(".add_course").css("display","inline");
    coursetable_display("hide")
    userinfo_display("hide")
    studentinfo_display('hide')
    user_info_modifying('hide')
  }
}
function coursetable_display(status){
  if(status == "hide"){
    $("#course_table").css("display","none");
  }else{
    $("#course_table").css("display","table");
    userinfo_display("hide")
    addcourse_display("hide")
    studentinfo_display('hide')
    user_info_modifying('hide')
  }
}