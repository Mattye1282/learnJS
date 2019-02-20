window.addEventListener('DOMContentLoaded', () => {

   const loadContent = async (url, callback) => {
      await fetch(url)
         .then(response => response.json())
         .then(json => createElement(json.goods));

      callback();
   };
   
   function createElement(array) {
      const goodsWrapper = document.querySelector('.goods__wrapper');
   
      array.forEach(function(item) {
         let card = document.createElement('div');
         card.classList.add('goods__item');
         card.innerHTML = `
            <img class="goods__img" src="${item.url}" alt="phone">
            <div class="goods__colors">Доступно цветов: 4</div>
            <div class="goods__title">
               ${item.title}
            </div>
            <div class="goods__price">
               <span>${item.price}</span> руб/шт
            </div>
            <button class="goods__btn">Добавить в корзину</button>
         `;
         goodsWrapper.appendChild(card);
      });
   }
   
   loadContent('js/db.json', () => {
      const
         cartWrapper = document.querySelector('.cart__wrapper'),
         cart = document.querySelector('.cart'),
         close = document.querySelector('.cart__close'),
         open = document.querySelector('#cart'),
         goodsBtn = document.querySelectorAll('.goods__btn'),
         products = document.querySelectorAll('.goods__item'),
         confirm = document.querySelector('.confirm'),
         badge = document.querySelector('.nav__badge'),
         totalCost = document.querySelector('.cart__total > span'),
         titles = document.querySelectorAll('.goods__title');
   
      function openCart() {
         cart.style.display = 'block';
         document.body.style.overflow = 'hidden';
      }
   
      function closeCart() {
         cart.style.display = 'none';
         document.body.style.overflow = '';
      }
   
      open.addEventListener('click', openCart);
      close.addEventListener('click', closeCart);
   
      goodsBtn.forEach(function (btn, i) {
         btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
               trigger = item.querySelector('button'),
               removebtn = document.createElement('div'),
               empty = cartWrapper.querySelector('.empty');
   
            trigger.remove();
   
            showConfirm();
            calcGoods(1);
   
            removebtn.classList.add('goods__item-remove');
            removebtn.innerHTML = '&times';
            item.appendChild(removebtn);
   
            cartWrapper.appendChild(item);
   
            if (empty) {
               empty.remove();
            }
   
            calcTotal();
            removeFromCart();
         });
      });
   
      function sliceDescription() {   
         titles.forEach(function(item) {
            if (item.textContent.length < 70) {
               return;
            } else {
               let str = item.textContent.slice(0, 70) + '...';
               item.textContent = str;
            }
   
         });
      }
   
      function showConfirm() {
         confirm.style.display = 'block';
         let counter = 100;
   
         const id = setInterval(frame, 10);
         function frame() {
            if (counter == 10) {
               clearInterval(id);
               confirm.style.display = 'none';
            } else {
               counter--;
               confirm.style.opacity = '.' + counter;
               confirm.style.transform = `translateY(-${counter}px)`;
            }
         }
      }
   
      function calcGoods(i) {
         const items = cartWrapper.querySelectorAll('.goods__item');
         badge.textContent = i + items.length;
      }
   
      function calcTotal() {
         const totalPrice = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
         let total = 0;
         totalPrice.forEach(function(item) {
            total += +item.textContent;
         });
         totalCost.textContent = total;
      }
   
      function removeFromCart() {
         const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
         let empty = document.createElement('div');
         removeBtn.forEach(function(btn) {
            btn.addEventListener('click', () => {
               btn.parentElement.remove();
               calcGoods(0);
               calcTotal();
               if (cartWrapper.childElementCount == 0) {
                  empty.classList.add('empty');
                  empty.textContent = 'Ваша корзина пока пуста';
                  cartWrapper.appendChild(empty);
               }
            });
         });
      }
   
      sliceDescription();
   });
});


/* 
let example = {name: "Matt"};

fetch('https://jsonplaceholder.typicode.com/posts', {
   method: "POST",
   body: JSON.stringify(example)
})
  .then(response => response.json())
  .then(json => console.log(json))
*/