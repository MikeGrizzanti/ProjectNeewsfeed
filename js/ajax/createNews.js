$(document).ready(function(e) {
    
    createNewsOnStart();

    $("#add_feed_box").on("submit",function(e){        
 
        e.preventDefault();
        var data = new FormData();
        var member1 = document.getElementById("member1");
        var member2 = document.getElementById("member2");
        var feed = document.getElementById("add_feed_url");
        data.append("member1",member1.value);
        data.append("member2",member2.value);
        data.append("add_feed",feed.value);
         

        $.ajax({
            type: "POST",
            url:"models/download_feed.inc.php",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $(".loader").show();
            },   
            success: function(data){
                $(".loader").hide();
            },
            error: function (xhr, ajaxOptions, thrownError, url) { //error
                console.log(xhr.status);
                console.log(url);
                alert("There has been a problem while parsing the feed: " + thrownError);
            },
            complete: function(data){
                var obj = $.parseJSON(data.responseText);
                for (var key in obj) {
                  if (obj.hasOwnProperty(key)) {
                      var data2 = JSON.stringify(obj[key]);
                      var obj2 = $.parseJSON(data2);
                      console.log(obj2.title);
                      insert(obj2.title, obj2.description, obj2.author, obj2.pubDate, obj2.guid, obj2.image);
                  }
                }
            }
        }); 
    });
    
});

function insert(title, description, author, pubDate, guid, image){ 
    
    var htmlOut='<div class="news_card"><img id="news_card_img" src="'+ image +'"/><br/><p id="news_card_text">'+ title +'</p><table id="container_table"><tr><td><div class="theme_container"><a class="news_card_sublink" href="#"><p class="sublink_text">theme</p></a></div></td><td><div class="source_container"><a class="news_card_sublink" href="#"><p class="sublink_text">source</p></a></div></td><td><div class="active_chats_container"><p class="sublink_text">x Chats</p></div></td></tr></table> </div>';
    
    
        /*var str ="";

        for(var i=0;i<20;i++)
        {
            str+="<tr>";
               
            str+="<td>"+htmlOut+"</td>";
            
            str+="</tr>";
        }*/
    
        $("#table_news_cards>tbody>tr:last").after(htmlOut);
        //$('#table_news_cards').append(str);
    
}



function createNewsOnStart() {
            
            $.ajax({
                type: "POST",
                url: 'index.php?loadObject=true',
                data: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function(response) {
                    
                }, 
                complete: function(response){
                    //console.log(response.responseText);
                    var obj = $.parseJSON(response.responseText);
                    //console.log(obj);
                    
                    for (var key in obj) {
                      if (obj.hasOwnProperty(key)) {
                          var data2 = JSON.stringify(obj[key]);
                          var obj2 = $.parseJSON(data2);
                              for (var key in obj2) {
                              if (obj2.hasOwnProperty(key)) {
                                  var data3 = JSON.stringify(obj2[key]);
                                  var obj3 = $.parseJSON(data3);
                                  var obj3Lenght = Object.keys(obj3).length;
                                  
                                  
                                  insert(obj3.feed_title, obj3.feed_content, obj3.feed_author, obj3.feed_puDate, obj3.feed_guid, obj3.feed_img_path);

                              }
                            }
                          
                      }
                    }
                }
            });
    }

 