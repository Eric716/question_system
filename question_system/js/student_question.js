function gotologin() {
    window.location.href = "login.html"
}
$('.guidance_list_button').on('click', function () {
    var data = getUrlVars()
    course_id = data["course_id"];
    var settings = {
        "async": true,
        "url": "/guidance_list",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
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

            // for(i = 1; i <= a; i++) userinfo_display("show");
            // $("#guidance_list").css("display","table");
            // $("#question").css("display","none");
            guidance_display("show")
            // $(".guidance_list").show(); $("#question").hide();
            $("#guidance_list_main").html("<h1>指導句列表</h1>");
            // $( "#guidance_list" ).html(
            // "<tr><th>EN_description</th><td>"+response["EN_description"] + "</td></tr>"
            // );
            $("#guidance_list>tbody").html("<tr>");
            var class_name = document.getElementById("class_name").innerText

            for (var k in response) {
                // console.log(k)
                $("#guidance_list>tbody").append("<tr>");
                $("#guidance_list>tbody").append(
                    "<td>" + response[k]["EN_description"] + "</td>"
                );
                $("#guidance_list>tbody").append(
                    "<td>" + response[k]["CN_description"] + "</td>"
                );
                $("#guidance_list>tbody").append(
                    "<td>" + response[k]["EN_example"] + "</td>"
                );
                $("#guidance_list>tbody").append(
                    "<td>" + response[k]["CN_example"] + "</td>"
                );
                $("#guidance_list>tbody").append(
                    "<td>" + class_name+response[k]["course_id"] + "</td></tr>"
                );
            }

            // $( "#guidance_list>tbody" ).append( "<tr><td>"+response["status"] +
            // "</td></tr>" ); $( "#guidance_list>tbody" ).append(
            // "<tr><td>"+response["guidance_id"] + "</td></tr>" )
        });
});

var loadFile = function (event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};

$(document).ready(function () {
    $('.disable_class').prop("disabled", "disable");
    var data = getUrlVars()
    course_id = data["course_id"];


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
                // console.log(key);
                $("#question_request_select").append(
                    "<option value=" + key + ">" +  value['title'] + "</option>"
                )
            }
        });

});

$(document).ready(function () {

    $('#guidance_select').change(function () {
        var t = $("#guidance_select option:selected").text();
        console.log(t);
        $("#content2").val(t);
    });
    
        var data = getUrlVars()
        course_id = data["course_id"];
        var settings = {
          "url": "/trans_course/" + course_id,
          "method": "get",
          "timeout": 0,
      
        };
        $.ajax(settings).done(function (response) {
          var class_name = document.getElementById("class_name")
          class_name.innerText = response

          //console.log(redirect.href )
        });
      
      
      
      
});

$(document).ready(function () {
    var data = getUrlVars()
    course_id = data["course_id"];
    document.getElementById("course_id").value = course_id
    console.log('document.getElementById("course_id").value')
    console.log(document.getElementById("course_id").value)
    $('#category').change(function () {
        var t = $("#category option:selected").val();
        console.log(t);
        if (t == 1) {
            $(".selection").css("display", "none");
            $(".short_answer").css("display", "flex");
            $('.selecting').removeAttr('required');
            $(".selecting").val('');
            $('#ans_short_answer').attr('required', 'required');

        } else {
            $(".selection").css("display", "flex");
            $(".short_answer").css("display", "none");
            $('.selecting').attr('required', 'required');
            $('#ans_short_answer').removeAttr('required');
            console.log('remove')
        }
    });
});

$('.question_button').on('click', function () {
    // $(".guidance_list").hide(); $("#question").show();
    question_display("show")
});



function question_display(status) {
    if (status == "hide") {
        $("#question").hide();
    } else {
        $("#question").show();
        //userinfo_display("hide")
        guidance_display("hide")
        //user_info_modifying('hide')
        question_table_display('hide')
        cloud_display('hide')
    }
}
function guidance_display(status) {
    if (status == "hide") {
        $(".guidance_list").hide();
    } else {
        $(".guidance_list").show();
        question_display("hide")
        //userinfo_display("hide")
        //user_info_modifying('hide')
        question_table_display('hide')
        cloud_display('hide')
    }
}
function question_table_display(status) {
    if (status == "hide") {
        $(".question_table").hide();
    } else {
        $(".question_table").css("display", "table");
        question_display("hide")
        //userinfo_display("hide")
        //user_info_modifying('hide')
        guidance_display('hide')
        cloud_display('hide')
    }
}
function cloud_display(status) {
    if (status == "hide") {
        $(".cloud").hide();
    } else {
        $(".cloud").show();
        question_display("hide")
        //userinfo_display("hide")
        // user_info_modifying('hide')
        guidance_display('hide')
        question_table_display('hide')
    }
}

