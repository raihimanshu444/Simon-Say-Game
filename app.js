let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];
let started=false;
let level=0;
let h2=document.querySelector("h2");
//let highestScore=0;
let highestScore = localStorage.getItem("highestScore")
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn) {   
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);

}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIndex=Math.floor(Math.random()*3);
    let randColor=btns[randIndex];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn); 
}
function checkAns(index){
    //console.log("curr level: ",level);
    //let index=level-1; //last level ki check krni hai 
    if(userSeq[index]==gameSeq[index]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        if (level > highestScore) {
            highestScore = level; 
            //console.log(highScore);
            localStorage.setItem("highestScore", highestScore);
        }
        h2.innerHTML=`Game Over!Your score was <b>${level}</b> <br> Highest score is <i>${highestScore}  <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
    }
}
//value of current level is equal to user seq and game seq
function btnPress() {
    //console.log(this);  //which button is pressed
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");  //value of id=color

    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}
function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
function highScore(){
    let score=level;

}