// worked - got all topics and their category
const link_pelement= document.querySelectorAll('div[role="presentation"]');
console.log(link_pelement);
const category_txts = document.querySelectorAll('.rc-WeekItemAnnotations');
console.log(category_txts);

var links = []; 
var iframe_window=[];
var iframe_content=[];
var media=[];
var link_url,link_txt,category;
for(var k=0; k<category_txts.length;k++){

 link_url= link_pelement[k+4].childNodes[0].getAttribute("href");
 link_txt=category_txts[k].previousSibling.textContent;
links.push(link_url);
console.log(k+link_txt);
console.log(links[k]);
category = category_txts[k].textContent;
if(category.includes("Video")){
    console.log("video");
    create_iframe(links[k],k,"V");
}else if(category.includes("Reading")){
 create_iframe(links[k],k,"R");
console.log(k+"reading");
}else if(category.includes("Quiz")){
    console.log("Quiz");
}else{
 console.log("Other");
}//else
} //for

function create_iframe(link,k,c){
//  console.log(link);
setTimeout(function() {
  console.log(link);
  console.log("time1"+k);
  console.log(100+(k*30));
 iframe_window[k] = document.createElement("iframe");
	iframe_window[k].src=link;
	//setting attributes
	iframe_window[k].width = "45%"; 
	iframe_window[k].height = "25%";
	iframe_window[k].frameBorder = "0";
	iframe_window[k].scrolling = "0";
	//setting style 
	iframe_window[k].style.border= "1px solid grey";
	iframe_window[k].style.background = "white";

	iframe_window[k].style.position = "fixed";
  iframe_window[k].style.overflow = "auto";
  iframe_window[k].style.zIndex = 1+k;
	iframe_window[k].style.left = 20+(k*20)+"px";
  iframe_window[k].style.bottom = "20%";
//	iframe_window.style.width = "100%";
//	iframe_window.style.height = "100%";
	
//document.body.appendChild(substack); //this line works but it away from the display in this site

document.querySelector('[data-test="rc-periodPage"]').appendChild(iframe_window[k]);
//const iframe_content = iframe_window.contentWindow.document;

iframe_window[k].onload = function() {
  console.log("iframe opened");
 setTimeout(function() {
   console.log("time2 "+k);
 iframe_content[k] = iframe_window[k].contentWindow.document;
console.log(iframe_content[k]);
if(c=="V") {
//worked - seeking time of the video
 media[k] = iframe_content[k].querySelector("video");
 console.log("media"+k);
console.log(media[k]);
//The HTMLMediaElement API is used for video controls
// time is calculated in seconds
/*
media.currentTime = Math.floor(media.duration)-3;
console.log(media.currentTime);
media.play();
*/
console.log("duration");
console.log(media[k].duration);
}else if(c=="R"){
 media[k] = iframe_content[k].querySelector('button[data-testid="mark-complete"]');
console.log("read_btn");
console.log(media);
media.click();
console.log("marked as read");
}

 }, 10000+(k*1000)); 

};//onload
return;
}, 14000+(k*1000)); 
} //func create_iframe
