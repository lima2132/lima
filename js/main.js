const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  nav: false,
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});
document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

(function ($) {
  $(function () {
    $("ul.catalog__tabs").on(
      "click",
      "li:not(.catalog__tab_active)",
      function () {
        $(this)
          .addClass("catalog__tab_active")
          .siblings()
          .removeClass("catalog__tab_active")
          .closest("div.container")
          .find("div.catalog__content")
          .removeClass("catalog__content_active")
          .eq($(this).index())
          .addClass("catalog__content_active");
      }
    );
    $(".catalog-item__link").each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
    $(".catalog-item__back").each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  });

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("fast");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("fast");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("fast");
    });
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href^='#']").click(function () {
    var _href = $(this).attr("href");
    $("html, body".animate({ scrollTop: $(_href).offset().top + "px" }));
    return false;
  });
})(jQuery);

function validateForms(form) {
  const validation = new JustValidate(form);
  validation
    .addField(".form-name", [
      {
        rule: "required",
        errorMessage: "Пожалуйста, введите свое имя",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Введите минимум 2 символа",
      },
    ])
    .addField(".form-phone", [
      {
        rule: "required",
        errorMessage: "Пожалуйста, введите номер телефона",
      },
    ])
    .addField(".form-email", [
      {
        rule: "required",
        errorMessage: "Пожалуйста, введите свой Email",
      },
      {
        rule: "email",
        errorMessage: "неправильно введен Email",
      },
    ])
    .onSuccess(async function () {
      let data = {
        name: document.querySelector(".form-name").value,
        tel: selector.inputmask.unmaskedvalue(),
        msg: document.querySelector("form-email").value,
      };

      let response = await fetch("mail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      let result = await response.text();

      alert(result);
    });
}
validateForms("#consultation-form");
validateForms("#order");
validateForms("#consultation");

function maskPhone(form) {
  const selector = document.querySelector(form);
  const im = new Inputmask("+7(999)999-99-99");
  im.mask(selector);
}

maskPhone("#phone-main");
maskPhone("#phone-order");
maskPhone("#phone-consultation");

new WOW().init();

// var name = "ivan";

// let number = 7;
// const pi = 3.14;

// number = 4;

// let leftBorderWidth = 200;

// number
// string - "", '', ``.
// true/false
// null
// undefined
//  let obj {
//     name: 'apple',
//     color: 'green',
//     weight: 200
// }
// Symbol

// alert(1234);
// console.log(number);
// let answer = confirm("Вам есть 18?");
// console.log(answer);

// let answer = prompt("Вам есть 18?");
// console.log(answer);
