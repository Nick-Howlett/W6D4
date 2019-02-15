const DOMNodeCollection = require("./dom_node_collection");

const funcs = [];
let loaded = false;

function $l(arg) {
  let nodeList;
  if(arg instanceof HTMLElement) {
    nodeList = [arg];
  }
  else if (typeof elements === "string"){
    nodeList = document.querySelectorAll(arg);
  }
  else if(arg instanceof Function){
    if(loaded){
      return arg();
    }else{
      funcs.push(arg);
      return;
    }
  }
  return new DOMNodeCollection(Array.from(nodeList));
};

$l.extend = function (...objs){
  const ret = {};
  objs.forEach( obj => {
    Object.keys(obj).forEach( key => {
      ret[key] = obj[key];
    });
  });
  return ret;
};


window.onload = function(){
  funcs.forEach(func =>{
    func();
  });
  loaded = true;
}

window.$l = $l;