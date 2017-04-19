
//get all comments
function getComments(find_this_message_id, comment_block) {
  $.get("/myblog/get-all-comments/" + find_this_message_id)
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
          var comment_date = each_comment.comment_date;
          console.log(comment_date);
          // display the comments begin
          var each_comment_display_block = $('<div/>', {
              "class": "each_comment_display_block",
            });

        $(each_comment_display_block).append($('<p>', {html:commenter}));

        $(each_comment_display_block).append($('<p>', {html:comment_date}));
        //comment text
        $(each_comment_display_block).append($('<p>', {html:comment_text}));
       $(comment_block).append($(each_comment_display_block));
          // display the comments end
        };
      };
    });
  // get all comments end
};  // get all comments function end



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
                            name: 'comment'});
      var comment_box_submit_button = $('<input/>').attr({
                            type: 'submit',
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
              url: "/myblog/add-comment/" + find_this_message_id,
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

  $( ".message_comment" ).one({
      "click": function() {
        var comment_this = $( this );
        click_function(comment_this);
      }
});//end one



});