function Base64ToImage(base64img, callback) {
    var img = new Image();
    img.onload = function () {
        callback(img);
    };
    img.src = base64img;
}
$('.score_button').on('click', function () {
    var data = getUrlVars()
    course_id = data["course_id"];
    window.location.href = "score.html?course_id=" + course_id
})



function get_guidance_content(guidance_id) {
    var data = getUrlVars()
    course_id = data["course_id"];
    var settings = {
        "async": true,
        "url": "/guidance_list",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "course_id": course_id,
        },
    };
    $
        .ajax(settings)
        .done(function (response) {
            
            return response[guidance_id]['CN_description']
        });
};

$(document).ready(list_question);
$('.question_table_button').on('click', list_question)
function question_table() {
    var data = getUrlVars()
    course_id = data["course_id"];
    var settings = {
        "async": true,
        "url": "/questions_list_student",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }, "data": {
            "course_id": course_id,
        },
    };
    guidance_display("hide")
    question_table_display("show")
    $
        .ajax(settings)
        .done(function (response) {
            if (response == 'not_login') {
                gotologin()
            }
            // coursetable_display("show")
            $(".question_table").show();
            $("#question_table_main").html("<h1>個人出題列表</h1>");
            $("#question_table").html(
                "<tr><th>瀏覽題目</th><th>題目內容</th><th>選項A</th><th>選項B</th><th>選項C</th><th>選項D</th>" +
                "<th>提示</th><th>答案</th><th>詳解</th><th>hashtagA</th><th>hashtagB</th><th>hashtag" +
                "C</th><th>圖片</th></tr>"
            );
            console.log(response)
            for (var k in response) {
                $("#question_table").append("<tr>");
                // $( "#question_table" ).append("<td>"+ k + "</td>" );
                $("#question_table").append(
                    "<td><button class='btn btn-user btn-block nav-link bg-gradient-dark question_t" +
                    "able_btn' id='" + k + "'type='button'>  <span class='text-white-50'>" + k + "<" +
                    "/span></a></button>" + response[k]['user_id'] + "</td>"
                );

                $("#question_table").append("<td>" + response[k]['content'] + "</td>");
                $("#question_table").append("<td>" + response[k]['selectA'] + "</td>");
                $("#question_table").append("<td>" + response[k]['selectB'] + "</td>");
                $("#question_table").append("<td>" + response[k]['selectC'] + "</td>");
                $("#question_table").append("<td>" + response[k]['selectD'] + "</td>");
                $("#question_table").append("<td>" + response[k]['hint'] + "</td>");
                $("#question_table").append("<td>" + response[k]['ans'] + "</td>");
                $("#question_table").append("<td>" + response[k]['hashtagA'] + "</td>");
                $("#question_table").append("<td>" + response[k]['hashtagB'] + "</td>");
                $("#question_table").append("<td>" + response[k]['hashtagC'] + "</td>");
                // $( "#question_table" ).append("<td>"+ response[k]['ans'] + "</td>" );
                $("#question_table").append("<td>" + response[k]['description'] + "</td>");

                // $( "#question_table" ).append( "<tr>" );
                base64img = response[k]['figure']
                $("#question_table").append("<td><img src=" + base64img + ' style="width: 200pt"></td>');
                // $( "#question_table" ).append( "<td>" + "<button class='btn btn-user
                // btn-block nav-link bg-gradient-dark classes_btn'
                // id='"+response[k]['course_id']+"'type='button'>  <span
                // class='text-white-50'>" + k + "</span></a></button>" + "</td>" ); $(
                // "#question_table" ).append( "<td>" + "<button class='btn btn-user btn-block
                // nav-link bg-gradient-dark classes_btn' id='"+k+"'type='button'>  <span
                // class='text-white-50'>" + k + "</span></a></button>" + "</td>" );
                $("#question_table").append("<tr>");
            }
        });

}
$(".list_question").on('click', list_question)
function list_question() {
$("#question_table_main").html("<h1>個人出題列表</h1>");
$(".question_table_wordcloud").hide()
  guidance_display("hide")
  question_table_display("show")
  $("#question_req").show()
  $("#question_res_list").hide()
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
          string += "進入章節"
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
    console.log(id)
    var data = getUrlVars()
    course_id = data["course_id"];
    window.location.href = "student_question.html?course_id=" + course_id + "&question_req_id=" + id;

    
  })
  $('#question_res_list').on('click', '.delete_response_button', function () {
    question_id = this.id
    var settings = {
        "async": true,
        "url": "/delete_question",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "question_id": question_id,
        },
    };
    $.ajax(settings).done(function (response) {
        alert(response)
        var data = getUrlVars()
        question_req_id = data['question_req_id']
        course_id = data["course_id"];
        window.location.href = "student_question.html?course_id=" + course_id + "&question_req_id=" + question_req_id;
        // show_question_list(question_req_id)


  })
})
$('#question_res_list').on('click', '.response_button', function () {
    question_id = this.id
    question_req_id = this.getAttribute("class").split(' ')[1]
    var data = getUrlVars()
    course_id = data["course_id"];
    window.location.href = "student_question.html?course_id=" + course_id + "&question_id=" + question_id + "&question_req_id=" + question_req_id;
})

