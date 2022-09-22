$('.user_info_button').on('click',function() {
    var user_id=document.getElementById("user_id").innerText;
    console.log(user_id);
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
    console.log(response);
    $("#user_info").css("display","table");
    $( "#user_info" ).html( "<tr><td>暱稱</th><th>"+response["nickname"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><td>姓名</th><th>"+response["name"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><td>學校</th><th>"+response["school"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><td>班級</th><th>"+response["class"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><td>學/座號</th><th>"+response["student_id"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><td>E-mail</th><th>"+response["email"] + "</td></tr>" );
    $( "#user_info" ).append( "<tr><td>身分</th><th>"+response["permission"] + "</td></tr>" );

    });
      
    ;
});