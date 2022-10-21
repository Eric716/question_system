
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
var loadFile = function (event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};
function gotologin(){
    window.location.href = "login.html"
}


$('.user_info_button').on('click', userinfo);
$(document).ready(userinfo);
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
            if(response=='not_login'){
                gotologin()
            }
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
            if(response=='not_login'){
                gotologin()
            }
            if (response == "ok") {
                alert("修改成功")
                userinfo()
            }
        })
})

$('.now_course_button').on('click',function(){
    var settings = {
        "async":true,
        "url": "/student_get_course",
        "method": "post",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        
      };
      $.ajax(settings).done(function (response) {
        if(response=='not_login'){
            gotologin()
        }
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
)
$('#course_table').on('click','.classes_btn',function() {
    window.location.href = "student_question.html?course_id="+this.id;
  })

function userinfo_display(status) {
    if (status == "hide") {
        $(".user_info_class").hide();
    } else {
        $(".user_info_class").show();
        user_info_modifying('hide')
        coursetable_display('hide')
    }
}
function coursetable_display(status) {
    if (status == "hide") {
        $("#course_table").hide();
    } else {
        $("#course_table").show();
        user_info_modifying('hide')
        userinfo_display('hide')
    }
}
function user_info_modifying(status) {
    if (status == "hide") {
        $(".user_info_modifying").css("display", "none");
    } else {
        $(".user_info_modifying").css("display", "inline");;

    }
}

// $(document).ready(function () {
//     userinfo_display("show");
//     user_info_modifying("hide");
//     // $(".user_info_class").show();
// });