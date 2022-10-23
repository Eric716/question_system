
function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window
        .location
        .href
        .slice(window.location.href.indexOf('?') + 1)
        .split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
$(document).ready(function () {
    var data = getUrlVars()
    var course_id = data["course_id"];
    var question_req_id = data["question_req_id"];
    $('.disable_class').prop("disabled", "disable");
    if(question_req_id==undefined){
        $("#question_req").show()
        $(".question_table").show()
        $("#score").hide()
        list_question()
    }else{
        $("#question_req").hide()
        $(".question_table").hide()
        $("#score").show()
        
    
    var settings = {
        "async": true,
        "url": "/questions_list",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }, "data": {
            "course_id": course_id,
            'question_req_id':question_req_id
        },
    };
    $
        .ajax(settings)
        .done(function (response) {
            if (response == 'not_login') {
                gotologin()
            }
            const a = Object
                .keys(response)
                .length;
            // console.log(a);
            $("#category2").append(
                "<option value=" + " " + ">" + " " + " " + " " + "</option>"
            )
            for (const [key, value] of Object.entries(response)) {
                // console.log(key);
                $("#category2").append(
                    "<option value=" + key + ">" + value['content'] + "</option>"
                )
            }
        });

    // var data = getUrlVars()
    // course_id = data["course_id"];
    var settings = {
        "async": true,
        "url": "/listing_question",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }, "data": {
            "course_id": course_id,
        },
    };
    $
        .ajax(settings)
        .done(function (response) {
            if (response == 'not_login') {
                gotologin()
            }
            const a = Object
                .keys(response)
                .length;
            // console.log(response);

            for (const [key, value] of Object.entries(response)) {
                console.log(key);
                $("#question_request_select").append(
                    "<option value=" + key + ">" + key + ": " + value['title'] + "</option>"
                )
            }
        });
    }
});


$('#category2').change(function () {
    var data = getUrlVars()
    var course_id = data["course_id"];
    var question_req_id = data["question_req_id"];
    var settings = {
        "async": true,
        "url": "/questions_list",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }, "data": {
            "course_id": course_id,
            'question_req_id':question_req_id
        },
    };
    $
        .ajax(settings)
        .done(function (response) {
            if (response == 'not_login') {
                gotologin()
            }
            const a = Object
                .keys(response)
                .length;
            // console.log(a);

            var t = $("#category2 option:selected").val();
            // console.log(t);
            // console.log("45485f86dh486ef4drhedrh");
            // console.log(response[t]['figure']);
            $("#questions_list").html(
                "<tr><th width=100>題目內容</th><td width=200>" + "hujigigwgiolwgioliolwegjiolwegjiolweg" + "</td></" +
                "tr>"
            );
            $("#questions_list").html(
                "<tr><th width=100>題目內容</th><td width=200>" + response[t]['content'] + "</td></" +
                "tr>"
            );
            $("#questions_list").append(
                "<tr><th>選項A</th><td>" + response[t]['selectA'] + "</td></tr>"
            );
            $("#questions_list").append(
                "<tr><th>選項B</th><td>" + response[t]['selectB'] + "</td></tr>"
            );
            $("#questions_list").append(
                "<tr><th>選項C</th><td>" + response[t]['selectC'] + "</td></tr>"
            );
            $("#questions_list").append(
                "<tr><th>選項D</th><td>" + response[t]['selectD'] + "</td></tr>"
            );
            $("#questions_list").append(
                "<tr><th>提示</th><td>" + response[t]['hint'] + "</td></tr>"
            );
            $("#questions_list").append(
                "<tr><th>答案</th><td>" + response[t]['ans'] + "</td></tr>"
            );
            $("#questions_list").append(
                "<tr><th>詳解</th><td>" + response[t]['description'] + "</td></tr>"
            );
            $("#questions_list").append(
                "<tr><th>圖片</th><td>" + "<img src=" + response[t]['figure'] + ' style="width: 200pt"></td>'+ "</tr>"
            );
        });

    var t = $("#category2 option:selected").val();
    console.log(t);
    // $("#content2").val(t);
    var data = getUrlVars()
    var course_id = data["course_id"];
    var question_req_id = data["question_req_id"];
    var settings = {
        "async": true,
        "url": "/questions_list",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }, "data": {
            "course_id": course_id,
            'question_req_id':question_req_id
        },
    };
    $
        .ajax(settings)
        .done(function (response) {
            if (response == 'not_login') {
                gotologin()
            }
            // console.log(response[t]);
            // a = document.getElementById("radar1_label")
            document.getElementById("radar1_label").innerHTML = response[t]['radar1']
            document.getElementById("radar2_label").innerHTML = response[t]['radar2']
            document.getElementById("radar3_label").innerHTML = response[t]['radar3']
            document.getElementById("radar4_label").innerHTML = response[t]['radar4']
            document.getElementById("radar5_label").innerHTML = response[t]['radar5']

        });
    // $('.disable_class').prop("disabled", "disable");
     $('.disable_class').prop("disabled", "");

});
$('.go_back').on('click', function () {
    var data = getUrlVars()
    course_id = data["course_id"];
    window.location.href = "student_question.html?course_id=" + course_id
})
$('.question_table_button').on('click', list_question)
function list_question() {


  $("#question_req").show()
  $(".question_table").show()
  $("#score").hide()
  
  var data = getUrlVars()
  course_id = data["course_id"];
  var settings = {
    "async": true,
    "url": "/listing_question",
    "method": "post",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "course_id": course_id,
    },
  };
  $.ajax(settings).done(function (response) {
    if(response=='not_login'){
      gotologin()
  }
    // console.log(response)

    $("#question_req").html("<tr><th>課程名稱</th><th>title</th><th>選擇章節</th><th>hashtagA</th><th>hashtagB</th><th>hashtagC</th><th>radarA</th><th>radarB</th><th>radarC</th><th>radarD</th><th>radarE</th></tr>")
    var list = ['course_name', 'title', 'question_id', 'hashtagA', 'hashtagB', 'hashtagC', 'radarA', 'radarB', 'radarC', 'radarD', 'radarE']
    for (var student in response) {
      var string = "<tr>"
      for (var key in list) {

        string += "<td>"
        if (key == 2) {
          string += "<button class = 'request_button' id = "
          string += response[student][list[key]] + ">"
          string += "選擇此章節"
          string += "</button>"
        } else {
          string += response[student][list[key]]
        }

        string += "</td>"
      }
      string += "</tr>"
      $("#question_req").append(string)
      

    }
  })
};
$('#question_req').on('click', '.request_button', function () {
    id = this.id
    // console.log(id)
    var data = getUrlVars()
    course_id = data["course_id"];
    window.location.href = "score.html?course_id=" + course_id + "&question_req_id=" + id;

    
  })
  $('.summut_question').on('click', function () {
    var data = getUrlVars()
    course_id = data["course_id"];
    question_req_id =  data["question_req_id"];
    window.location.href = "student_question.html?course_id=" + course_id + "&question_req_id=" + question_req_id;
    
})