$(document).ready(() => {
  // console.log('Hello Bootstrap4');
  //aos套件
  AOS.init({
    once: true,
  })
  const travelCardList = document.querySelector('.travelCardList')
  let cardList = '';
  data.forEach(function (item, index) {
    let card = `<li class="col-4">
    <div class="travelCard box-shadow">
      <p class="card__place">${item.area}</p>
      <div class="travelCard__img">
          <img src="https://i.imgur.com/QXa1fMZ.png" alt="">
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
  </div>
  </li>`
    cardList += card
  })
  console.log(cardList)
  travelCardList.innerHTML = cardList
})