$('#question_table').on('click', '.question_table_btn', function () {
    var data = getUrlVars()
    course_id = data["course_id"];
    window.location.href = "student_question.html?course_id=" + course_id + "&question_id=" + this.id;
    // window.navigate("/question_system/index.html/");
    $(".question_table").hide()

})
var global_question_id = null
// $( document ).ready(function() {   console.log("1");   var data =
// getUrlVars()   question_id = data['question_id']   console.log(question_id)
// if(question_id != undefined){      console.log('NONONON')
// anychart(question_id)      set_global123(question_id)     global_question_id
// = question_id   } }); var global_question_id = function
// set_global123(question_id){   return question_id }

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

anychart.onDocumentReady(function (question_id) {
    // console.log("1");
    var data = getUrlVars()
    course_id = data["course_id"];
    question_id = data['question_id']
    question_req_id = data['question_req_id']

    if (question_id == undefined) {

        global_question_id = null
    } else {
        global_question_id = question_id
        var settings = {
            "async": true,
            "url": "/get_scores_mean",
            "method": "post",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
              "question_id": question_id,
              "question_req_id": question_req_id,
      
            },
          };
          $.ajax(settings).done(function (response) {
            data1=[]
            data2=[]
            // data1 = [{x:response['radar_index']['radarA'],value:response['radar_value_self']['radarA']},{x:response['radar_index']['radarB'],value:response['radar_value_self']['radarB']},{x:response['radar_index']['radarC'],value:response['radar_value_self']['radarC']},{x:response['radar_index']['radarD'],value:response['radar_value_self']['radarD']},{x:response['radar_index']['radarE'],value:response['radar_value_self']['radarE']}]
            // data2 = [{x:response['radar_index']['radarA'],value:response['radar_value']['radarA']},{x:response['radar_index']['radarA'],value:response['radar_value']['radarA']},{x:response['radar_index']['radarB'],value:response['radar_value']['radarB']},{x:response['radar_index']['radarC'],value:response['radar_value']['radarC']},{x:response['radar_index']['radarD'],value:response['radar_value']['radarD']},{x:response['radar_index']['radarE'],value:response['radar_value']['radarE']}]

            for(var index in response['radar_index']){

                if (response['radar_index'][index].includes('-')){
                    console.log('skip')
                }else{
                    data1.push({x:response['radar_index'][index],value:response['radar_value_self'][index]})
                    data2.push({x:response['radar_index'][index],value:response['radar_value'][index]})
                }
            }

            var chart = anychart.radar();
            chart.title("雷達圖成績")
            // set default series type
            chart.defaultSeriesType('area');
            chart.area(data1).name('自評').markers(true).fill("#4A4AFF", 0.3).stroke("#4A4AFF")
            chart.area(data2).name('同學評分').markers(true).fill("#FF8000", 0.3).stroke("#FF8000")
            // set chart data
            // chart.data(chartData);
      
            // set chart yScale settings
            chart.yScale().minimum(0).maximum(10).ticks({ interval: 2.5 });
      
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
            "async": true,
            "url": "/questions_hashtag_all",
            "method": "post",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "question_id": question_id,
            },
        };
        $
            .ajax(settings)
            .done(function (response) {
                if (response == 'not_login') {
                    gotologin()
                }
                if (global_question_id != null) {
                    cloud_display("show")
                }

                // cloud_display("show") cloud_display("hide") 
                console.log(response)
                var data = response[global_question_id];
                // data = JSON.parse(data);
                console.log(global_question_id)
                // console.log(data)
                // console.log(data) create a tag (word) cloud chart
                var chart = anychart.tagCloud(data);

                chart.width('100%');

                // Set height bound
                chart.height('100%');
                // set a chart title
                chart.title('第' + global_question_id + '題 文字雲')
                // set an array of angles at which the words will be laid out
                chart.angles([10, -30, 60])
                // enable a color range
                chart.colorRange(true);
                // set the color range length
                chart
                    .colorRange()
                    .length('50%');
                var customColorScale = anychart.scales.ordinalColor();
                customColorScale.colors(["#4A4AFF", "#FF8000", "#921AFF"]);
                chart.colorScale(customColorScale);
                // display the word cloud chart
                chart.container("wordcloud");
                chart.draw();

            })
    }
    var settings = {
        "async": true,
        "url": "/get_scores_comments",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "question_id": question_id,
        },
    };
    $.ajax(settings).done(function (response) {
        console.log('123',response[0]);
        // document.getElementById("score_content").innerHTML = '評語: '+response[0]
        $("#score_content>tbody").html("<tr>");
            for (var k in response[0]) {
                // console.log(k)
                $("#score_content>tbody").append("<tr>");
                $("#score_content>tbody").append(
                    "<td align='center' valign='middle'>" + response[0][k] + "</td>"
                );
                
            }
    })
});


