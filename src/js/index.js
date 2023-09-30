$(function () {
  //Fixed Header  and PageUp
  let header = $("#header");
  let intro = $("#intro");
  let pageUp = $(".pageup");
  let introHeight;
  let scrollPosition = $(window).scrollTop();

  $(window).on("scroll load resize", function () {
    introHeight = intro.innerHeight();
    scrollPosition = $(this).scrollTop();

    //Fixed Animate Header
    if (scrollPosition > introHeight) {
      header.addClass("fixed animated fadeIn");
    } else {
      header.removeClass("fixed fadeIn");
    }

    //Animate PageUp
    if (scrollPosition > 1260) {
      pageUp.addClass("animated fadeIn");
      pageUp.removeClass("fadeOut");
    } else {
      pageUp.addClass("fadeOut");
      pageUp.removeClass("fadeIn");
    }
  });

  //Smooth Scroll
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    let elementId = $(this).data("scroll");
    let elementOffset = $(elementId).offset().top;

    $("html, body").animate(
      {
        scrollTop: elementOffset - 50,
      },
      1500
    );
  });

  //Slick Slider
  let slider = $(".gallery__list");
  let prevArrow = $(".arrow-previous");
  let nextArrow = $(".arrow-next");

  slider.slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    dots: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  //Modals
  let btnPopup = $(".btnCallBack");
  let popupCallBack = $(".popup--callback");
  let popupClose = $(".popup__close-icon");

  btnPopup.on("click", function () {
    popupCallBack.addClass("show");
  });

  popupClose.on("click", function () {
    popupCallBack.removeClass("show");
  });

  //Answers
  let asks = $(".asks__item");
  asks.each(function () {
    $(this).on("click", function () {
      let answer = $(this).find(".answer");
      answer.addClass("show");
    });

    $(this).on("click", ".answer__close-icon", function (event) {
      event.stopPropagation();
      $(this).closest(".answer").removeClass("show");
    });
  });

  //Forms
  const forms = () => {
    let form = document.querySelectorAll("form"),
      inputs = document.querySelectorAll("input");

    //Блок ответа
    let answerBlock = document.createElement("div");
    answerBlock.classList.add("popup__answer");

    //Ответы для клиента
    let message = {
      loading: "Загрузка...",
      success:
        "Спасибо за Ваше обращение! Мы свяжемся с Вами в течении 10 минут.",
      fail: "Извините! Что-то пошло не так...",
      loadingImg: "./img/loading.gif",
      successImg: "./img/answer-success.png",
    };

    form.forEach((item) => {
      item.addEventListener("submit", function (event) {
        event.preventDefault();

        //Создаем блок показа ответа
        document.body.append(answerBlock);

        let answerImg = document.createElement("img");
        answerImg.setAttribute("src", message.loadingImg);
        answerBlock.append(answerImg);

        let answerText = document.createElement("p");
        answerBlock.append(answerText);
        answerText.innerHTML = message.loading;

        //Функция удаления блока
        function delAnswer() {
          setTimeout(function () {
            answerBlock.remove();
            answerImg.remove();
            answerText.remove();
          }, 4000);
        }

        //Запрос
        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader(
          "Content-type",
          "application/json; charset=utf-8"
        );

        let formData = new FormData(item);

        //Преобразование полученных данных в JSON
        let obj = {};
        formData.forEach(function (value, key) {
          obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener("readystatechange", function () {
          if (request.readyState === 4 && request.status === 200) {
            answerImg.setAttribute("src", message.successImg);
            answerText.innerHTML = message.success;
            delAnswer();
          } else {
            answerText.innerHTML = message.fail;
            delAnswer();
          }
        });

        //Очистка полей после запроса
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = "";
        }
      });
    });
  };
  forms();
});
