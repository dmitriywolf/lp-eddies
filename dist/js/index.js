$((function(){let e,t=$("#header"),n=$("#intro"),o=$(".pageup"),s=$(window).scrollTop();$(window).on("scroll load resize",(function(){e=n.innerHeight(),s=$(this).scrollTop(),s>e?t.addClass("fixed animated fadeIn"):t.removeClass("fixed fadeIn"),s>1260?(o.addClass("animated fadeIn"),o.removeClass("fadeOut")):(o.addClass("fadeOut"),o.removeClass("fadeIn"))})),$("[data-scroll]").on("click",(function(e){e.preventDefault();let t=$(this).data("scroll"),n=$(t).offset().top;$("html, body").animate({scrollTop:n-50},1500)}));let a=$(".gallery__list"),i=$(".arrow-previous"),l=$(".arrow-next");a.slick({infinite:!0,slidesToShow:3,slidesToScroll:1,fade:!1,arrows:!0,dots:!0,prevArrow:i,nextArrow:l,responsive:[{breakpoint:768,settings:{slidesToShow:2}},{breakpoint:420,settings:{slidesToShow:1}}]});let r=$(".btnCallBack"),c=$(".popup--callback"),d=$(".popup__close-icon");r.on("click",(function(){c.addClass("show")})),d.on("click",(function(){c.removeClass("show")})),$(".asks__item").each((function(){$(this).on("click",(function(){$(this).find(".answer").addClass("show")})),$(this).on("click",".answer__close-icon",(function(e){e.stopPropagation(),$(this).closest(".answer").removeClass("show")}))}));(()=>{let e=document.querySelectorAll("form"),t=document.querySelectorAll("input"),n=document.createElement("div");n.classList.add("popup__answer");let o="Загрузка...",s="Спасибо за Ваше обращение! Мы свяжемся с Вами в течении 10 минут.",a="Извините! Что-то пошло не так...",i="./img/loading.gif",l="./img/answer-success.png";e.forEach(e=>{e.addEventListener("submit",(function(r){r.preventDefault(),document.body.append(n);let c=document.createElement("img");c.setAttribute("src",i),n.append(c);let d=document.createElement("p");function u(){setTimeout((function(){n.remove(),c.remove(),d.remove()}),4e3)}n.append(d),d.innerHTML=o;let p=new XMLHttpRequest;p.open("POST","server.php"),p.setRequestHeader("Content-type","application/json; charset=utf-8");let f=new FormData(e),m={};f.forEach((function(e,t){m[t]=e}));let h=JSON.stringify(m);p.send(h),p.addEventListener("readystatechange",(function(){4===p.readyState&&200===p.status?(c.setAttribute("src",l),d.innerHTML=s,u()):(d.innerHTML=a,u())}));for(let e=0;e<t.length;e++)t[e].value=""}))})})()}));