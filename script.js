let slot_screen = document.getElementById("slot-screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let stop_btn = document.getElementsByClassName("stop-btn");
let start_btn = document.getElementById("start-btn");


let sec  = 100;
let stopReelFlag = [];
let reelCounts = [];
let slotFrameHeight;
let slotReelHeight;
let slotReelItemHeight;
let slotReelStartHeight;


let slot = {
    init:function(){
    stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
    reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },

    start:function(){
        slot.init();
        for(let index = 0;index < 3;index++)
        {
            slot.animation(index);
        }
    },

    stop:function(i){
        stopReelFlag[i] = true
        if(stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]){
            start_btn.removeAttribute("disable");
        }
    },

    resetlocationinfo:function() {
        slotFrameHeight = slot_screen.offsetHeight;
        slotReelHeight = reels[0].offsetHeight;
        slotReelItemHeight = reel[0].offsetHeight;
        slotReelStartHeight = slotReelHeight;
        slotReelItemHeight += slotFrameHeight - (slotFrameHeight * 3 / 2);
        for(let i = 0; i < reel>length;i++)
        {
            reels[i].style.top = String(slotReelStartHeight) + "px";
        }
    },
    animation:function(index) {
        if(reelCounts[index] >= 8){
            reelCounts[index] = 0;
        }
        $(".reels").eq(index).animate({
            "top":slotReelStartHeight + (reelCounts[index] * slotReelItemHeight
            )},
            {
                duration:sec,
                easing:"linear",
                complete:function(){
                    if(stopReelFlag[index]){
                        return
                    }

                    reelCounts[index]++;
                    slot.animation(index);
                }
            }
        )
    }
};

window.onload = function(){
    slot.init();
    slot.resetlocationinfo();
    start_btn.addEventListener("click",function(e){
        e.target.setAttribute("disable",true)
        slot.start();
        for(let i = 0;i < stop_btn.length;i++){
            stop_btn[i].removeAttribute("disable");
        }
    });
    for(let i = 0; i < stop_btn.length;i++){
        stop_btn[i].addEventListener("click",function(e){
            slot.stop(e.target.getAttribute("data-val"));
        });
    }
    };