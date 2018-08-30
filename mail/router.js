class Router {
  constructor(node) {
    this.node = node;
  }

  start () {
    this.render();
    window.addEventListener('hashchange', this.render.bind(this));
  }

  render () {
    this.node.innerHTML = "";
    let routeName = this.activeRoute();
    let newElement = document.createElement("p");

    newElement.innerHTML = routeName;
    this.node.appendChild(newElement);
  }

  activeRoute () {
    let hashEle = window.location.hash;
    return hashEle.slice(1);
  }
}

module.exports = Router;
