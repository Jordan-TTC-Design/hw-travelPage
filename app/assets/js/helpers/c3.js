//開始整理c3.js需要的data

//計算各地區總數量
function c3Data() {
  let locationNum = {};
  data.forEach(function (item, index) {
    if (locationNum[item.area] == undefined) {
      locationNum[item.area] = 1;
    } else {
      locationNum[item.area] += 1;
    }
  });
  console.log(locationNum);
  //抓出物件屬性
  let newData = [];
  let locationNameList = Object.keys(locationNum);

  locationNameList.forEach(function (item) {
    let array = [];
    array.push(item);
    array.push(locationNum[item]);
    newData.push(array);
  });
  // console.log(newData);
  //一定要透過參數傳入值
  c3Render(newData);
}

//渲染圖表
function c3Render(newData) {
  // console.log(newData);
  let chart = c3.generate({
    bindto: "#chart--location", // HTML 元素綁定
    data: {
      columns: newData,
      type: "donut",
      onclick: function (d, i) {
        console.log("onclick", d, i);
      },
      onmouseover: function (d, i) {
        console.log("onmouseover", d, i);
      },
      onmouseout: function (d, i) {
        console.log("onmouseout", d, i);
      },
    },
    color: {
      pattern: ["#E68618", "#25C0C7", "#5151D3"],
    },
    donut: {
      title: "套票地區比重",
      label: {
        show: false,
      },
      width: 12,
    },
  });
}
