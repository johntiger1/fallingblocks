
class FallingDiv {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('box');
  }
  
  draw(top, color) {
    document.body.appendChild(this.el);
    this.offset = top; // save this value for later
    this.el.style.top = top + 'px';
    this.el.style.backgroundColor = color; //LITERALLY THE STRING!
   
    document.body.appendChild(this.el);
  }

  step(){
    if(this.distanceDropped <= this.MAX_DROP_HEIGHT){
      this.distanceDropped += this.fallingRate;
      this.el.style.top = this.distanceDropped + 'px';
      
      window.requestAnimationFrame(() => this.step());
    }
  }
  
  fall(){
    this.MAX_DROP_HEIGHT = window.innerHeight - this.el.clientHeight*count;
    if (this.MAX_DROP_HEIGHT < 0)
    {
      console.log("WINNER");
      count = 0;
      prestige++;
      //this.el.style.backgroundColor = '#224';
      console.log(parseInt('#244', 10));
      //console.log('#244' + prestige);
      var colorNum = parseInt(color.slice(1), 10) + prestige;

      color = '#' + colorNum;
    }

    this.fallingRate = 10;
    this.distanceDropped = this.offset;
    window.requestAnimationFrame(() => this.step());
  }
}


var color = '#244';
var count = 0;
var prestige = 0;
function startSequence(){
  console.log('starting sequence...');
  count++;
  //window.alert("hello")
  var trueCount = 0;
  while (trueCount < 5)
  {
    var fdiv = new FallingDiv();
    fdiv.draw(20, color); //all drawn in same position!
    fdiv.step();
    fdiv.fall();
    trueCount++;
    //console.log(trueCount);
    window.setTimeout(function(){}, 1000);
    console.log(count);

  }
  //console.log(parseInt(color.slice(1), 10));
}

/***************************************************/
/************ For Loading Reddit Stories ***********/
/***************************************************/

function getTopRedditStories() {
  var topStoriesURL = 'https://www.reddit.com/top.json';
  var xhr = new XMLHttpRequest();
  var deferred = Promise.defer();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        deferred.resolve(JSON.parse(xhr.responseText).data.children);
      } else {
        deferred.reject(xhr.responseText);
      }
    }
  };
  xhr.open('GET', topStoriesURL);
  xhr.send();
  return deferred.promise;
}

