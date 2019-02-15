class DOMNodeCollection {
  constructor(elements){
    this.els = elements;
  }

  html(string) {
    if (string === undefined) {
      return this.els[0].innerHTML;
    } else {
      this.els.forEach( el => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.html("");
  }
  
  append(elements) {
    if (elements instanceof HTMLElement) {
      this.els.forEach( (el) => {
        el.innerHTML += elements.outerHTML;
      });
    } else if (elements instanceof DOMNodeCollection) {
      this.els.forEach( (el) => {
        elements.els.forEach( (el2) => {
          el.innerHTML += el2.outerHTML;
        });
      })
    } else if (typeof elements === "string") {
      this.els.forEach((el) => {
        el.innerHTML += elements;
      });
    }
  }

  attr(string, value) {
    // let atts = this.els[0].attributes
    if (value === undefined) {
      this.els[0].getAttribute(string);
    } else {
      this.els.forEach( (el) => {
        el.setAttribute(string, value);
      });
    }
  }

  addClass(value){
    this.els.forEach( el =>{
      el.classList.add(value);
    });
  }

  removeClass(value){
    this.els.forEach(el => {
      el.classList.remove(value);
    });
  }

  children(){
    let ret = [];
    this.els.forEach(el => {
      ret = ret.concat(Array.from(el.children));
    })
    return new DOMNodeCollection(ret);
  }

  parent() {
    let ret = [];
    this.els.forEach(el => {
      if(!ret.includes(el.parentNode)){
        ret.push(el.parentNode);
      }
    });
    return new DOMNodeCollection(ret);
  }

  find(selector) {
    let selected = [];
    this.els.forEach( el => {
      selected = selected.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(selected);
  }

  remove() {
    this.els.forEach( el => {
      el.outerHTML = "";
    });
  }

  on(event, callback) {
    this.els.forEach( el => {
      el.addEventListener(event, callback);
      el.listener = callback;
    });
  }

  off(event) {
    this.els.forEach( el => {
      el.removeEventListener(event, el.listener);
    });
  }



}


module.exports = DOMNodeCollection;