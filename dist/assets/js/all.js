"use strict";

$(document).ready(function () {
  // console.log('Hello Bootstrap4');
  //aos套件
  AOS.init({
    once: true
  });
  var travelCardList = document.querySelector(".travelCardList");
  var ticketName = document.querySelector("#ticketName");
  var ticketPicUrl = document.querySelector("#ticketPicUrl");
  var ticketPlace = document.querySelector("#ticketPlace");
  var ticketPrice = document.querySelector("#ticketPrice");
  var ticketNum = document.querySelector("#ticketNum");
  var ticketRank = document.querySelector("#ticketRank");
  var ticketDescription = document.querySelector("#ticketDescription");
  var ticketInputBtn = document.querySelector(".form__inputBtn");
  var travelSelect = document.querySelector("#travelSelect");
  var filterResult = document.querySelector("#filterResult");
  var data; //初始化 axios 抓資料

  function init() {
    //等級一
    // axios
    // .get(
    //   "https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json"
    // )
    // .then(function (response) {
    //   console.log(response);
    //   data = response.data;
    //   showTravelCard();
    // });
    //等級二
    axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json").then(function (response) {
      data = response.data.data;
      showTravelCard();
    });
  }

  init(); //最一開始的顯示資料

  function showTravelCard() {
    var cardList = "";
    data.forEach(function (item, index) {
      var card = "<li data-aos=\"fade-up\" class=\"col-lg-4 col-md-6 col-12 travelCard\">\n      <div class =\"travelCard__container box-shadow\">\n          <p class=\"card__place\">".concat(item.area, "</p>\n          <div class=\"travelCard__img\">\n            <img src=\"https://picsum.photos/900/600?image=").concat(index + 10, "\" alt=\"\">\n          </div>\n        <div class=\"travelCard__content\">\n          <div>\n            <p class=\"card__rank\">").concat(item.rate, "</p>\n            <h4 class=\"card__name\">").concat(item.name, "</h4>\n            <p class=\"card__txt\">").concat(item.description, "</p>\n          </div>\n          <div class=\"card__info\">\n            <p class=\"card__num\"><i class=\"icon fas fa-exclamation-circle\"></i>\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</p>\n            <h5 class=\"card__price\"><span>TWD</span>$").concat(item.price, "</h5>\n          </div>\n        </div>\n      </div>\n    </li>");
      cardList += card;
    }); // console.log(cardList)

    travelCardList.innerHTML = cardList;
  } //抓取資料產生物件


  function getTravelData() {
    var lastTravelData = data.length;
    var obj = {};
    obj.id = lastTravelData;
    obj.name = ticketName.value;
    obj.imgUrl = "https://picsum.photos/900/600?image=".concat(lastTravelData + 10);
    obj.area = ticketPlace.value;
    obj.description = ticketDescription.value;
    obj.group = "".concat(ticketNum.value);
    obj.price = ticketPrice.value;
    obj.rate = ticketRank.value;
    return obj;
  } //檢查表單空白


  function seeDataValue(obj) {
    var objKeysArray = Object.keys(obj);
    var objValuesArray = Object.values(obj); // 當某屬性為空字串，插入警告訊息

    objValuesArray.forEach(function (item, index) {
      if (index > 0) {
        var inputName = objKeysArray[index];
        var alertStr = document.querySelector("#alertMessage_ticket_".concat(inputName));

        if (item == "") {
          alertStr.innerHTML = "<i class=\"fas fa-exclamation-circle\"></i><span>\u6B64\u6B04\u5FC5\u586B!</span>";
        } else {
          alertStr.innerHTML = "";
        }
      }
    }); //如果有一個沒填寫就不會產生小卡

    var result = objValuesArray.every(function (item) {
      return item !== "";
    });
    return result;
  } //檢查input值


  function checkFormLimit() {
    var ticketNumCheck = true;
    var ticketPriceCheck = true;
    var ticketRankCheck = true;

    if (ticketNum.value <= 0 || ticketNum.value > 100) {
      var alertStr = document.querySelector("#alertMessage_ticket_group");
      alertStr.innerHTML = "<i class=\"fas fa-exclamation-circle\"></i><span>\u5957\u7968\u7D44\u6578\u9700\u65BC1~99\u7D44\u4E4B\u9593</span>";
      ticketNumCheck = false;
    }

    if (ticketPrice.value <= 0 || ticketPrice.value > 100000) {
      var _alertStr = document.querySelector("#alertMessage_ticket_price");

      _alertStr.innerHTML = "<i class=\"fas fa-exclamation-circle\"></i><span>\u5957\u7968\u91D1\u984D\u9700\u65BC1~10\u842C\u5143\u4E4B\u9593</span>";
      ticketPriceCheck = false;
    }

    if (ticketRank.value <= 0 || ticketRank.value > 10) {
      var _alertStr2 = document.querySelector("#alertMessage_ticket_rate");

      _alertStr2.innerHTML = "<i class=\"fas fa-exclamation-circle\"></i><span>\u5957\u7968\u661F\u7D1A\u9700\u65BC1~10\u7D1A\u4E4B\u9593</span>";
      ticketRankCheck = false;
    }

    if (ticketNumCheck == true && ticketPriceCheck == true && ticketRankCheck == true) {
      return true;
    } else {
      return false;
    }
  } //推送資料進入陣列


  function addTravelCard(event) {
    event.preventDefault();
    var obj = getTravelData();
    console.log(obj);
    var checkState = seeDataValue(obj);
    var FormLimit = checkFormLimit();
    console.log(checkState);

    if (checkState == false) {
      return;
    } else if (FormLimit == false) {
      return;
    } else if (checkState == true && FormLimit == true) {
      data.push(obj); // console.log(obj)

      showTravelCard();
      formClean();
    }
  } //清除input


  function formClean() {
    ticketName.value = "";
    ticketPlace.value = "";
    ticketDescription.value = "";
    ticketNum.value = "";
    ticketPrice.value = "";
    ticketRank.value = "";
    ticketPicUrl.value = "";
  } //塞選卡片


  function travelCardFilter() {
    var targetPlace = travelSelect.value;
    var selectCard = [];

    if (targetPlace !== "不限") {
      selectCard = data.filter(function (item) {
        return item.area === targetPlace;
      });
    } else {
      selectCard = data.filter(function (item) {
        return item;
      });
    }

    var cardList = "";
    selectCard.forEach(function (item, index) {
      var card = "<li data-aos=\"fade-up\" class=\"col-lg-4 col-md-6 col-12 travelCard\">\n      <div class =\"travelCard__container box-shadow\">\n          <p class=\"card__place\">".concat(item.area, "</p>\n          <div class=\"travelCard__img\">\n            <img src=\"https://picsum.photos/900/600?image=").concat(index + 10, "\" alt=\"\">\n          </div>\n        <div class=\"travelCard__content\">\n          <div>\n            <p class=\"card__rank\">").concat(item.rate, "</p>\n            <h4 class=\"card__name\">").concat(item.name, "</h4>\n            <p class=\"card__txt\">").concat(item.description, "</p>\n          </div>\n          <div class=\"card__info\">\n            <p class=\"card__num\"><i class=\"icon fas fa-exclamation-circle\"></i>\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</p>\n            <h5 class=\"card__price\"><span>TWD</span>$").concat(item.price, "</h5>\n          </div>\n        </div>\n      </div>\n    </li>");
      cardList += card;
    }); // console.log(cardList)

    travelCardList.innerHTML = cardList;
    filterResult.textContent = "\u672C\u6B21\u641C\u5C0B\u5171 ".concat(selectCard.length, " \u7B46\u8CC7\u6599");
  }

  ticketInputBtn.addEventListener("click", addTravelCard);
  travelSelect.addEventListener("change", travelCardFilter);
});
// const data = [
//   {
//     id: 0,
//     name: "肥宅心碎賞櫻3日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     area: "高雄",
//     description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     group: 87,
//     price: 1400,
//     rate: 10,
//   },
//   {
//     id: 1,
//     name: "貓空纜車雙程票",
//     imgUrl:
//       "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台北",
//     description:
//       "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     group: 99,
//     price: 240,
//     rate: 2,
//   },
//   {
//     id: 2,
//     name: "台中谷關溫泉會1日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台中",
//     description:
//       "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     group: 20,
//     price: 1765,
//     rate: 7,
//   },
// ];
// const data = [
//   {
//     id: 0,
//     name: '綠島自由行套裝行程',
//     imgUrl:
//       'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
//     area: '台北',
//     description: '嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。',
//     group: '剩下最後 8 組',
//     price: '1,280',
//     rate: 8.6,
//   },
//   {
//     id: 2,
//     name: '清境高空觀景步道二日遊',
//     imgUrl:
//       'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//     area: '台北',
//     description: '清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。',
//     group: '剩下最後 12 組',
//     price: '2,580',
//     rate: 8.2,
//   },
//   {
//     id: 3,
//     name: '南庄度假村露營車二日遊',
//     imgUrl:
//       'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//     area: '台中',
//     description: '南庄雲水豪華露營車，快來擁有最愜意的露營體驗吧！ 一泊一食，輕鬆享受露營車樂趣。 獨立衛浴與私人戶外露臺。 入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。',
//     group: '剩下最後 12 組',
//     price: '2,480',
//     rate: 9.2,
//   },
//   {
//     id: 4,
//     name: '山林悠遊雙人套票',
//     imgUrl:
//       'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//     area: '台中',
//     description: '山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點，帶您飽覽南投瑰麗的自然環境，體驗變化無窮的地形景觀，喜歡挑戰高空的您一定不可錯過。 （含雙龍瀑布入場券 x2）',
//     group: '限時搶購',
//     price: '1,280',
//     rate: 9.3,
//   },
//   {
//     id: 5,
//     name: '漁樂碼頭釣魚體驗套票',
//     imgUrl:
//       'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//     area: '台中',
//     description: '台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！',
//     group: '剩下最後 5 組',
//     price: '2,480',
//     rate: 8.2,
//   },
//   {
//     id: 6,
//     name: '熊森公園親子二日遊套票',
//     imgUrl:
//       'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//     area: '高雄',
//     description: '來自日本最受歡迎的兒童遊樂園《 BearSon Park 熊森公園》於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！',
//     group: '剩下最後 9 組',
//     price: '2,480',
//     rate: 8.7,
//   },
// ]
"use strict";
//# sourceMappingURL=all.js.map
