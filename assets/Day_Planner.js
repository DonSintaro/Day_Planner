////////////////////     Variables     ////////////////////////

var arrayTime = [[900,"nineA","nine"],[1000,"tenA","ten"],[1100,"elevenA","eleven"],[1200,"twelveP","twelve"],[1300,"oneP","one"],[1400,"twoP","two"],[1500,"threeP","three"],[1600,"fourP","four"],[1700,"fiveP","five"]];
var currentRealTime;
var currentTimeMT;


////////////////////////   Main   /////////////////////////////

///Checks Storage for clearing///
var daySaved = localStorage.getItem("daySaved");
clearLocalS();


///Makes Planner///
arrayTime.forEach(element => {
    $(".planner").append(formPlanner(element));  
});

///Sets data///
getLocalS();
updateTime();
var currentTimeUpdater = setInterval(updateTime,1000);

///Sets Button functions///
arrayTime.forEach(function(iteration){
    $("."+iteration[2]).on("click",function(){    
        localStorage.setItem(iteration[2],$("."+iteration[1]).val())
        localStorage.setItem("daySaved",moment().format("LL"))
    })
})

//////////////////////////////  Functions   ///////////////////////////////////
function headerTime(){
    var day = moment().format("LL");
    $(".headingC").html(function(){
        return `${day + " @ " + currentRealTime}`
    });
}

function clearLocalS(){
    if ( daySaved != moment().format("LL")){
        localStorage.clear()
    }
}

function getLocalS(){
    arrayTime.forEach(function(iteration){
        $("."+iteration[1]).val((localStorage.getItem(iteration[2])));
    })
}

function formPlanner(time){
   
    return `
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text sizeTime">${MTtoST(time[0])}</span>
        </div>
        <textarea class="form-control ${time[1]}" rows="3" aria-label="With textarea" maxlength="1000"></textarea>
        <div class="input-group-append">
            <button class="btn btn-outline-secondary ${time[2]}" type="button" id="button-addon2">Save</button>
        </div>
    </div>
    `
};

function updateColor(){
    arrayTime.forEach(function(iter){
        $("."+iter[1]).removeClass("past present future");
      
        if (iter[0] < currentTimeMT){
            $("."+iter[1]).addClass("past")
        }
        else if (iter[0] == currentTimeMT){
            $("."+iter[1]).addClass("present")  
        }
        else if (iter[0] > currentTimeMT){
            $("."+iter[1]).addClass("future")   
        }
    })
}

function updateTime(){
    currentRealTime = moment().format("LT");
    currentTimeMT = STtoMT(currentRealTime);
    headerTime();
    updateColor();
}

function MTtoST(MT){
    var buffer;
    if (MT <= 1200){
        buffer = (MT/100);
        if (MT == 1200){
            return (buffer.toString() + " PM");
        }  
        else{      
            return (buffer.toString() + " AM");
        }
    }
    else{
        buffer = ((MT - 1200)/100);
        return (buffer.toString() + " PM");
    }
}

function STtoMT(ST){
    var bufferArray1 = ST.split(" ");
    var bufferArray2 = bufferArray1[0].split(":");

    if ((bufferArray1[1] != "12") && (bufferArray1[1] == "PM")){
        return (parseInt(bufferArray2[0]) + 12)*100;
    }
    else{
        return (parseInt(bufferArray2[0])*100);
    }
}