//code runs when HTML-Document is loaded and DOM is ready
$(document).ready(function () {
    


    //create Description list
    function createDescList(){
        var list = [];
        for(i = 8; i < 18; i++){
            list.push({time:i,description:""});
        }
        console.log(list);
        localStorage.setItem("times",JSON.stringify(list));
    }

    //check localStorage has description list existed or not
    if(localStorage.getItem("times") === null){
        createDescList();
    }
    
    //load Description
    function loadDes(index,description){
        var list = JSON.parse(localStorage.getItem("times"));
        if( list[index-8].description== ""){
            return;
            
        }
        else{
            description.text(list[index-8].description);
        }
    }

    //Save Description
    function saveDes(fieldText,index){
        var id = "#save" + index;
        if($(id).val() === ""){
            alert("Textarea is empty");
            return;
        }
        else{
            var itemlist = JSON.parse(localStorage.getItem("times"));
            itemlist[index-8].description = fieldText;
            localStorage.setItem("times",JSON.stringify(itemlist));
            
        }
    }
    let currentDayInfo = $("#currentDay");
    let timeblocks_container = $("#timeblocks-container");
    const border_setting = "1px dashed black";
    let currentDate = moment().format('dddd, MMMM Do');

    currentDayInfo.text(currentDate);
    let timeBlock = $("<div/>").attr("class","row justify-content-center align-items-center h-100");
    //Loop through each hour of the business hours   
    timeBlock.appendTo(timeblocks_container);
    for (let index = 8; index < 18; index++) {
        
        let blockBody = $("<div/>");
        let blockTime = $("<div/>");
        let blockLink = $("<div/>");
        let timeText = index < 12 ? $("<h5/>").text(index + " Am") : $("<h5/>").text(index + " Pm");
        let description = $("<textarea/>").attr("id",`save${index}`);
        let iconContainer = $("<h5/>");
        let link = $("<a/>").attr("href","#").attr("id",`link${index}`).attr("class","link");
        let saveIcon = $("<i/>").attr("class","fas fa-save"); 

        blockTime.attr("class","col-md-1 col-sm-1 col-lg-1 col-1 fix-height");
        blockTime.css("border-top",border_setting);
        blockTime.appendTo(timeBlock);
        
        blockBody.attr("class","col-md-10 col-sm-10 col-lg-10 col-1 fix-height-body");
        //blockBody change depends on the current hour.
        if(moment().format('H') == index){
            blockBody.addClass("present");
        }
        else if(moment().format('H') > index){
            blockBody.addClass("future"); 
        }
        else{
            blockBody.addClass("past"); 
        }
        loadDes(index,description);
        blockBody.appendTo(timeBlock);
        blockLink.attr("class","col-md-1 col-sm-1 col-lg-1 col-1 fix-height saveBtn");
        blockLink.appendTo(timeBlock);

        timeText.appendTo(blockTime);
        description.appendTo(blockBody);
        link.appendTo(blockLink);
        iconContainer.appendTo(link);
        saveIcon.appendTo(iconContainer);
        link.on("click",function(e){
            e.preventDefault();
            var id = "#save"+index;
            var fieldText = $(id).val();
            saveDes(fieldText,index);
        });
    }
});
