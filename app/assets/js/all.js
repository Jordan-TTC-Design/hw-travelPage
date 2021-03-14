$(document).ready(() => {
  // console.log('Hello Bootstrap4');
  //aos套件
  AOS.init({
    once: true,
  })
  const travelCardList = document.querySelector('.travelCardList')
  const ticketName = document.querySelector('#ticketName')
  const ticketPicUrl = document.querySelector('#ticketPicUrl')
  const ticketPlace = document.querySelector('#ticketPlace')
  const ticketPrice = document.querySelector('#ticketPrice')
  const ticketNum = document.querySelector('#ticketNum')
  const ticketRank = document.querySelector('#ticketRank')
  const ticketDescript = document.querySelector('#ticketDescript')
  const ticketInputBtn =document.querySelector('.form__inputBtn')
  const travalSelect =document.querySelector('#travalSelect')
  let  filterResult  = document.querySelector('#filterResult')
  //最一開始的顯示資料
  function showTravelCard(){
    let cardList = '';
    data.forEach(function (item, index) {
      let card = `<li data-aos="fade-up" class="travelCard box-shadow">
        <p class="card__place">${item.area}</p>
        <div class="travelCard__img">
            <img src="https://picsum.photos/900/600?image=${index+10}" alt="">
        </div>
      <div class="travelCard__content">
        <div>
          <p class="card__rank">${item.rate}</p>
          <h4 class="card__name">${item.name}</h4>
          <p class="card__txt">${item.description}</p>
        </div>
        <div class="card__info">
          <p class="crad__num"><i class="icon fas fa-exclamation-circle"></i>剩下最後 ${item.group} 組</p>
          <h5 class="card__price"><span>TWD</span>$${item.price}</h5>
        </div>
      </div>
    </li>`
      cardList += card
    })
    // console.log(cardList)
    travelCardList.innerHTML = cardList
  }
  showTravelCard();

  //抓取資料產生物件
  function getTravelData(){
      console.log(priceTxt)
      let lastTravelData = data.length-1
      const obj ={}
      obj.id = lastTravelData
      obj.name = ticketName.value
      obj.imgUrl = `https://picsum.photos/900/600?image=${lastTravelData+10}`
      obj.area = ticketPlace.value
      obj.description = ticketDescript.value
      obj.group = `剩下最後 ${ticketNum.value} 組`
      obj.price = ticketPrice.value
      obj.rate = ticketRank.value
      formClean()
      return obj;
  };

//檢查表單空白
function checkFormBlank(){
  if(ticketName.value==''){
    alert('套票名稱未填');
    ticketName.focus();
    return false;
  }
  if(ticketPicUrl==''){
    alert('圖片網址未填');
    ticketPicUrl.focus();
    return false;
  }
  if(ticketPlace==''){
    alert('景點地區未填');
    ticketPlace.focus();
    return false;
  }
  if(ticketPrice==''){
    alert('套票金額未填');
    ticketPrice.focus();
    return false;
  }
  if(ticketNum==''){
    alert('套票組數未填');
    ticketNum.focus();
    return false;
  }
  if(ticketRank==''){
    alert('套票星級未填');
    ticketRank.focus();
    return false;
  }
  if(ticketDescript==''){
    alert('套票描述未填');
    ticketDescript.focus();
    return false;
  }
  return true;
}

//檢查input值
function checkFormLimit(){
  if(ticketNum.value>100){
    alert(`套票組數最多99組`)
    ticketNum.focus();
    return false;   
  }
  if(ticketPrice.value>100000){
    alert(`套票金額最高10萬元`)
    ticketPrice.focus();
    return false;
  }
  if(ticketRank.value>10){
    alert(`套票星級最高10分`)
    ticketRank.focus();
    return false;
  }
  return true;
}

  //推送資料進入陣列
  function addTravelCard(){
    let checkState = checkFormBlank()
    let FormLimit = checkFormLimit()
    // console.log(checkState)
    if(checkState == false){
    return
    }else if(FormLimit==false){
      return
    }else if(checkState == true && FormLimit==true){
      let obj = getTravelData()
      // console.log(obj)
      data.push(obj)
      // console.log(obj)
      showTravelCard()
    }
  }

  //清除input
  function formClean(){
    ticketName.value = ''
    ticketPlace.value =''
    ticketDescript.value =''
    ticketNum.value = ''
    ticketPrice.value = ''
    ticketRank.value =''
    ticketPicUrl.value = ''
  }

  //塞選卡片
  function travalCardFilter(){
    let targetPlace = travalSelect.value
    let selectCard =[];
    if(targetPlace !=='不限'){
       selectCard = data.filter(function(item){
        return item.area === targetPlace
      });
    }else{
       selectCard = data.filter(function(item){
        return item
      });
    }
    let cardList = '';
      selectCard.forEach(function (item, index) {
        let card = `<li data-aos="fade-up" class="travelCard box-shadow">
          <p class="card__place">${item.area}</p>
          <div class="travelCard__img">
              <img src="https://picsum.photos/900/600?image=${index+10}" alt="">
          </div>
        <div class="travelCard__content">
          <div>
            <p class="card__rank">${item.rate}</p>
            <h4 class="card__name">${item.name}</h4>
            <p class="card__txt">${item.description}</p>
          </div>
          <div class="card__info">
            <p class="crad__num"><i class="icon fas fa-exclamation-circle"></i> 剩下最後 ${item.group} 組</p>
            <h5 class="card__price"><span>TWD</span>$${item.price}</h5>
          </div>
        </div>
      </li>`
        cardList += card
      })
      // console.log(cardList)
      travelCardList.innerHTML = cardList
      filterResult.textContent = `本次搜尋共 ${selectCard.length} 筆資料`
    
  }
  ticketInputBtn.addEventListener('click',addTravelCard)
  travalSelect.addEventListener('change',travalCardFilter)
})
