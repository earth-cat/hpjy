(function () {
  /* a标签的target="_blank" */
  const html = document.documentElement || document.body;

  const fonA = function (ev) {
    if (ev.target.tagName === "A") {
      let hrefs = ev.target.getAttribute('href');
      if (hrefs !== "javascript:;") {
        ev.target.setAttribute('target', "_blank");
      }
    }
  }


  /* 登录和16+ */
  const loginBtn = Array.from(document.querySelectorAll(".top_nav_btn .login_btn")),
    diaLogin = document.querySelector(".dia_login"),
    closeBtn = document.querySelector(".close_btn"),
    Overlay = document.querySelector("._overlay_"),
    yearHint = document.querySelector('.year_hint'),
    yearPop = document.querySelector('.year_pop'),
    yearClose = document.querySelector('.year_close');

  loginBtn.forEach(item => {
    item.onclick = function () {
      diaLogin.style.display = "block";
      Overlay.style.display = "block";
    }
  })
  closeBtn.onclick = function () {
    diaLogin.style.display = "none";
    Overlay.style.display = "none";
  }
  yearHint.onclick = function () {
    yearPop.style.display = "block";
    Overlay.style.display = "block";
  }
  yearClose.onclick = function () {
    yearPop.style.display = "none";
    Overlay.style.display = "none";
  }



  /* 上轮播图 */
  const container = document.querySelector('.swiper_container'),
    adPic = container.querySelector('.adPic'),
    aLs = Array.from(adPic.querySelectorAll('.adPic a')),
    adBtnList = Array.from(container.querySelectorAll('.adBtn a'));
  let count = aLs.length,
    step = 0,
    interval = 3500,
    speed = 300,
    autoTimer = null,
    w = container.offsetWidth;

  const autoFocus = function autoFocus() {
    let temp = step;
    if (temp >= count - 1) temp = 0;
    adBtnList.forEach((pagination, index) => {
      if (index === temp) {
        pagination.className = 'on';
        return;
      }
      pagination.className = '';
    });
  };
  const swiperInit = function swiperInit() {
    let clone = aLs[0].cloneNode(true);
    adPic.appendChild(clone);
    count++;
    aLs.push(clone);
    adPic.style.width = `${count * w}px`;
    if (step < 0) step = 0;
    if (step > count - 1) step = count - 1;
    adPic.style.transitionDuration = '0ms';
    adPic.style.left = `${-step * w}px`;
    autoFocus();
  };
  swiperInit();

  const moveToNext = function moveToNext() {
    step++;
    if (step >= count) {
      adPic.style.transitionDuration = `0ms`;
      adPic.style.left = `0`;
      step = 1;
      adPic.offsetWidth;
    }
    adPic.style.transitionDuration = `${speed}ms`;
    adPic.style.left = `${-step * w}px`;
    autoFocus();
  };
  if (autoTimer === null) autoTimer = setInterval(moveToNext, interval);

  container.onmouseenter = function () {
    clearInterval(autoTimer);
    autoTimer = null;
  };
  container.onmouseleave = function () {
    if (autoTimer === null) autoTimer = setInterval(moveToNext, interval);
  };
  document.onvisibilitychange = function () {
    if (document.hidden) {
      clearInterval(autoTimer);
      autoTimer = null;
      return;
    }
    if (autoTimer === null) autoTimer = setInterval(moveToNext, interval);
  };

  adBtnList.forEach((pagination, index) => {
    pagination.onclick = function () {
      if (step === index) return;
      step = index;
      adPic.style.transitionDuration = `${speed}ms`;
      adPic.style.left = `${-step * w}px`;
      autoFocus();
    };
  });




  /* 新闻选项卡 */
  const news = function news() {
    const topTabsA = Array.from(document.querySelectorAll('.tab_menu_top a')),
      boxList = Array.from(document.querySelectorAll('.tab_top_box .box'));
    for (var i = 0; i < topTabsA.length; i++) {
      topTabsA[i].onclick = (function (i) {
        return function () {
          ary(i)
        }
      })(i)
    }
    let ary = function ary(ite) {
      for (var a = 0; a < topTabsA.length; a++) {
        topTabsA[a].className = '';
        boxList[a].style.display = 'none';
      }
      topTabsA[ite].className = 'hover';
      boxList[ite].style.display = 'block';
    }

  }

  /* 侧边导航 */
  const slideMunu = document.querySelector(".slide_munu"),
    Back = slideMunu.querySelector(".back");
  Back.onclick = function (ev) {
    if (ev.target.className === "back") {
      ev.target.className += ' on';
      slideMunu.style.right = "-200px";
      return
    }
    ev.target.className = 'back'
    slideMunu.style.right = 0;
  }
  window.onscroll = function () {
    const htmlTop = document.documentElement.scrollTop || document.body.scrollTop
    if (htmlTop > 600) {
      slideMunu.style.display = 'block';
    } else {
      slideMunu.style.display = 'none'
    }
  }

  /* 页卡 */

  const section4 = function section4(videoUlLis, vlistStyle, lis) {
    let ary = function ary(ite) {
      for (var a = 0; a < videoUlLis.length; a++) {
        videoUlLis[a].className = '';
        vlistStyle[a].style.display = 'none';
      }
      videoUlLis[ite].className = 'on';
      vlistStyle[ite].style.display = 'flex';
    }
    for (var i = 0; i < videoUlLis.length; i++) {
      if (videoUlLis[i] === lis) {
        ary(i)
      }
    }
  }
  const fonViLi = function (ev) {
    let lis = ev.target;
    if (lis.parentNode.className === "video_ul") {
      let fa = lis.parentNode.parentNode.parentNode.className,
        fas = document.querySelector(`.${fa}`),
        videoUlLis = Array.from(fas.querySelectorAll(".video_ul li")),
        vlistStyle = Array.from(fas.querySelectorAll(".vlist_style"));
      section4(videoUlLis, vlistStyle, lis, );
    }
  }
  /* section2 */
  const sec2Json = function sec2Json() {
    return new Promise(resslve => {
      let xhr = new XMLHttpRequest;
      xhr.open("get", "xwq.json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 400) {
            let data = JSON.parse(xhr.response);
            resslve(data)
          }
        }
      }
      xhr.send();
    })
  }
  sec2Json().then(value => {
    let {
      blqxzh_17,
      blwfz_cf,
      bldtzh_94,
      blzjzh_4c
    } = value,
    sec2SwiperWf = document.querySelector(".sec2_swiper_wf .swiper-wrapper"),
      sec2SwiperZj = document.querySelector(".sec2_swiper_zj .swiper-wrapper"),
      sec2SwiperWq = document.querySelector(".sec2_swiper_wq .swiper-wrapper"),
      sec2SwiperDt = document.querySelector(".sec2_swiper_dt .swiper-wrapper"),
      sec2SwiperWfUrl = ``,
      sec2SwiperZjUrl = ``,
      sec2SwiperWqUrl = ``,
      sec2SwiperDtUrl = ``;
    blwfz_cf.forEach(item => {
      let blwft7e = item.blwft_7e;
      sec2SwiperWfUrl += `<div class="swiper-slide">
            <img src="${blwft7e}" alt="">
          </div>`
    })
    sec2SwiperWf.innerHTML = sec2SwiperWfUrl;
    var mySwiper = new Swiper('.sec2_swiper_wf', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    })
    blzjzh_4c.forEach(item => {
      let blzjt1b = item.blzjt_1b;
      sec2SwiperZjUrl += `<div class="swiper-slide">
            <img src="${blzjt1b}" alt="">
          </div>`
    })
    sec2SwiperZj.innerHTML = sec2SwiperZjUrl;
    var mySwiper = new Swiper('.sec2_swiper_zj', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    })

    blqxzh_17.forEach((item, index) => {
      let blqdt98 = item.blqdt_98,
        blqxmee = item.blqxm_ee;
      sec2SwiperWqUrl += `<div class="swiper-slide ${index===0?'on':''}">
        <div>
          <span>
            <img src="${blqdt98}" alt="">
          </span>
          <span class='swip_sp2'>${blqxmee}</span>
        </div>
        </div>`
    })
    sec2SwiperWq.innerHTML = sec2SwiperWqUrl;
    var mySwiper = new Swiper('.sec2_swiper_wq', {
      slidesPerView: 6,
      navigation: {
        nextEl: '.swiper_button_next',
        prevEl: '.swiper_button_prev',
      },
      preventClicksPropagation: false,
    })
    let sec2onc = Array.from(document.querySelectorAll(".sec2_swiper_wq .swiper-slide"));
    for (var i = 0; i < sec2onc.length; i++) {
      sec2onc[i].onclick = (function (i) {
        return function () {
          ary(i)
          actxr(i);
        }
      })(i)
    }
    let ary = function ary(ite) {
      for (var a = 0; a < sec2onc.length; a++) {
        sec2onc[a].className = sec2onc[a].className.replace("on", '');
      }
      sec2onc[ite].className += ' on';
    }
    let actxr=function actxr(i){
        let sec2Top=document.querySelector(".sec2_top"),
        sec2List=document.querySelector('.sec2_list'),
        sec2Bigimg=document.querySelector('.sec2_bigimg'),
        sec2ListUrl=``;
       let {blqxm_ee,blqxlm_08,kj_14,blqjswa_78,blqdt_98,blqxpjzh_b2}= blqxzh_17[i];
       sec2Top.innerHTML=`<span class="sec2_sp1">${blqxm_ee}</span>
       <span class="sec2_sp2">${blqxlm_08}</span>
       <span class="sec2_sp3">
         <i>口径：</i>
         ${kj_14}
       </span>
       <span class="sec2_sp4">
           ${blqjswa_78}
       </span>`;
       blqxpjzh_b2.forEach(item=>{
         let {pjm_40,blqpjt_8d}=item;
         sec2ListUrl+=`<li>
         <span class="sec2_list_sp1">
           <img src="${blqpjt_8d}" alt="">
         </span>
         <span class="sec2_list_sp2">${pjm_40}</span>
       </li>`
       });
       sec2List.innerHTML=sec2ListUrl;
       sec2Bigimg.innerHTML=`<img src="${blqdt_98}" alt="">`;
      }
      actxr(0)

      bldtzh_94.forEach((item, index) => {
        let bldt3c = item.bldt_3c,
        bldtme1 = item.bldtm_e1;
        sec2SwiperDtUrl += `<div class="swiper-slide ${index===0?'on':''}">
            <span>
              <img src="${bldt3c}" alt="">
            </span>
            <span class='swip_sp2'>${bldtme1}</span>
          </div>`
      })
      sec2SwiperDt.innerHTML = sec2SwiperDtUrl;
      var mySwiper = new Swiper('.sec2_swiper_dt', {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween : 20,
        centeredSlidesBounds: true,
      })
      let sec2ocdt = Array.from(document.querySelectorAll(".sec2_swiper_dt .swiper-slide"));
      for (var i = 0; i < sec2ocdt.length; i++) {
        sec2ocdt[i].onclick = (function (i) {
          return function () {
            aryz(i);
            actdt(i);
          }
        })(i)
      }
      let aryz = function aryz(ite) {
        for (var a = 0; a < sec2ocdt.length; a++) {
          sec2ocdt[a].className = sec2ocdt[a].className.replace("on", '');
        }
        sec2ocdt[ite].className += ' on';
      }
      let actdt=function actdt(i){
        let set2Left3=document.querySelector(".set2_left_3");
        let {bldt_3c}=bldtzh_94[i]
        set2Left3.innerHTML=`<img src="${bldt_3c}" alt="" class="vlist_style_dt">`
      }
      actdt(0);
  })

  const dayList=Array.from(document.querySelectorAll(".day_list li"));
  for (var v = 0; v < dayList.length; v++) {
    dayList[v].onclick = (function (v) {
      return function () {
        ary(v)
      }
    })(v)
  }
  
  let ary = function ary(ite) {
    for (var a = 0; a < dayList.length; a++) {
      dayList[a].className = '';
    }
    dayList[ite].className = 'selectli';
  }
  
  /* 热门排行 */
  const hotRanking = function hotRanking() {
    let set3RightA = Array.from(document.querySelectorAll(".set3_right_data a")),
      sec3List = Array.from(document.querySelectorAll(".sec3_list"));
    for (var i = 0; i < set3RightA.length; i++) {
      set3RightA[i].onclick = (function (i) {
        return function () {
          ary(i)
        }
      })(i)
    }
    let ary = function ary(ite) {
      for (var a = 0; a < set3RightA.length; a++) {
        set3RightA[a].className = '';
        sec3List[a].style.display = 'none';
      }
      set3RightA[ite].className = 'active';
      sec3List[ite].style.display = 'block';
    }
  }

  /* 下轮播 */
  const sec6Swiper = document.querySelector('.sec6_swiper_wrap .swiper-wrapper');
  const dbSwiper = function dbSwiper() {
    return new Promise(resslve => {
      let xhr = new XMLHttpRequest;
      xhr.open("get", 'xialunbo.json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 400) {
            let data = JSON.parse(xhr.response);
            resslve(data.tst_db)
          }
        }
      }
      xhr.send();
    })
  }

  dbSwiper().then(value => {
    let imgUrl = ``;
    value.forEach((item) => {
      let pcdtst = item.pcdtst_c0;
      imgUrl += `<div class="swiper-slide">
            <img src="${pcdtst}" alt="">
          </div>`
    })
    sec6Swiper.innerHTML = imgUrl;
    var mySwiper = new Swiper('.sec6_swiper_wrap', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper_button_next',
        prevEl: '.swiper_button_prev',
      },
    })
  });



  html.addEventListener("click", fonA);
  html.addEventListener("click", fonViLi)
  hotRanking()
  news()
})()