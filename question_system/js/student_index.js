$('.guidance_list_button').on('click',function() {
    var settings = {
        "async":true,
        "url": "/guidance_list" ,
        "method": "get",
        "timeout": 0,
        "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    $.ajax(settings).done(function (response) {
    const a = Object.keys(response).length;
    console.log(a);
    
    // for(i = 1; i <= a; i++)
    // userinfo_display("show");
    // $("#guidance_list").css("display","table");
    // $("#question").css("display","none");
    guidance_display("show")
    // $(".guidance_list").show();
    // $("#question").hide();
    $( "#guidance_list_main" ).html( "<h1>指導句列表</h1>" );
    // $( "#guidance_list" ).html( "<tr><th>EN_description</th><td>"+response["EN_description"] + "</td></tr>" );
    $( "#guidance_list>tbody" ).html("<tr>");
    for(i = 1; i <= a; i++){
        one_response = response[i]
        $( "#guidance_list>tbody" ).append("<tr>");
        $( "#guidance_list>tbody" ).append( "<td>"+one_response["EN_description"] + "</td>" );
        $( "#guidance_list>tbody" ).append( "<td>"+one_response["CN_description"] + "</td>" );
        $( "#guidance_list>tbody" ).append( "<td>"+one_response["EN_example"] + "</td>" );
        $( "#guidance_list>tbody" ).append( "<td>"+one_response["CN_example"] + "</td>" );
        $( "#guidance_list>tbody" ).append( "<td>"+one_response["course_id"] + "</td></tr>" );
    }
    
    // $( "#guidance_list>tbody" ).append( "<tr><td>"+response["status"] + "</td></tr>" );
    // $( "#guidance_list>tbody" ).append( "<tr><td>"+response["guidance_id"] + "</td></tr>" )
    });
});

var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };

$(document).ready(function(){
    $('#guidance_select').change(function(){
        var t = $( "#guidance_select option:selected" ).text();
        console.log(t);
        $("#content2").val(t);
    });
});

$(document).ready(function(){
    $('#category').change(function(){
        var t = $( "#category option:selected" ).val();
        console.log(t);
        if(t == 1){
            $(".selection").css("display","none");
            $(".short_answer").css("display","flex");
        }else{
            $(".selection").css("display","flex");
            $(".short_answer").css("display","none");
        }

    });
});

$('.question_button').on('click',function() {
    // $(".guidance_list").hide();
    // $("#question").show();
    question_display("show")
});

$('.user_info_button').on('click',function() {
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
    // $("#user_info").show();
    $( "#user_info_main" ).html( "<h1>個人資料</h1>" );
    $( "#user_info" ).html( "<tr><th>暱稱</th><td>"+response["nickname"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><th>姓名</th><td>"+response["name"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><th>學校</th><td>"+response["school"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><th>班級/科系</th><td>"+response["class"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><th>學號</th><td>"+response["student_id"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><th>E-mail</th><td>"+response["email"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><th>身分</th><td>"+response["permission"] + "</td></tr>" )
    });
  });


function userinfo_display(status){
  if(status == "hide"){
    $(".user_info_class").hide();
  }else{
    $(".user_info_class").show();
    question_display("hide")
    guidance_display("hide")
  }
}
function question_display(status){
  if(status == "hide"){
    $("#question").hide();
  }else{
    $("#question").show();
    userinfo_display("hide")
    guidance_display("hide")
  }
}
function guidance_display(status){
  if(status == "hide"){
    $(".guidance_list").hide();
  }else{
    $(".guidance_list").show();
    question_display("hide")
    userinfo_display("hide")
  }
}

$(document).ready(function(){
  // $('#category2').focus(function(){
   
    var settings = {
      "async":true,
      "url": "/questions_list" ,
      "method": "get",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $.ajax(settings).done(function (response) {
      const a = Object.keys(response).length;
      // console.log(a);

      for (const [key, value] of Object.entries(response)) {
        // console.log(key, value['content']);
        $( "#category2" ).append( "<option value="+key+">"+value['content']+"</option>")
      }
    });
  // });
});



$(document).ready(function(){
  // $('#category2').focus(function(){
   
    var settings = {
      "async":true,
      "url": "/questions_list" ,
      "method": "get",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $.ajax(settings).done(function (response) {
      const a = Object.keys(response).length;
      // console.log(a);

      for (const [key, value] of Object.entries(response)) {
        // console.log(key, value['content']);
        $( "#category2" ).append( "<option value="+key+">"+value['content']+"</option>")
      }
    });
  // });
});

$('#category2').change(function(){

  var settings = {
    "async":true,
    "url": "/questions_list" ,
    "method": "get",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  $.ajax(settings).done(function (response) {
    const a = Object.keys(response).length;
    // console.log(a);
    
    var t = $( "#category2 option:selected").val();
    console.log(t);
    // console.log(response[t]['figure']);
    $("#questions_list" ).html( "<tr><th width=100>"+'題目內容'+"</th><td width=200>"+response[t]['content']+"</td></tr>" );
    $("#questions_list" ).append( "<tr><th>"+'選項A'+"</th><td>"+response[t]['selectA']+"</td></tr>" );
    $("#questions_list" ).append( "<tr><th>"+'選項B'+"</th><td>"+response[t]['selectB']+"</td></tr>" );
    $("#questions_list" ).append( "<tr><th>"+'選項C'+"</th><td>"+response[t]['selectC']+"</td></tr>" );
    $("#questions_list" ).append( "<tr><th>"+'選項D'+"</th><td>"+response[t]['selectD']+"</td></tr>" );
    $("#questions_list" ).append( "<tr><th>"+'提示'+"</th><td>"+response[t]['hint']+"</td></tr>" );
    $("#questions_list" ).append( "<tr><th>"+'答案'+"</th><td>"+response[t]['ans']+"</td></tr>" );
    $("#questions_list" ).append( "<tr><th>"+'詳解'+"</th><td>"+response[t]['description']+"</td></tr>" );

    base64img = response[t]['figure']
    console.log(base64img);
    // document.querySelector("score_pic").src=base64img

    // pic = JSON.parse(response[t]['figure'])
    // pic = response[t]['figure'].slice(2, -1)
    // console.log(pic);
    var bigImg = document.createElement("img");		//创建一个img元素
    bigImg.src=base64img;   //给img元素的src属性赋值
    bigImg.class='offset-1'
    // //bigImg.width="320";  //320个像素 不用加px
    var myDiv = document.getElementById('questions_list_div'); //获得dom对象
    myDiv.appendChild(bigImg);
  });
  
});
function Base64ToImage(base64img, callback) {
  var img = new Image();
  img.onload = function() {
      callback(img);
  };
  img.src = base64img;
}

// Base64ToImage(base64img, function(img) {
//           document.getElementById('main').appendChild(img);
//           // var log = "w=" + img.width + " h=" + img.height;
//           // document.getElementById('log').value = log;
//       });
// // function imgChange(img) {
//   // console.log('1564')
//   // 生成一个文件读取的对象
//   const reader = new FileReader();
//   reader.onload = function (ev) {
//       // base64码
//       var imgFile =ev.target.result;//或e.target都是一样的
//       document.querySelector("img").src= ev.target.result;
//       // console.log(ev.target.result)
//       var base64img = imgFile
      
//   }
//   //发起异步读取文件请求，读取结果为data:url的字符串形式，
//   reader.readAsDataURL(img.files[0]);
  
// }