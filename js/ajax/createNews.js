$(document).ready(function() {
   $.ajax({
    url:"/models/download_feed.inc.php",
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(JSONdata),
    success:function(data) { //ok
      console.log(data); 
    },
    error: function (xhr, ajaxOptions, thrownError) { //error
        alert(xhr.status);
        alert(thrownError);
      }
    });
  });