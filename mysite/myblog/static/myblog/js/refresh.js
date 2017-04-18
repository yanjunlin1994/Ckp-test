
//get all comments
function getComments(find_this_message_id, comment_block) {
  $.get("/grumblr/get-all-comments/" + find_this_message_id)
    .done(function(data) {
      if (data.comments.length > 0) {
        console.log("comments");
        for (var i = 0; i < data.comments.length; i++) {
          var each_comment = data.comments[i]
          var commenter_id = each_comment.commenter_id;
          console.log(commenter_id);
          var comment_text = each_comment.comment_text;
          console.log(comment_text);
          var commenter = each_comment.commenter;
          console.log(commenter);
          var commenter_picture = each_comment.commenter_picture;
          console.log(commenter_picture);
          var comment_date = each_comment.comment_date;
          console.log(comment_date);
          // display the comments begin
          var each_comment_display_block = $('<div/>', {
              "class": "each_comment_display_block",
            });

            //commenter's picture and profile link
            var commenter_profile_image_link = $('<a>', {href : "/grumblr/profile/" + commenter_id});
            if (commenter_picture != '0') {
              $(commenter_profile_image_link).append($('<img>', {class: 'commenter_profile_image',
                                                    src: '/grumblr/other-profile-photo/' + commenter_id,
                                                    alt: commenter_id}));
            }
            console.log("hi")
            $(each_comment_display_block).append($(commenter_profile_image_link));
            //commenter's name and its profile link
            var commenter_profile_link = $('<a/>', {
              href : "/grumblr/profile/" + commenter_id,
              });
              $(commenter_profile_link).append($('<p>', {"class": 'commenter_username', html:commenter}));

            $(each_comment_display_block).append($(commenter_profile_link));

            //time block
            console.log("hi2")
            $(each_comment_display_block).append($('<p>', {"class": 'comment_date', html:comment_date}));
            //comment text
            $(each_comment_display_block).append($('<p>', {"class": 'comment_text', html:comment_text}));
           $(comment_block).append($(each_comment_display_block));
           console.log("hi3")
          // display the comments end
        };
      };
    });

  // get all comments end
};  // get all comments function end





function getUpdates() {
    console.log("getupdates");
    var get_hidden_time_stamp = $("#time_stamp_hidden").text();
    console.log("time_stamp");
    console.log(get_hidden_time_stamp);
    $.get("/grumblr/check-if-new-message-refresh/" + get_hidden_time_stamp)
      .done(function(data) {
        console.log("enter js");
        console.log(data.time_stamp);
        $("#time_stamp_hidden").text(data.time_stamp);

        console.log(data.new_messages.length);

        if (data.new_messages.length > 0) {
          console.log("new message");
          for (var i = 0; i < data.new_messages.length; i++) {
            var each_message = data.new_messages[i]
            var new_message_id = each_message.messsage_pk;
            console.log(new_message_id);
            var new_message_user_id = each_message.user_id;
            console.log(new_message_user_id);
            var new_message_text = each_message.message_text;
            console.log(new_message_text);
            var new_message_user = each_message.user;
            console.log(new_message_user);
            var new_message_pub_date = each_message.pub_date;
            console.log(new_message_pub_date);
            var new_message_picture = each_message.picture;
            console.log(new_message_picture);
            var message_block_js = $('<div/>', {
                "class": "message_block_all",
              });
              //the hidden message id
              var message_block_hidden_message_id = $('<p>', {
                                                        html:new_message_id,
                                                        "class": "message_id_hidden"});
              $(message_block_hidden_message_id).attr("hidden","True");
              console.log("---text----")
              console.log($(message_block_hidden_message_id).text())

              $(message_block_js).append($(message_block_hidden_message_id));
              //user's picture and profile link
              var message_block_js_profile_image_link = $('<a>', {href : "/grumblr/profile/" + new_message_user_id});
              if (new_message_picture != '0') {
                $(message_block_js_profile_image_link).append($('<img>', {class: 'message_profile_image',
                                                      src: '/grumblr/other-profile-photo/' + new_message_user_id,
                                                      alt: new_message_user_id}));
              }
              $(message_block_js).append($(message_block_js_profile_image_link));
              //username and its profile link
              var message_block_js_profile_link = $('<a/>', {
                href : "/grumblr/profile/" + new_message_user_id,
                });
                $(message_block_js_profile_link).append($('<p>', {"class": 'message_person', html:new_message_user}));

              $(message_block_js).append($(message_block_js_profile_link));

              //time block
              var message_block_js_timeblock = $('<div/>', {
                  "class": "message_timeblock",
                });
                var message_block_js_time_number = $('<p/>', {"class": 'messgae_timeblock_time', html:new_message_pub_date});
                  $(message_block_js_time_number).append($('<img>',
                      {"class": 'messgae_timeblock_clockpicture', src:"/static/grumblr/pictures/clock.png", alt:"clock"}));
                $(message_block_js_timeblock).append($(message_block_js_time_number));

              $(message_block_js).append($(message_block_js_timeblock));
              //message text
              $(message_block_js).append($('<p>', {"class": 'message_messagetext', html:new_message_text}));

              //forward and like
              var message_block_js_forward = $('<a/>', {
                href : "#forward",
                });
                $(message_block_js_forward).append($('<img>',
                    {"class": 'message_forward_picture', src:"/static/grumblr/pictures/forward.png", alt:"forward"}));
              var message_block_js_like = $('<img/>', {
                "class": 'message_like_picture',
                src:"/static/grumblr/pictures/before_like.png",
                alt:"like",

                });
                $( message_block_js_like ).on( "click", function like_button_change() {
                    this.src="/static/grumblr/pictures/after_like.png";
                  });
              //comment

              var message_block_js_comment = $('<img>', {
                "class": 'message_comment_picture',
                src:"/static/grumblr/pictures/comment.png",
                alt:"comment",
                });
                $(message_block_js_comment).one({
                    "click": function() {
                      var comment_this_in = $( this );
                      click_function(comment_this_in);
                    }
                });
              $(message_block_js).append($(message_block_js_forward));
              $(message_block_js).append($(message_block_js_like));
              $(message_block_js).append($(message_block_js_comment));
            $(message_block_js).insertAfter("#new_messages_line");

          }//end for

        }//end if
        else {
          console.log("no new messages");
        }


});//done data function
};//done get updates fucntion

