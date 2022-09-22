$( document ).ready(function() {
    var data = getUrlVars()
    course_id = data["course_id"];
    var settings = {
        "url": "/trans_course/"+course_id,
        "method": "get",
        "timeout": 0,

      };
      $.ajax(settings).done(function (response) {
        var class_name = document.getElementById("class_name")
        class_name.innerText = response
        var redirect = document.getElementById("redirect")
        redirect.href += "?course_id="
        redirect.href += course_id
        //console.log(redirect.href )
      });
      var in_course_status = ""
      console.log(document.getElementsByClassName("user_id"))


      
});
//-------------取殼課程ID
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//--------------顯示學生
$('.student_if_in_course').on('click',function() {

  var course_id = getUrlVars()["course_id"]
  var column_name = "按鈕"
  var button_name = ""
  button_id = this.id
  if(button_id == "in_course_button"){
    in_course_status = "in_course"
    column_name = "按鈕"
    button_name = "移出此課程"
    button_class = 'remove_student'
  }else if (button_id == "not_in_course_button"){
    in_course_status = "not_in_course"
    column_name = "按鈕"
    button_name = "加入此課程"
    button_class = 'add_student'
  }

  var school=document.getElementById("school").value;
  var clas=document.getElementById("class").value;
  var student_id=document.getElementById("student_id").value;
  var settings = {
    "async":true,
    "url": "/student_info/"+in_course_status,
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "school": school,
      "class": clas,
      "student_id": student_id,
      "course_id":course_id,
      "status":in_course_status
    },
  };
  $.ajax(settings).done(function (response) {
  studentinfo_display("show");
  $( "#main" ).html( "<h1>學生資料</h1>" );
  $( "#student_info" ).html("<tr><th>" + column_name + "</th><th>暱稱</th><th>姓名</th><th>學校</th><th>班級/科系</th><th>學號</th><th>E-mail</th></tr>")
  var list=['nickname','name','school','class','student_id','email']
  for(var student in response){
    var string = "<tr><td><button class='"+button_class+"' id='"+student+"'type='button'>"+ button_name + "</button></td>"
    for (var key in list){

      string += "<td>"
      string += response[student][list[key]]
      string += "</td>"
    }
    string += "</tr>"
    $( "#student_info" ).append(string)
  }
  });
});

// --------------刪除課程
$('#student_info').on('click','.remove_student',function() {
  
  var student_id = this.id
  var data = getUrlVars()
  var course_id = data["course_id"];

  var in_course_status = "in_course"
  var column_name = "按鈕"
  var button_name = "移出此課程"
  var button_class = 'remove_student'
  var school=document.getElementById("school").value;
  var clas=document.getElementById("class").value;
  var student_id_con=document.getElementById("student_id").value;

  var settings = {
    "url": "/course_selection/remove",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "school": school,
      "class": clas,
      "course_id": course_id,
      "student_id": student_id,
      "status":in_course_status,
      "student_id_con": student_id_con,
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response)
      studentinfo_display("show");
      $( "#main" ).html( "<h1>學生資料</h1>" );
      $( "#student_info" ).html("<tr><td>" + column_name + "</td><td>暱稱</td><td>姓名</td><td>學校</td><td>班級/科系</td><td>學號</td><td>E-mail</td></tr>")
      var list=['nickname','name','school','class','student_id','email']
      for(var student in response){
        var string = "<tr><td><button class='"+button_class+"' id='"+student+"'type='button'>"+ button_name + "</button></td>"
        for (var key in list){
    
          string += "<td>"
          string += response[student][list[key]]
          string += "</td>"
        }
        string += "</tr>"
        $( "#student_info" ).append(string)
      }
    ;
  })
})
// --------------新增學生
$('#student_info').on('click','.add_student',function() {

  var student_id = this.id
  var data = getUrlVars()
  var course_id = data["course_id"];

  var in_course_status = "not_in_course"
  var column_name = "按鈕"
  var button_name = "加入此課程"
  var button_class = 'add_student'
  var school=document.getElementById("school").value;
  var clas=document.getElementById("class").value;
  var student_id_con=document.getElementById("student_id").value;

  var settings = {
    "url": "/course_selection/add",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "school": school,
      "class": clas,
      "course_id": course_id,
      "student_id": student_id,
      "status":in_course_status,
      "student_id_con": student_id_con,
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response)
      studentinfo_display("show");
      $( "#main" ).html( "<h1>學生資料</h1>" );
      $( "#student_info" ).html("<tr><td>" + column_name + "</td><td>暱稱</td><td>姓名</td><td>學校</td><td>班級/科系</td><td>學號</td><td>E-mail</td></tr>")
      var list=['nickname','name','school','class','student_id','email']
      for(var student in response){
        var string = "<tr><td><button class='"+button_class+"' id='"+student+"'type='button'>"+ button_name + "</button></td>"
        for (var key in list){
    
          string += "<td>"
          string += response[student][list[key]]
          string += "</td>"
        }
        string += "</tr>"
        $( "#student_info" ).append(string)
      }
    ;
  })
})


