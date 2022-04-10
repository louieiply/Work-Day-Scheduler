//code runs when HTML-Document is loaded and DOM is ready

    let timeblocks_container = $("#timeblocks-container");
    const border_setting = "1px dashed black";
    let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log();

    let timeBlock = $("<div/>").attr("class","row justify-content-center align-items-center h-100");    
    timeBlock.appendTo(timeblocks_container);
    for (let index = 8; index < 19; index++) {
        
        let blockBody = $("<div/>");
        let blockTime = $("<div/>");
        let blockLink = $("<div/>");
        let timeText = index < 12 ? $("<h5/>").text(index + " Am") : $("<h5/>").text(index + " Pm");
        let description = $("<p/>").text(" ").attr("id",`save${index}`).attr("class","description");
        let iconContainer = $("<h5/>");
        let link = $("<a/>").attr("href","#").attr("id",`link${index}`).attr("class","link");
        let saveIcon = $("<i/>").attr("class","fas fa-save"); 

        blockTime.attr("class","col col-md-1 col-sm-1 col-lg-1 fix-height");
        blockTime.css("border-top",border_setting);
        blockTime.appendTo(timeBlock);

        blockBody.attr("class","col col-md-10 col-sm-10 col-lg-10 fix-height");
        // blockBody.css("background-color","blue");
        if(moment().format('H') == index){
            blockBody.addClass("current");
        }
        else if(moment().format('H') > index){
            blockBody.addClass("future"); 
        }
        else{
            blockBody.addClass("past"); 
        }

        blockBody.appendTo(timeBlock);

        blockLink.attr("class","col col-md-1 col-sm-1 col-lg-1 fix-height saveBtn");
        blockLink.appendTo(timeBlock);

        timeText.appendTo(blockTime);
        description.appendTo(blockBody);
        link.appendTo(blockLink);
        iconContainer.appendTo(link);
        saveIcon.appendTo(iconContainer);
        link.on("click",function(e){
            e.preventDefault();
            alert("hello");
        });
    }

