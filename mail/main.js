const Router = require('./router.js');

window.addEventListener('DOMContentLoaded', function(){
  const listItems = document.querySelectorAll('.sidebar-nav li');
  let items = Array.prototype.slice.call( listItems );

  items.forEach((item) => {
    item.addEventListener('click', () => {
      window.location.hash = item.innerText.toLowerCase();
    });
  });

  const content = document.querySelectorAll('.content');
  const contentNav = Array.prototype.slice.call( content )[0];
  const contentRouter = new Router(contentNav);
  contentRouter.start();
});
