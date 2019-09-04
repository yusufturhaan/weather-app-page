import { $, Swiper } from "./vendors";

$(document).ready(() => {

  const $accordions = $('.accordion');  
  $.each($accordions, (index, accordion) => {
    const $accordion = $(accordion);
    $accordion.find('.js-accordion-toggle').click(({ currentTarget }) => {
        const index = $(currentTarget).parent().index();
          const $accordionContent = $accordion.find('.accordion__content').eq(index);
        $accordionContent.toggle();
    });
  });
});

const tab = (() => {
  const $tabs = $('.tab');

  const init = () => {
    $.each($tabs, (index, tab) => {
      const $tab = $(tab);
      const $tabContents = $tab.find('.tab__content');
      $tabContents.hide();
      $tabContents.eq(0).show();
      $tabs.find('.js-tab').click(({ currentTarget }) => {
          const index = $(currentTarget).index();
            $tabContents.hide();
            const $tabContent = $tabContents.eq(index);
          $tabContent.toggle();
      });
    });
  };

  return {
    init,
  };
})();

var swiper = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  loop: true,
  slidesPerView: 'auto',
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  // nextButton: '.js-swiper-button-next',
  // prevButton: '.js-swiper-button-prev',
  spaceBetween: 30,
  coverflow: {
    rotate: 5,
    stretch: 0,
    depth: 100,
    modifier: 3,
    slideShadows: false,
  }, navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

var btn = $("#button");

$(window).scroll(function () {
  if ($(window).scrollTop() >= 1100) {
    btn.fadeIn(100);
  } else {
    btn.fadeOut();
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 1800);
});
var btn1 = $("#button2");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn1.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: $(document).height() }, 2000);
});

const api = (() => {
  const getCategories = callback => $.get('https://my-json-server.typicode.com/yusufturhaan/api/categories').done(response => callback(response));
  const getProducts = (categoryId, callback) => $.get(`https://my-json-server.typicode.com/yusufturhaan/api/products?productCategory=${categoryId}`).done(response => callback(response));

  return {
    getCategories,
    getProducts,
  };
})();


api.getCategories(response => {
  const $productsMenu = $('#js-product-category');
  const $products = $('#js-product');
  response.forEach(({ id, categoryName }) => {
    const categoryItem = `<button type="button" class="btn tab__btn js-tab">${categoryName}</button>`
    const $productItem = $(`<div class="tab__content products"></div>`);
    $products.append($productItem);
    $productsMenu.append(categoryItem);

    api.getProducts(id, (products) => {
      products.forEach(({ productName, productImage, productRate }) => {
        const product = `
          <div class="product">
            <h2 class="product__name">${productName}</h2>
            <img src="${productImage}" alt="product image" class="product__img" height="200px" />
            <span class="product__rate">${productRate}</span>
          </div>
        `

        $productItem.append(product);
      });
    });

    tab.init();
  });
});
