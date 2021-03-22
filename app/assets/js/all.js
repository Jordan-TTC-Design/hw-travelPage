$(document).ready(() => {
  // console.log('Hello Bootstrap4');
  //aos套件
  AOS.init({
    once: true,
  });

  const travelCardList = document.querySelector(".travelCardList");
  const ticketName = document.querySelector("#ticketName");
  const ticketPicUrl = document.querySelector("#ticketPicUrl");
  const ticketPlace = document.querySelector("#ticketPlace");
  const ticketPrice = document.querySelector("#ticketPrice");
  const ticketNum = document.querySelector("#ticketNum");
  const ticketRank = document.querySelector("#ticketRank");
  const ticketDescription = document.querySelector("#ticketDescription");
  const ticketInputBtn = document.querySelector(".form__inputBtn");
  const travelSelect = document.querySelector("#travelSelect");
  let filterResult = document.querySelector("#filterResult");
  let data;

  //初始化 axios 抓資料
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
    axios
      .get(
        "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
      )
      .then(function (response) {
        data = response.data.data;
        showTravelCard();
      });
  }
  init();

  //最一開始的顯示資料
  function showTravelCard() {
    let cardList = "";
    data.forEach(function (item, index) {
      let card = `<li data-aos="fade-up" class="col-lg-4 col-md-6 col-12 travelCard">
      <div class ="travelCard__container box-shadow">
          <p class="card__place">${item.area}</p>
          <div class="travelCard__img">
            <img src="https://picsum.photos/900/600?image=${index + 10}" alt="">
          </div>
        <div class="travelCard__content">
          <div>
            <p class="card__rank">${item.rate}</p>
            <h4 class="card__name">${item.name}</h4>
            <p class="card__txt">${item.description}</p>
          </div>
          <div class="card__info">
            <p class="card__num"><i class="icon fas fa-exclamation-circle"></i>剩下最後 ${
              item.group
            } 組</p>
            <h5 class="card__price"><span>TWD</span>$${item.price}</h5>
          </div>
        </div>
      </div>
    </li>`;
      cardList += card;
    });
    // console.log(cardList)
    travelCardList.innerHTML = cardList;
  }

  //抓取資料產生物件
  function getTravelData() {
    let lastTravelData = data.length;
    const obj = {};
    obj.id = lastTravelData;
    obj.name = ticketName.value;
    obj.imgUrl = `https://picsum.photos/900/600?image=${lastTravelData + 10}`;
    obj.area = ticketPlace.value;
    obj.description = ticketDescription.value;
    obj.group = `${ticketNum.value}`;
    obj.price = ticketPrice.value;
    obj.rate = ticketRank.value;
    return obj;
  }

  //檢查表單空白
  function seeDataValue(obj) {
    const objKeysArray = Object.keys(obj);
    const objValuesArray = Object.values(obj);
    // 當某屬性為空字串，插入警告訊息
    objValuesArray.forEach(function (item, index) {
      if (index > 0) {
        let inputName = objKeysArray[index];
        let alertStr = document.querySelector(
          `#alertMessage_ticket_${inputName}`
        );
        if (item == "") {
          alertStr.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>此欄必填!</span>`;
        } else {
          alertStr.innerHTML = "";
        }
      }
    });
    //如果有一個沒填寫就不會產生小卡
    let result = objValuesArray.every(function (item) {
      return item !== "";
    });
    return result;
  }

  //檢查input值
  function checkFormLimit() {
    let ticketNumCheck = true;
    let ticketPriceCheck = true;
    let ticketRankCheck = true;
    if (ticketNum.value <= 0 || ticketNum.value > 100) {
      let alertStr = document.querySelector(`#alertMessage_ticket_group`);
      alertStr.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>套票組數需於1~99組之間</span>`;
      ticketNumCheck = false;
    }
    if (ticketPrice.value <= 0 || ticketPrice.value > 100000) {
      let alertStr = document.querySelector(`#alertMessage_ticket_price`);
      alertStr.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>套票金額需於1~10萬元之間</span>`;
      ticketPriceCheck = false;
    }
    if (ticketRank.value <= 0 || ticketRank.value > 10) {
      let alertStr = document.querySelector(`#alertMessage_ticket_rate`);
      alertStr.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>套票星級需於1~10級之間</span>`;
      ticketRankCheck = false;
    }
    if (
      ticketNumCheck == true &&
      ticketPriceCheck == true &&
      ticketRankCheck == true
    ) {
      return true;
    } else {
      return false;
    }
  }

  //推送資料進入陣列
  function addTravelCard(event) {
    event.preventDefault();
    let obj = getTravelData();
    console.log(obj);
    let checkState = seeDataValue(obj);
    let FormLimit = checkFormLimit();
    console.log(checkState);
    if (checkState == false) {
      return;
    } else if (FormLimit == false) {
      return;
    } else if (checkState == true && FormLimit == true) {
      data.push(obj);
      // console.log(obj)
      showTravelCard();
      formClean();
    }
  }

  //清除input
  function formClean() {
    ticketName.value = "";
    ticketPlace.value = "";
    ticketDescription.value = "";
    ticketNum.value = "";
    ticketPrice.value = "";
    ticketRank.value = "";
    ticketPicUrl.value = "";
  }

  //塞選卡片
  function travelCardFilter() {
    let targetPlace = travelSelect.value;
    let selectCard = [];
    if (targetPlace !== "不限") {
      selectCard = data.filter(function (item) {
        return item.area === targetPlace;
      });
    } else {
      selectCard = data.filter(function (item) {
        return item;
      });
    }
    let cardList = "";
    selectCard.forEach(function (item, index) {
      let card = `<li data-aos="fade-up" class="col-lg-4 col-md-6 col-12 travelCard">
      <div class ="travelCard__container box-shadow">
          <p class="card__place">${item.area}</p>
          <div class="travelCard__img">
            <img src="https://picsum.photos/900/600?image=${index + 10}" alt="">
          </div>
        <div class="travelCard__content">
          <div>
            <p class="card__rank">${item.rate}</p>
            <h4 class="card__name">${item.name}</h4>
            <p class="card__txt">${item.description}</p>
          </div>
          <div class="card__info">
            <p class="card__num"><i class="icon fas fa-exclamation-circle"></i>剩下最後 ${
              item.group
            } 組</p>
            <h5 class="card__price"><span>TWD</span>$${item.price}</h5>
          </div>
        </div>
      </div>
    </li>`;
      cardList += card;
    });
    // console.log(cardList)
    travelCardList.innerHTML = cardList;
    filterResult.textContent = `本次搜尋共 ${selectCard.length} 筆資料`;
  }

  ticketInputBtn.addEventListener("click", addTravelCard);
  travelSelect.addEventListener("change", travelCardFilter);
});
