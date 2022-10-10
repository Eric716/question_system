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
  studentinfo_display("show");
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
  studentinfo_display("show");
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
      if (response == 'ok'){
        alert('新增成功');
        get_guidance();
      }
      else{
        alert(response)
      }
  });

})
$('#adding_question').on('click',function() { 
  var course_id = getUrlVars()["course_id"]
  var title=document.getElementById("title").value;
  var hashtagA=document.getElementById("hashtagA").value;
  var hashtagB=document.getElementById("hashtagB").value;
  var hashtagC=document.getElementById("hashtagC").value;
  var radarA=document.getElementById("radarA").value;
  var radarB=document.getElementById("radarB").value;
  var radarC=document.getElementById("radarC").value;
  var radarD=document.getElementById("radarD").value;
  var radarE=document.getElementById("radarE").value;
  console.log(course_id)
  var settings = {
    "url": "/adding_question",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "title":title,
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
      list_question()
    }
  })
})

$(".list_question").on('click',list_question)
function list_question() {
  $( "#main" ).html( "<h1>已要求出題</h1>" );
  list_req_display('show');
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

  $( "#question_req" ).html("<tr><th>課程名稱</th><th>title</th><th>select</th><th>hashtagA</th><th>hashtagB</th><th>hashtagC</th><th>radarA</th><th>radarB</th><th>radarC</th><th>radarD</th><th>radarE</th></tr>")
  var list=['course_name','title','question_id','hashtagA','hashtagB','hashtagC','radarA','radarB','radarC','radarD','radarE']
  for(var student in response){
    var string = "<tr>"
    for (var key in list){

      string += "<td>"
      if(key == 2){
        string += "<button class = 'request_button' id = "
        string += response[student][list[key]]+">"
        string += "select this request"
        string += "</button>"
      }else{
        string += response[student][list[key]]
      }
      
      string += "</td>"
    }
    string += "</tr>"
    $( "#question_req" ).append(string)
  }  
})
};
$('#question_req').on('click','.request_button',function() {
  id = this.id
  console.log(id)
  $( "#main" ).html( "<h1>題目列表</h1>" );
  list_question_display('show');
  var settings = {
    "async":true,
    "url": "/listing_question_response",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "question_req_id":id,

    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response)
    $( "#question_res_list" ).html("<tr><th>查看統計資料</th><th>題目內容</th><th>圖片</th><th>選項A</th><th>選項B</th><th>選項C</th><th>選項D</th><th>hashtagA</th><th>hashtagB</th><th>hashtagC</th><th>提示</th><th>答案</th><th>詳解</th></tr>")
    list = ['content','figure','selectA','selectB','selectC','selectD','hashtagA','hashtagB','hashtagC','hint','ans','description']
    for(var question in response){
      var string = "<tr><td><button class = 'response_button "+id+"' id = "+question+">" + "查看統計資料" + "</button></td>"
      for (var key in list){
  
        string += "<td> "
        if(key == 1){
          base64img = response[question][list[key]]
          string += '<img src='+base64img+'>'
        }else{
          string += response[question][list[key]]
        }
        
        string += "</td>"
      }
      string += "</tr>"
      $( "#question_res_list" ).append(string)
    }  
  })
})
$('#question_res_list').on('click','.response_button',function() {
  question_id = this.id
  question_req_id = this.getAttribute("class").split(' ')[1]
  var data = getUrlVars()
  course_id = data["course_id"];
  window.location.href = "teacher_question.html?course_id="+course_id+"&question_id="+question_id+"&question_req_id="+question_req_id;
})

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
    list_req_display('hide')
    list_question_display('hide')
    static_fig_display('hide')
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
    list_req_display('hide')
    list_question_display('hide')
    static_fig_display('hide')
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
    list_req_display('hide')
    list_question_display('hide')
    static_fig_display('hide')
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
    list_req_display('hide')
    list_question_display('hide')
    static_fig_display('hide')
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
    list_req_display('hide')
    list_question_display('hide')
    static_fig_display('hide')
    static_fig_display('hide')
  }
}

