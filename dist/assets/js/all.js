"use strict";

$(document).ready(function () {
  // console.log('Hello Bootstrap4');
  //aos套件
  AOS.init({
    once: true
  });
  var travelCardList = document.querySelector('.travelCardList');
  var cardList = '';
  data.forEach(function (item, index) {
    var card = "<li class=\"col-4\">\n    <div class=\"travelCard box-shadow\">\n      <p class=\"card__place\">".concat(item.area, "</p>\n      <div class=\"travelCard__img\">\n          <img src=\"https://i.imgur.com/QXa1fMZ.png\" alt=\"\">\n      </div>\n    <div class=\"travelCard__content\">\n      <div>\n        <p class=\"card__rank\">").concat(item.rate, "</p>\n        <h4 class=\"card__name\">").concat(item.name, "</h4>\n        <p class=\"card__txt\">").concat(item.description, "</p>\n      </div>\n      <div class=\"card__info\">\n        <p class=\"crad__num\"><i class=\"icon fas fa-exclamation-circle\"></i>\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</p>\n        <h5 class=\"card__price\"><span>TWD</span>$").concat(item.price, "</h5>\n      </div>\n    </div>\n  </div>\n  </li>");
    cardList += card;
  });
  console.log(cardList);
  travelCardList.innerHTML = cardList;
});
"use strict";

var data = [{
  id: 0,
  name: '綠島自由行套裝行程',
  imgUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
  area: '台北',
  description: '嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。',
  group: 8,
  price: '1,280',
  rate: 8.6
}, {
  id: 1,
  name: '貓空纜車雙程票',
  imgUrl: 'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
  area: '台北',
  description: '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
  group: 99,
  price: 240,
  rate: 2
}, {
  id: 2,
  name: '台中谷關溫泉會1日',
  imgUrl: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
  area: '台中',
  description: '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
  group: 20,
  price: 1765,
  rate: 7
}];
"use strict";

var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'vertical',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination'
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar'
  }
});
//# sourceMappingURL=all.js.map