$('#question_request_select').change(function () {
    var t = $("#question_request_select option:selected").val();
    console.log(t);
    // $("#content2").val(t);
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
            console.log(response[t]);
            // a = document.getElementById("radar1_label")
            document.getElementById("radar1_label").innerHTML = '自評: ' + response[t]['radarA']
            document.getElementById("radar2_label").innerHTML = '自評: ' + response[t]['radarB']
            document.getElementById("radar3_label").innerHTML = '自評: ' + response[t]['radarC']
            document.getElementById("radar4_label").innerHTML = '自評: ' + response[t]['radarD']
            document.getElementById("radar5_label").innerHTML = '自評: ' + response[t]['radarE']

        });
    // $('.disable_class').prop("disabled", "disable");
    $('.disable_class').prop("disabled", "");
});
$(document).ready(function () {
    var data = getUrlVars()
    question_req_id = data['question_req_id']
    question_id = data['question_id']
    if (question_req_id == undefined) {

    } else {
        if (question_id==undefined){
            show_question_list(question_req_id)
        }
    
}
})
function show_question_list(question_req_id){
    $("#question_table_main").html("<h1>個人出題列表</h1>");
    $("#question_req").hide()
    $("#question_res_list").show()
    
    var settings = {
      "async": true,
      "url": "/listing_question_response",
      "method": "post",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "question_req_id": question_req_id,
  
      },
    };
    $.ajax(settings).done(function (response) {
      if(response=='not_login'){
        gotologin()
    }
      console.log('show_question_list::::::',response)
      $("#question_res_list").html("<tr><th>查看評語</th><th>題目內容</th><th>圖片</th><th>選項A</th><th>選項B</th><th>選項C</th><th>選項D</th><th>hashtagA</th><th>hashtagB</th><th>hashtagC</th><th>提示</th><th>答案</th><th>詳解</th><th>刪除</th></tr>")
      list = ['content', 'figure', 'selectA', 'selectB', 'selectC', 'selectD', 'hashtagA', 'hashtagB', 'hashtagC', 'hint', 'ans', 'description']
      for (var question in response) {
        var string = "<tr><td>"+"<button class = 'response_button " + question_req_id + "' id = " + question + ">" + "查看評語" + "</button></td>"
  
        for (var key in list) {
  
          string += "<td> "
          if (key == 1) {
            base64img = response[question][list[key]]
            string += '<img src=' + base64img + ' style="width: 150pt">'
          } else {
            string += response[question][list[key]]
          }
          string += "</td>"
        }
        if(response[question]['delete_permission']=='yes'){
            string += "<td><button class = 'delete_response_button " + question_req_id + "' id = " + question + ">" + "刪除" + "</button></td>"
        }else{
            string += "<td></td>"
        }
        string += "</tr>"
        $("#question_res_list").append(string)
      }
    })
}