function list_req_display(status){
  if(status == "hide"){
    $("#question_req").css("display","none");
  }else{
    $("#question_req").css("display","table");
    add_question_display('hide')
    add_guidance_display('hide')
    studentinfo_display('hide')
    userinfo_display('hide')
    guidance_table_display('hide')
    list_question_display('hide')
    static_fig_display('hide')
  }
}

function list_question_display(status){
  if(status == "hide"){
    $("#question_res_list").css("display","none");
  }else{
    $("#question_res_list").css("display","table");
    add_question_display('hide')
    add_guidance_display('hide')
    studentinfo_display('hide')
    userinfo_display('hide')
    guidance_table_display('hide')
    list_req_display('hide')
    static_fig_display('hide')
  }
}
function static_fig_display(status){
  if(status == "hide"){
    $(".static_figs").css("display","none");
  }else{
    $(".static_figs").css("display","inline");
    add_question_display('hide')
    add_guidance_display('hide')
    studentinfo_display('hide')
    userinfo_display('hide')
    guidance_table_display('hide')
    list_req_display('hide')
    list_question_display('hide')
  }
}
anychart.onDocumentReady(function () {
  // create data set on our data
  var data = getUrlVars()
  course_id = data["course_id"];
  question_id = data['question_id']
  question_req_id = data['question_req_id']
  console.log(question_id)
  console.log(question_req_id)
  if (question_id==null&& question_req_id==null){
    console.log('no fig')
  }else{
    console.log('gogogogogogogogog')
  $( "#main" ).html( "<h1>統計資料</h1>" );
  static_fig_display('show')
  var settings = {
    "async":true,
    "url": "/get_scores_mean",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "question_id":question_id,
      "question_req_id":question_req_id,

    },
  };
  $.ajax(settings).done(function (response) {
  var chartData = {
    title: '雷達圖成績',
    // header: ['#', 'Day (max)', 'Night (min)'],
    // rows: [
    //   ['January', 8.1,,
    //   ['February', 8.4],
    //   ['March', 11.4],
    //   ['April', 14.2],
    //   ['May', 17.9],

    // ]
    header: ['#','自評', '全班'],
    rows:[
      [response['radar_index']['radarA'],response['radar_value_self']['radarA'],response['radar_value']['radarA']],
      [response['radar_index']['radarB'],response['radar_value_self']['radarB'],response['radar_value']['radarB']],
      [response['radar_index']['radarC'],response['radar_value_self']['radarC'],response['radar_value']['radarC']],
      [response['radar_index']['radarD'],response['radar_value_self']['radarD'],response['radar_value']['radarD']],
      [response['radar_index']['radarE'],response['radar_value_self']['radarE'],response['radar_value']['radarE']],
    ]
  };

  // create radar chart
  var chart = anychart.radar();

  // set default series type
  chart.defaultSeriesType('area');

  // set chart data
  chart.data(chartData);

  // set chart yScale settings
  chart.yScale().minimum(0).maximumGap(0).ticks({ interval: 2.5 });

  // set axes labels settings
  chart.xAxis().labels().padding(5);
  chart.xAxis().labels().fontSize(30)

  // set chart legend settings
  chart.legend().align('center').enabled(true);

  // set tooltip format
  chart.tooltip().format('score: {%Value}\xb0');

  // set container id for the chart
  chart.container('radar_fig');
  // initiate chart drawing
  chart.draw();
})
var settings = {
  "async":true,
  "url": "/questions_hashtag_all",
  "method": "get",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
};
$.ajax(settings).done(function (response) {
  if (question_id != null){
  }
  // cloud_display("show")
  // cloud_display("hide")
  // console.log(response)
  var data = response[question_id];
  // data = JSON.parse(data);
  console.log(question_id)
  console.log(data)
  // create a tag (word) cloud chart
  var chart2 = anychart.tagCloud(data);

  chart2.width('100%');

  // Set height bound
  chart2.height('100%');
  // set a chart title
  chart2.title('第'+question_id+'題 文字雲')
  // set an array of angles at which the words will be laid out
  chart2.angles([10, -30, 60])
  // enable a color range
  chart2.colorRange(true);
  // set the color range length
  chart2.colorRange().length('50%');

  // display the word cloud chart
  chart2.container("cloud_fig");
  chart2.draw();
  
})
}
});