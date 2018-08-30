class DOMNodeCollection {
  constructor(array) {
    this.elements = array;
    this.eventCallBacks = null;
  }

  html(argument) {
    if (argument === undefined) {
      return this.elements[0].innerHTML;
    }

    this.elements.forEach((el) =>{
      el.innerHTML = argument;
    });
  }

  empty() {
    this.html("");
  }

  append(argument) {
    if (argument instanceof HTMLElement) {
      this.elements.forEach( (el) => {
        let inner = el.innerHTML;
        let outer = argument.outerHTML;
        let newInner = inner + outer;
        el.innerHTML = newInner;
      });
    } else if (argument.constructor.name ===  'String') {
      this.elements.forEach( (el) => {
        let inner = el.innerHTML;
        let newInner = inner + argument;
        el.innerHTML = newInner;
      });
    } else if (argument.constructor.name === 'DOMNodeCollection') {
      this.elements.forEach( (el) => {
        let inner = el.innerHTML;
        let outer = "";
        argument.elements.forEach((el)=> {
          outer += el.outerHTML;
        });
        let newInner = inner + outer;
        el.innerHTML = newInner;
      });
    }
  }

  attr(argument) {
    this.elements.forEach((el) => {
      el.setAttribute(argument, true);
    });
  }

  addClass(class_name) {
    this.elements.forEach((el) => {
      el.classList.add(class_name);
    });
  }

  removeClass(class_name) {
    this.elements.forEach((el) => {
      el.classList.remove(class_name);
    });
  }

  children() {
    let kids = [];

    this.elements.forEach((parent) => {
      let offspring = [];
      let collection = Array.prototype.slice.call( parent.children );

      collection.forEach(child => {
        offspring.push(child);
      });
      kids = kids.concat(offspring);
    });
    return new DOMNodeCollection(kids);
  }

  parent() {
    let parents = [];

    this.elements.forEach(child => {
      if (!parents.includes(child.parentElement) ) {
        parents.push(child.parentElement);
      }
    });

    return new DOMNodeCollection(parents);
  }

  find(argument) {
    let results = [];
    this.elements.forEach( (el) => {
      let collection = Array.prototype.slice.call( el.querySelectorAll(argument));
      results = results.concat(collection);
    });
    return new DOMNodeCollection(results);
  }

  remove() {
    this.elements.forEach( (el) => {
      el.remove();
    });
    this.elements = [];
  }

  on(trigger, callback) {
    for (let ele of this.elements) {
      ele.addEventListener(trigger, callback);
    }
    this.eventCallBacks = callback;
  }

  off(trigger) {
    for (let ele of this.elements) {
      ele.removeEventListener(trigger, this.eventCallBacks);
    }
    this.eventCallBacks = null;
  }
}



module.exports= DOMNodeCollection;