function click_function(comment_this) {

    console.log( "want comment?" );
    // var comment_this = $( this );
    var message_block = $(comment_this).parent();
    //construct the block
    var comment_block = $('<div/>', {
        "class": "comment_block",
      });
    $(message_block).append($(comment_block));

    $(comment_block).append($('<p>', {"class": 'comment_now', html:"comment"}));

    var comment_box_div = $('<div/>', {
        "class": "comment_box_div",
      });
      var comment_box = $('<form/>').attr({
                            "class" : 'comment_box',
                            });
      var comment_box_input = $('<input/>').attr({
                            type: 'text',
                            "class" : 'comment_box_input',
                            name: 'comment'});
      var comment_box_submit_button = $('<input/>').attr({
                            type: 'submit',
                            "class" : 'comment_box_submit_button',
                            value: 'submit'});

      $(comment_box).append(comment_box_input)
      $(comment_box).append(comment_box_submit_button)
      $(comment_box_div).append($(comment_box));

    $(comment_block).append($(comment_box_div));

    //get all comments begin
    console.log( "get comments ing" );

    var find_this_message_id = ($(message_block)).children().first().text();
    console.log(find_this_message_id);

    //call get comments function to get comments from the server
    getComments(find_this_message_id, comment_block);


    // CSRF set-up copied from Django docs
      function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
      var csrftoken = getCookie('csrftoken');
      $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      });

      //submit
    $( ".comment_box" ).submit(function(e) {
            e.preventDefault();
            console.log("submit...calling add comments function");
            console.log("submit text is");
            newly_comment = $(this).serialize();
            console.log(newly_comment);
            this_comment_box = $(this);
            $.ajax({
              type: "POST",
              url: "/grumblr/add-comment/" + find_this_message_id,
              data: newly_comment,
              success: function(data){
                console.log("success");
                var comment_submit_comment_block = $(this_comment_box).parents(".comment_block");
                var each_comment_display_block_to_be_removed = $(comment_submit_comment_block).children(".each_comment_display_block");
                $(each_comment_display_block_to_be_removed).remove();
                getComments(find_this_message_id, comment_block);
              }
            });


});//end click

};

$(document).ready(function (){
  if (($("#square_mark").length)) {
              console.log("this is the square page, we should update new posts every 5 seconds");
              //if it is the square page update every 5 s
              window.setInterval(getUpdates, 5000);

            }


  $( ".message_comment_picture" ).one({
      "click": function() {
        var comment_this = $( this );
        click_function(comment_this);
      }
});//end one



});