$('.get_guidance_btn').on('click',get_guidance);
function get_guidance() {
  guidance_table_display('show');
  $(".guidance").css("display","inline");
  var data = getUrlVars()
  course_id = data["course_id"];
  
  var settings = {
    "url": "/guidance/get",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "course_id": course_id
    }
  };
  
  $.ajax(settings).done(function (response) {
    $( "#main" ).html( "<h1>指導句列表</h1>" );
    $( "#guidence_table" ).html("<tr> <th>EN_description</th> <th>EN_example</th><th>CN_description</th> <th>CN_example</th><tr>")
    var list=['EN_description','EN_example','CN_description','CN_example']
    for(var student in response){
      var string = "<tr>"
      for (var key in list){

        string += "<td>"
        string += response[student][list[key]]
        string += "</td>"
      }
      string += "</tr>"
      $( "#guidence_table" ).append(string)
    }
    });
}
$('.add_guidance_btn').on('click',function() {
  add_guidance_display('show')
})
$('.add_question').on('click',function() {
  $( "#main" ).html( "<h1>要求出題</h1>" );
  add_question_display('show')
})
$('#adding_guidance_button').on('click',function() {    
  var EN_description=document.getElementById("EN_description").value;
  var CN_description=document.getElementById("CN_description").value;
  var EN_example=document.getElementById("EN_example").value;
  var CN_example=document.getElementById("CN_example").value;
  console.log(EN_description)
  var data = getUrlVars()
  course_id = data["course_id"];
var settings = {
    "async":true,
    "url": "/guidance/add",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "EN_description": EN_description,
      "CN_description": CN_description,
      "EN_example": EN_example,
      "CN_example": CN_example,
      "course_id": course_id,
    },
    
  };
  $.ajax(settings).done(function (response) {
      if (response == '請輸入完整資料！'){
        alert("請輸入完整資料！");
      }
      else{
        alert('新增成功');
        get_guidance();
      }
  });

})
$('#adding_question').on('click',function() { 
  var course_id = getUrlVars()["course_id"]
  var hashtagA=document.getElementById("hashtagA").value;
  var hashtagB=document.getElementById("hashtagB").value;
  var hashtagC=document.getElementById("hashtagC").value;
  var radarA=document.getElementById("radarA").value;
  var radarB=document.getElementById("radarB").value;
  var radarC=document.getElementById("radarC").value;
  var radarD=document.getElementById("radarD").value;
  var radarE=document.getElementById("radarE").value;
  var settings = {
    "url": "/adding_question",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "course_id":course_id,
      "hashtagA": hashtagA,
      "hashtagB": hashtagB,
      "hashtagC": hashtagC,
      "radarA": radarA,
      "radarB":radarB,
      "radarC": radarC,
      "radarD":radarD,
      "radarE": radarE,
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response)
    if (response == '請輸入完整資料！'){
      alert("請輸入完整資料！");
    }
    else{
      alert('新增成功');

    }
  })
})

$(".list_question").on('click',function() {
  $( "#main" ).html( "<h1>已要求出題</h1>" );
  list_question_display('show');
  var data = getUrlVars()
  course_id = data["course_id"];
  var settings = {
    "async":true,
    "url": "/listing_question",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "course_id":course_id,

    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response)

  $( "#question_info" ).html("<tr><th>課程名稱</th><th>hashtagA</th><th>hashtagB</th><th>hashtagC</th><th>radarA</th><th>radarB</th><th>radarC</th><th>radarD</th><th>radarE</th></tr>")
  var list=['course_name','hashtagA','hashtagB','hashtagC','radarA','radarB','radarC','radarD','radarE']
  for(var student in response){
    var string = ""
    for (var key in list){

      string += "<td>"
      string += response[student][list[key]]
      string += "</td>"
    }
    string += "</tr>"
    $( "#question_info" ).append(string)
  }  
})
});

function studentinfo_display(status){
  if(status == "hide"){
    $("#student_info").css("display","none");
    $(".student_info2").css("display","none");
  }else{
    $(".student_info2").css("display","block");
    $("#student_info").css("display","table");
    userinfo_display('hide')
    guidance_table_display('hide')
    add_guidance_display('hide')
    add_question_display('hide')
    list_question_display('hide')
  }
}
function userinfo_display(status){
  if(status == "hide"){
    $("#user_info").css("display","none");
  }else{
    $("#user_info").css("display","table");
    studentinfo_display('hide')
    guidance_table_display('hide')
    add_guidance_display('hide')
    add_question_display('hide')
    list_question_display('hide')
  }
}

function guidance_table_display(status){
  if(status == "hide"){
    $(".guidance").css("display","none");
    $("#guidence_table").css("display","none");
  }else{
    console.log('show');
    $(".guidance").css("display","inline");
    $("#guidence_table").css("display","table");
    studentinfo_display('hide');
    userinfo_display('hide');
    $(".add_guidance").css("display","none");
    add_question_display('hide')
    list_question_display('hide')
  }
}
function add_guidance_display(status){
  if(status == "hide"){
    $(".add_guidance").css("display","none");
    $(".guidance").css("display","none");
  }else{
    $(".add_guidance").css("display","block");
    $(".guidance").css("display","table");
    studentinfo_display('hide')
    userinfo_display('hide')
    $("#guidence_table").css("display","none");
    add_question_display('hide')
    list_question_display('hide')
  }
}
function add_question_display(status){
  if(status == "hide"){
    $(".question").css("display","none");
  }else{
    $(".question").css("display","inline");
    
    add_guidance_display('hide')
    studentinfo_display('hide')
    userinfo_display('hide')
    guidance_table_display('hide')
    list_question_display('hide')
  }
}

function list_question_display(status){
  if(status == "hide"){
    $("#question_info").css("display","none");
  }else{
    $("#question_info").css("display","table");
    add_question_display('hide')
    add_guidance_display('hide')
    studentinfo_display('hide')
    userinfo_display('hide')
    guidance_table_display('hide')
  }
}