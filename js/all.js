var high = document.getElementById('height').value ||0;//user身高
var wei = document.getElementById('weight').value ||0;//user體重
var sta;//BMI狀態
var col;//BMI狀態顏色
var el = document.getElementById('countId');//計算按鈕
var tol = document.querySelector('.count');
var data = JSON.parse(localStorage.getItem('dataList')) || [];
var list = document.querySelector('.list');
var ref = document.querySelector('.reflash');
el.addEventListener('click',count,false);
list.addEventListener('click',deleteData,false);
//ref.addEventListener('click',reload,false);
updataList(data);


function count(e){
    //取得時間
    var Today=new Date();//計算當下的時間
    var currentTime = (Today.getMonth()+1)+'-'+Today.getDate()+'-'+Today.getFullYear();
    console.log(currentTime);
    //BMI 計算
    var high = parseFloat(document.getElementById('height').value)/100;
    var wei = parseInt(document.getElementById('weight').value);
    var str = '';
    var content='';
    var result = (wei/Math.pow(high,2)).toFixed(1);
    if(result<18.5){
        col='#31BAF9';
        sta='過輕';
        content='<div class="circle tooLight">'+'<p class="resultStyle" style="color:#31BAF9">'+result+'<span>'+'</span>'+'</p>'+'<span class="lightText desText">過輕</span>'+'<a class="reflash lightRe">'+'<img src="https://github.com/andrew-HuangHaoChe/image/blob/master/icons_loop.png?raw=true" alt="">'+'</a>'+'</div>';
    }
    else if(result>=18.5 && result<24){
        col='#86D73F';
        sta='理想';
        content='<div class="circle perfect">'+'<p class="resultStyle" style="color:#86D73F">'+result+'</p>'+'<span class="perfectText desText">理想</span>'+'<a class="reflash perfectRe">'+'<img src="https://github.com/andrew-HuangHaoChe/image/blob/master/icons_loop.png?raw=true" alt="">'+'</a>'+'</div>';
    }
    else if(result>=24 && result<27){
        col='#FF982D';
        sta='過重';
        content='<div class="circle tooHeavy">'+'<p class="resultStyle" style="color:#FF982D">'+result+'</p>'+'<span class="tooheavyText desText">過重</span>'+'<a class="reflash tooHeavyRe">'+'<img src="https://github.com/andrew-HuangHaoChe/image/blob/master/icons_loop.png?raw=true" alt="">'+'</a>'+'</div>';
    }
    else if(result>=27 && result<30){
        col='#FF6C02';
        sta='輕度肥胖';
        content='<div class="circle mildOb">'+'<p class="resultStyle" style="color:#FF6C02">'+result+'</p>'+'<span class="mildObText fdesText">輕度肥胖</span>'+'<a class="reflash mildobRe">'+'<img src="https://github.com/andrew-HuangHaoChe/image/blob/master/icons_loop.png?raw=true" alt="">'+'</a>'+'</div>';
    }
    else if(result>=30 && result<35){
        col='#FF6C02';
        sta='中度肥胖';
        content='<div class="circle moderOb">'+'<p class="resultStyle" style="color:#FF6C02">'+result+'</p>'+'<span class="moderObText fdesText">中度肥胖</span>'+'<a class="reflash moderobRe">'+'<img src="https://github.com/andrew-HuangHaoChe/image/blob/master/icons_loop.png?raw=true" alt="">'+'</a>'+'</div>';
    }
    else if(result>=35){
        col='#FF1200';
        sta='重度肥胖';
        content='<div class="circle sevOb">'+'<p class="resultStyle" style="color:#FF1200">'+result+'</p>'+'<span class="sevObText fdesText">重度肥胖</span>'+'<a class="reflash sevobRe">'+'<img src="https://github.com/andrew-HuangHaoChe/image/blob/master/icons_loop.png?raw=true" alt="">'+'</a>'+'</div>';
    }
    else{
        content='';
    }
    
    str += content;
    tol.innerHTML = str;
    

    //表單驗證
    var inHigh = document.getElementById('height').value;
    var inWei = document.getElementById('weight').value;
    if(isNaN(inHigh)||isNaN(inWei) ||inHigh== ""||inWei==""){
        alert('請輸入身高和體重');
        return false;
    }
    

    //送資料到localstorage
    var userInf={
        Color:col,
        Status:sta,
        userBMI:result,
        height:high,
        weight:wei,
        Date:currentTime,
    };
    data.push(userInf);
    updataList(data);
    localStorage.setItem('dataList',JSON.stringify(data));
}



function updataList(item){
     var str='';
     var leftBar='';
     var Len = item.length;
     for(var i=0;i<Len;i++){
        str+='<li><div class="record">'+'<span class="leftBar">'+item[i].Status+'</span>'+'<span>'+'<small>BMI</small>'+item[i].userBMI+'</span>'+'<span>'+'<small>weight</small>'+item[i].weight+'</span>'+'<span>'+'<small>height</small>'+item[i].height+'</span>'+'<span>'+item[i].Date+'</span>'+'<a href="#" data-num = ' + i + '><i class="fas fa-trash"></i></a>'+'</div>'+'</li>'
     }
     list.innerHTML = str;
     var bar = document.querySelectorAll('.leftBar');
for(var i=0;i<bar.length;i++){
    if(bar[i].textContent === "過輕"){
        bar[i].classList.add('lightBar')
    }
    else if(bar[i].textContent === "理想"){
        bar[i].classList.add('perfectBar')
    }
    else if(bar[i].textContent === "過重"){
        bar[i].classList.add('tooHeavyBar')
    }
    else if(bar[i].textContent === "輕度肥胖"){
        bar[i].classList.add('mildobBar')
    }
    else if(bar[i].textContent === "中度肥胖"){
        bar[i].classList.add('moderobBar')
    }
    else if(bar[i].textContent === "重度肥胖"){
        bar[i].classList.add('sevobBar')
    }
}
}

//刪除表單
function deleteData(e){
    e.preventDefault();
    if(e.target.nodeName !=='I'){return};
    var index = e.target.dataset.num;
    data.splice(index,1);
    localStorage.setItem('dataList',JSON.stringify(data));
    updataList(data);
}
//重整按鈕
/*function reload(e){
    e.preventDefault();
    if(e.target.nodeName!=='A'){return};

}*/