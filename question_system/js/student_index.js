$('.guidance_list_button').on('click', function () {
    var settings = {
        "async": true,
        "url": "/guidance_list",
        "method": "get",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    $
        .ajax(settings)
        .done(function (response) {
            const a = Object
                .keys(response)
                .length;
            console.log(a);
            
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
            for (var k in response) {
                console.log(k)
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
                    "<td>" + response[k]["course_id"] + "</td></tr>"
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
    $('#guidance_select').change(function () {
        var t = $("#guidance_select option:selected").text();
        console.log(t);
        $("#content2").val(t);
    });
});

$(document).ready(function () {
    $('#category').change(function () {
        var t = $("#category option:selected").val();
        console.log(t);
        if (t == 1) {
            $(".selection").css("display", "none");
            $(".short_answer").css("display", "flex");
        } else {
            $(".selection").css("display", "flex");
            $(".short_answer").css("display", "none");
        }

    });
});

$('.question_button').on('click', function () {
    // $(".guidance_list").hide(); $("#question").show();
    question_display("show")
});

$('.user_info_button').on('click', userinfo);
function userinfo() {
    var settings = {
        "async": true,
        "url": "/user_info",
        "method": "get",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    $
        .ajax(settings)
        .done(function (response) {
            console.log(response)
            userinfo_display("show");
            user_info_modifying("hide");
            $("#main").html("<h1>個人資料</h1>");
            $("#user_info_table").html(
                "<tr><th>暱稱</th><td>" + response["nickname"] + "</td></tr>"
            );
            $("#user_info_table").append(
                "<tr><th>姓名</th><td >" + response["name"] + "</td></tr>"
            );
            $("#user_info_table").append(
                "<tr><th>學校</th><td>" + response["school"] + "</td></tr>"
            );
            $("#user_info_table").append(
                "<tr><th>班級/科系</th><td>" + response["class"] + "</td></tr>"
            );
            $("#user_info_table").append(
                "<tr><th>學號</th><td>" + response["student_id"] + "</td></tr>"
            );
            $("#user_info_table").append(
                "<tr><th>E-mail</th><td>" + response["email"] + "</td></tr>"
            );
            $("#user_info_table").append(
                "<tr><th>身分</th><td>" + response["permission"] + "</td></tr>"
            )
        });
}
$('#user_info_modify_cancel').on('click', userinfo)
function user_info_modifying(status) {
    if (status == "hide") {
        $(".user_info_modifying").css("display", "none");
    } else {
        $(".user_info_modifying").css("display", "inline");;

    }
}
$('#user_info_modify_btn').on('click', function () {
    // console.log(document.getElementById("user_info_table").getElementsByTagName
    // ("tr").length)
    for (
        let td = 0;
        td < document.getElementById("user_info_table").getElementsByTagName("tr").length - 1;
        td++
    ) {
        if (td == 4) {
            continue
        }
        document
            .getElementById("user_info_table")
            .getElementsByTagName("tr")[td]
            .getElementsByTagName("td")[0]
            .setAttribute("contenteditable", "true")
        document
            .getElementById("user_info_table")
            .getElementsByTagName("tr")[td]
            .getElementsByTagName("td")[0]
            .setAttribute("bgcolor", "white")
    }
    user_info_modifying('show')
    $('#user_info_modify_btn').css("display", "none");
})
$('#user_info_modify_commit').on('click', function () {
    let nickname = document
        .getElementById("user_info_table")
        .getElementsByTagName("tr")[0]
        .getElementsByTagName("td")[0]
        .innerHTML
    let name = document
        .getElementById("user_info_table")
        .getElementsByTagName("tr")[1]
        .getElementsByTagName("td")[0]
        .innerHTML
    let school = document
        .getElementById("user_info_table")
        .getElementsByTagName("tr")[2]
        .getElementsByTagName("td")[0]
        .innerHTML
    let classs = document
        .getElementById("user_info_table")
        .getElementsByTagName("tr")[3]
        .getElementsByTagName("td")[0]
        .innerHTML
    let student_id = document
        .getElementById("user_info_table")
        .getElementsByTagName("tr")[4]
        .getElementsByTagName("td")[0]
        .innerHTML
    let email = document
        .getElementById("user_info_table")
        .getElementsByTagName("tr")[5]
        .getElementsByTagName("td")[0]
        .innerHTML
    var settings = {

        "url": "/user_info_update",
        "method": "post",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "nickname": nickname,
            "name": name,
            "school": school,
            "class": classs,
            "student_id": student_id,
            "email": email
        }
    };
    $
        .ajax(settings)
        .done(function (response) {
            console.log(response)
            if (response == "ok") {
                alert("修改成功")
                userinfo()
            }
        })
})
function userinfo_display(status) {
    if (status == "hide") {
        $(".user_info_class").hide();
    } else {
        $(".user_info_class").show();
        question_display("hide")
        guidance_display("hide")
        user_info_modifying('hide')
        question_table_display('hide')
        cloud_display('hide')
    }
}
function question_display(status) {
    if (status == "hide") {
        $("#question").hide();
    } else {
        $("#question").show();
        userinfo_display("hide")
        guidance_display("hide")
        user_info_modifying('hide')
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
        userinfo_display("hide")
        user_info_modifying('hide')
        question_table_display('hide')
        cloud_display('hide')
    }
}
function question_table_display(status) {
    if (status == "hide") {
        $(".question_table").hide();
    } else {
        $(".question_table").show();
        question_display("hide")
        userinfo_display("hide")
        user_info_modifying('hide')
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
        userinfo_display("hide")
        user_info_modifying('hide')
        guidance_display('hide')
        question_table_display('hide')
    }
}

$(document).ready(function () {
    // $('#category2').focus(function(){

  var settings = {
        "async": true,
        "url": "/questions_list",
        "method": "get",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    $
        .ajax(settings)
        .done(function (response) {
            const a = Object
                .keys(response)
                .length;
            // console.log(a);

            for (const [key, value] of Object.entries(response)) {
                // console.log(key);
                $("#category2").append(
                    "<option value=" + key + ">" + value['content'] + "</option>"
                )
            }
        });
    // });
});

$(document).ready(function () {
    // $('#category2').focus(function(){

    var settings = {
        "async": true,
        "url": "/questions_list",
        "method": "get",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    $
        .ajax(settings)
        .done(function (response) {
            const a = Object
                .keys(response)
                .length;
            // console.log(a);

            for (const [key, value] of Object.entries(response)) {
                // console.log(key, value['content']);
                $("#category2").append(
                    "<option value=" + key + ">" + value['content'] + "</option>"
                )
            }
        });
    // });
});

$('#category2').change(function () {

    var settings = {
        "async": true,
        "url": "/questions_list",
        "method": "get",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    $
        .ajax(settings)
        .done(function (response) {
            const a = Object
                .keys(response)
                .length;
            // console.log(a);

            var t = $("#category2 option:selected").val();
            console.log(t);
            // console.log(response[t]['figure']);
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

            base64img = response[t]['figure']
            // console.log(base64img); document.querySelector("score_pic").src=base64img pic
            // = JSON.parse(response[t]['figure']) pic = response[t]['figure'].slice(2, -1)
            // console.log(pic);
            var bigImg = document.createElement("img"); //创建一个img元素
            bigImg.src = base64img; //给img元素的src属性赋值
            bigImg.class = 'offset-1'
            // bigImg.width="320";  320个像素 不用加px
            var myDiv = document.getElementById('questions_list_div'); //获得dom对象
            myDiv.appendChild(bigImg);
        });

});
function Base64ToImage(base64img, callback) {
    var img = new Image();
    img.onload = function () {
        callback(img);
    };
    img.src = base64img;
}

$('.question_table_button').on('click', question_table)
function question_table() {

    var settings = {
        "async": true,
        "url": "/questions_list",
        "method": "get",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    guidance_display("hide")
    question_table_display("show")
    $
        .ajax(settings)
        .done(function (response) {
            // coursetable_display("show")
            $(".question_table").show();
            $("#question_table_main").html("<h1>題目列表</h1>");
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
                    "/span></a></button></td>"
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
                $("#question_table").append("<td><img src=" + base64img + '></td>');
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

$('#question_table').on('click', '.question_table_btn', function () {
    // console.log(this.id)
    window.location.href = "return_backto_index?question_id=" + this.id;
    // window.navigate("/question_system/index.html/");

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
    question_id = data['question_id']
    // console.log(question_id)
    if (question_id != undefined) {
        // console.log('NONONON') anychart(question_id) set_global123(question_id)
        global_question_id = question_id
    }
    // console.log("2");
    var settings = {
        "async": true,
        "url": "/questions_hashtag_all",
        "method": "get",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    $
        .ajax(settings)
        .done(function (response) {
            if (global_question_id != null) {
                cloud_display("show")
            }
            // cloud_display("show") cloud_display("hide") console.log(response)
            var data = response[global_question_id];
            // data = JSON.parse(data);
            console.log(global_question_id)
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

            // display the word cloud chart
            chart.container("wordcloud");
            chart.draw();

        })
});

// $('.now_course_button').on('click',nowcourse)