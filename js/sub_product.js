//전체상품 보여지고 탭누르면 if문 사용해서 카테고리 걸고 카테고리에 맞게 뜰수있도록 만들기
//그 안에서 필터링 가능하도록

// 처음에는 전체상품
// showProduct(shoppingList);
// const optionList = document.querySelector('#option_list');
// optionList.addEventListener('change', function () {
//   const selectValue = this.value;
//   if (selectValue === 'low') {
//     const sortList = [...shoppingList];
//     sortList.sort(function(a, b) {
//       return a.price - b.price;
//     });
//     bestProduct.innerHTML = '';
//     showProduct(sortList);

//   } else if (selectValue === 'high') {
//     const sortList = [...shoppingList];
//     sortList.sort(function(a, b) {
//       return b.price - a.price;
//     });
//     bestProduct.innerHTML = '';
//     showProduct(sortList);
//   } else if (selectValue === 'latest') {
//     const sortList = [...shoppingList];
//     sortList.sort(function(a, b){
//       return new Date(b.date) - new Date(a.date);
//     });
//     bestProduct.innerHTML='';
//     showProduct(sortList);
//   } else if (selectValue === 'popular') {
//     const sortList = [...shoppingList];
//     sortList.sort(function(a, b){
//       return b.review - a.review;
//     });
//     bestProduct.innerHTML='';
//     showProduct(sortList);
//   } else {
//     const sortList = [...shoppingList];
//     sortList.sort(function(a, b){
//       return b.review - a.review;
//     });
//     bestProduct.innerHTML='';
//     showProduct(sortList);
//   }
// });
  // showProduct(shoppingList);
  // const optionList = document.querySelector('#option_list');

  // optionList.addEventListener('change', function () {
  //   const selectValue = this.value;
  //   const sortList = [...shoppingList];

  //   if (selectValue === 'low') {
  //     sortList.sort((a, b) => a.price - b.price);
  //   } else if (selectValue === 'high') {
  //     sortList.sort((a, b) => b.price - a.price);
  //   } else if (selectValue === 'latest') {
  //     sortList.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   } else if (selectValue === 'popular') {
  //     sortList.sort((a, b) => b.review - a.review);
  //   }

  //   bestProduct.innerHTML = '';
  //   showProduct(sortList);
  // });


  import shoppingList from "./data.js";

  const productCount=document.querySelector('.sub_product_solt p')
  const bestProduct = document.querySelector('.best_product_all');
  const subTitleTab = document.querySelectorAll('.option_title label');
  const optionList = document.querySelector('#option_list');

  // 현재 선택된 게 무엇인지 기억하는 변수=현재상태
  let currentCategory = '전체';
  let currentSort = 'default';

  // 상품 출력 함수
  function showProduct(productList) {

    // 기존 상품 지우기
    bestProduct.innerHTML = '';
    // 배열 안에 있는 상품 하나씩 꺼내서 출력
    productList.forEach(function(product) {

      // 상품 전체 박스만들기
      const bestDiv = document.createElement('div');
      bestDiv.classList.add('best_box');
      // 상품클릭시 상세페이지 이동
      bestDiv.addEventListener('click', function(){
        location.href=`shopping_detail.html`;
        // location.href=`shopping_detail.html?code=${product.code}`; 이렇게 하면 상품 데이터에 따라 상세페이지 보낼수 있음
      })
      // 이미지 만들기
      const bestImgBox = document.createElement('div');
      bestImgBox.classList.add('best_img');
      const bestImg = document.createElement('img');
      bestImg.src = product.src;
      bestImg.alt = product.name;

      bestImgBox.appendChild(bestImg);
      bestDiv.appendChild(bestImgBox);

      // 상품 이름
      const bestNameP = document.createElement('p');
      bestNameP.textContent = product.name;
      bestDiv.appendChild(bestNameP);

      // 상품 가격
      const bestPriceP = document.createElement('p');

      bestPriceP.textContent = 
      product.price.toLocaleString() + '원';
      bestPriceP.classList.add('price');
      bestDiv.appendChild(bestPriceP);

      // 최종 상품 추가
      bestProduct.appendChild(bestDiv);
    });
  }

  // 현재 선택된 카테고리 + 정렬조건이 맞는 상품을 화면에 출력하는 함수
  function renderProducts() {
    // 원본 데이터는 건드리지 않기 위해 복사[...]=spread 문법
    let result = [...shoppingList];

    // 중복 상품 제거
    if (currentCategory === '전체'){

      result = result.filter(function(product, index, array) {
        
        return index === array.findIndex(function(item) {
          return item.name === product.name;
        });
        
      });
    }

    // 1. 카테고리 필터
    if (currentCategory !== '전체') {
      result = result.filter(function(product) {
        return product.category === currentCategory;
      });
    }

    // 2. 정렬
    if (currentSort === 'low') {
      result.sort(function(a, b) {
        return a.price - b.price;
      });
    }
    else if (currentSort === 'high') {
      result.sort(function(a, b) {
        return b.price - a.price;
      });
    }
    else if (currentSort === 'latest') {
      result.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }
    else if (currentSort === 'popular') {
      result.sort(function(a, b) {
        return b.review - a.review;
      });
    }

    // 상품 갯수
    productCount.textContent=`전체상품 ${result.length}개`; 
    // 상품 다시 출력
    showProduct(result);
  }

  // 처음 페이지 들어왔을 때
  renderProducts();

  // 카테고리 탭
  subTitleTab.forEach(function(tab) {
    tab.addEventListener('click', function() {

      // 클릭한 탭의 글자를 가져옴
      currentCategory = this.textContent.trim();
      // 모든 탭의 active 제거
      subTitleTab.forEach(function(tab) {
        tab.classList.remove('on_tab');
      });
      // 현재 클릭한 탭 active
      this.classList.add('on_tab');
      // 상품 다시 출력
      renderProducts();
    });
  });

    // 상품 정렬
    optionList.addEventListener('change', function() {
    // select에서 선택한 값 가져오기
    currentSort = this.value;
    // 상품 다시 출력
    renderProducts();
  });