anychart.onDocumentReady(function (question_id) {
    // console.log("1");
    var data = getUrlVars()
    question_id = data['question_id']
    question_req_id = data['question_req_id']
    $(".question_table_wordcloud").hide()
    // console.log('data:::',data)
    // if (question_id == undefined) {

    //     global_question_id = null
    // } else {
    //     global_question_id = question_id
    course_id = data["course_id"];
    var settings = {
        "async": true,
        "url": "/test",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }, "data": {
            "course_id": course_id,
            "question_req_id":question_req_id,
        },
    };
    guidance_display("hide")
    // question_table_display("show")
    // question_table_display("hide")
    $.ajax(settings)
        .done(function (response) {
            // console.log('response:::',response[0])
            if (response == 'not_login') {
                gotologin()
            }
            
            // $(".question_table").show();
            // cloud_display("show") cloud_display("hide") 
            // console.log(response)
            // var data = response[global_question_id];
            var data = response[0]
            // data = JSON.parse(data);
            // console.log(global_question_id)
            // console.log(data)
            // console.log(data) create a tag (word) cloud chart
            var chart = anychart.tagCloud(data);

            chart.width('100%');

            // Set height bound
            chart.height('100%');
            // set a chart title
            chart.title('全班指導句文字雲')
            // set an array of angles at which the words will be laid out
            chart.angles([10, -30, 60])
            // // enable a color range
            // chart.colorRange(true);
            // // set the color range length
            // chart
            //     .colorRange()
            //     .length('50%');

            // display the word cloud chart
            chart.container("wordcloud2");
            chart.draw();
        });
        var settings = {
            "async": true,
            "url": "/questions_hashtag_all2",
            "method": "post",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            }, "data": {
                "course_id": course_id,
                "question_req_id":question_req_id,
            },
        };

        // question_table_display("hide")
        $
            .ajax(settings)
            .done(function (response) {
                // console.log('4564456456')
                // console.log(response)
                if (response == 'not_login') {
                    gotologin()
                }
                
                var data = response[0]
                // data = JSON.parse(data);
                // console.log(global_question_id)
                // console.log(data)
                // console.log(data) create a tag (word) cloud chart
                var chart = anychart.tagCloud(data);
                chart.width('100%');
    
                // Set height bound
                chart.height('100%');
                // set a chart title
                chart.title('全班題目重點+老師題目重點hashtag')
                // set an array of angles at which the words will be laid out
                chart.angles([10, -30, 60])
                // enable a color range
                chart.colorRange(true);
                // set the color range length
                chart
                    .colorRange()
                    .length('50%');
                
                var customColorScale = anychart.scales.ordinalColor();
                customColorScale.colors(["#0080FF", "#FF8000", "#921AFF"]);
                chart.colorScale(customColorScale);

                // display the word cloud chart
                chart.container("wordcloud3");
                chart.draw();
                $(".question_table_wordcloud").show()

            });
            

});

$('.summut_question').on('click', function () {


    var check = function(){
        var test = document.getElementById("dummyframe").contentDocument.body

        if(test.innerHTML=='ok'){
                var data = getUrlVars()
                course_id = data["course_id"];
                question_req_id = $('#question_request_select').val()
                window.location.href = "student_question.html?course_id=" + course_id + "&question_req_id=" + question_req_id;
        }
        else {
            alert('系統忙碌中，請再試一次')
            ; // check again in a second
        }
    }
    
    setTimeout(check, 1000)
})

