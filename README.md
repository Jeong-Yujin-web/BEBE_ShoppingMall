# BEBE_Adaptive Web Project

**BEBE 쇼핑몰 프로젝트**

영유아 의류와 육아용품을 판매하는 PC 중심의 쇼핑몰 웹사이트를 구현하였습니다.

>영유아 상품을 직관적으로 탐색할 수 있는 쇼핑몰 UI 구성
>로그인, 회원가입, 아이디 및 비밀번호 찾기 등 사용자 계정 관련 페이지 구현
>상품 옵션 선택 및 상품 문의(Q&A) 영역 구현


## 📋 기획안

프로젝트의 기획 배경과 요구사항, 경쟁사 분석 및 디자인 가이드는 아래 문서에서 확인할 수 있습니다.

👉 [BEBE 프로젝트 기획안 보기](docs/BEBE_AdaptiveWebProject.jpg)

## 🖥️ 프로젝트 소개

### 개발 배경

```text
육아용품과 영유아 의류에 대한 관심이 높아지면서
다양한 상품을 비교하고 선택할 수 있는 쇼핑 환경의 중요성이 커지고 있습니다.

이에 영유아를 키우는 부모가 필요한 상품을 편리하게 탐색하고,
합리적인 가격으로 구매할 수 있도록 BEBE 쇼핑몰을 기획하고 구현하였습니다.
```

### 프로젝트 목표

```text
깔끔하고 직관적인 UI를 바탕으로 상품 정보를 효과적으로 전달하고,
사용자가 필요한 상품을 쉽게 탐색할 수 있는 쇼핑몰을 구현하는 것을 목표로 하였습니다.
특히 로그인 및 회원가입을 비롯한 사용자 계정 관련 페이지를 구성하여
기본적인 계정 관리 화면과 사용자 입력 흐름을 구현하는 데 중점을 두었습니다.
또한 상품 옵션 선택과 Q&A 영역을 구성하여 쇼핑몰에서 필요한 주요 화면과 기능을 경험하고 구현하고자 하였습니다.
```

## ✨ 주요 기능

* 메인 및 상품 관련 페이지 구현
* 로그인 페이지 및 사용자 입력 기능 구현
* 상품 옵션 선택 및 상품 정보 탐색 기능 구현
* 상품 문의(Q&A) 기능 구현
* 연령별·상황별 상품 추천을 고려한 콘텐츠 구성

## 🛠️ 기술 스택

### Markup
* HTML5
* CSS3
* SCSS

### Frontend
* JavaScript
* jQuery
* JSON

### Tools
* GitHub
* Figma

## 📁 프로젝트 구조

```text
BEBE
├─ css
├─ images
├─ js
├─ login
│  ├─ login.html
│  ├─ signup.html
│  ├─ find_id.html
│  └─ find_pw.html
├─ index.html
├─ shopping_mall_sub.html
└─ shopping_detail.html
```

## ⭐ 주요 구현 내용

### 01. 상품 옵션 선택 및 탐색 기능
```text
→ 상품을 선택할 때 필요한 옵션을 확인하고 선택할 수 있도록 구현하였습니다.

상품명과 가격, 카테고리 등 구매에 필요한 정보를 구분하여 배치하고,
사용자가 원하는 조건에 맞춰 상품을 선택할 수 있도록 구성하였습니다.
```
<details>
  <summary>🔍 상품 목록 필터링 및 정렬 기능 코드 펼치기</summary>
  
  ```js
  import shoppingList from "./data.js";

  const productCount = document.querySelector('.sub_product_solt p');
  const bestProduct = document.querySelector('.best_product_all');
  const subTitleTab = document.querySelectorAll('.option_title label');
  const optionList = document.querySelector('#option_list');

  // 현재 선택된 카테고리와 정렬 조건
  let currentCategory = '전체';
  let currentSort = 'default';

  function showProduct(productList) {
    bestProduct.innerHTML = '';

    productList.forEach(function(product) {
      const bestDiv = document.createElement('div');
      bestDiv.classList.add('best_box');

      bestDiv.addEventListener('click', function() {
        location.href = 'shopping_detail.html';
      });

      const bestImgBox = document.createElement('div');
      bestImgBox.classList.add('best_img');

      const bestImg = document.createElement('img');
      bestImg.src = product.src;
      bestImg.alt = product.name;

      bestImgBox.appendChild(bestImg);
      bestDiv.appendChild(bestImgBox);

      const bestNameP = document.createElement('p');
      bestNameP.textContent = product.name;
      bestDiv.appendChild(bestNameP);

      const bestPriceP = document.createElement('p');
      bestPriceP.textContent =
        product.price.toLocaleString() + '원';
      bestPriceP.classList.add('price');
      bestDiv.appendChild(bestPriceP);

      bestProduct.appendChild(bestDiv);
    });
  }

  // 카테고리 필터링 및 상품 정렬
  function renderProducts() {
    let result = [...shoppingList];

    // 전체 카테고리에서 중복 상품 제거
    if (currentCategory === '전체') {
      result = result.filter(function(product, index, array) {
        return index === array.findIndex(function(item) {
          return item.name === product.name;
        });
      });
    }

    if (currentCategory !== '전체') {
      result = result.filter(function(product) {
        return product.category === currentCategory;
      });
    }

    if (currentSort === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'high') {
      result.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'latest') {
      result.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );
    } else if (currentSort === 'popular') {
      result.sort((a, b) => b.review - a.review);
    }

    productCount.textContent = `전체상품 ${result.length}개`;
    showProduct(result);
  }

  // 페이지 초기 상품 출력
  renderProducts();

  subTitleTab.forEach(function(tab) {
    tab.addEventListener('click', function() {
      currentCategory = this.textContent.trim();

      subTitleTab.forEach(function(tab) {
        tab.classList.remove('on_tab');
      });

      this.classList.add('on_tab');
      renderProducts();
    });
  });

  optionList.addEventListener('change', function() {
    currentSort = this.value;
    renderProducts();
  });
  ```

</details>

#### 💡 셀프 코드리뷰 & 배운 점

* **상품 목록 출력 기능 구현**: JavaScript를 활용해 상품 데이터를 화면에 동적으로 출력하고, 상품명과 가격, 이미지를 구성하였습니다.
* **카테고리 필터링 및 정렬**: 카테고리별 상품 필터링과 가격순, 최신순, 인기순 정렬 기능을 구현하여 원하는 상품을 쉽게 탐색할 수 있도록 하였습니다.
* **앞으로의 보완점**: 상품별 고유 코드를 활용한 상세 페이지 연결과 필터링 및 정렬 조건에 따른 예외 처리를 보완하고 싶습니다.

### 02. 로그인 기능

```text
02. 로그인 기능
→ 사용자가 로그인 페이지에서 계정 정보를 입력하고,
아이디 저장 및 로그인 여부를 확인할 수 있도록 구현하였습니다.

JSON 데이터를 활용하여 사용자 정보를 확인하고,
입력한 아이디와 비밀번호가 일치하는 경우 로그인 성공 메시지를 표시하도록 구성하였습니다.
```

<details>
  <summary>🔍 login.js (로그인 및 아이디 저장 기능) 펼치기</summary>
    
  ```js
  document.addEventListener('DOMContentLoaded', function() {

    // 아이디 저장 여부 확인
    let cookieId = getCookie("key");

    if (cookieId != '') {
      $("#userId").val(cookieId);
      $("#id_save").prop("checked", true);
    }

    // 쿠키 가져오기
    function getCookie(key) {
      key = key + "=";

      let cookieData = document.cookie;
      let firstCookie = cookieData.indexOf(key);
      let cookieValue = "";

      if (firstCookie != -1) {
        firstCookie += key.length;

        let endCookie = cookieData.indexOf(';', firstCookie);

        if (endCookie == -1) {
          endCookie = cookieData.length;
        }

        cookieValue = cookieData.substring(firstCookie, endCookie);
      }

      return decodeURIComponent(cookieValue);
    }

    // 쿠키 저장
    function setCookie(key, value, day) {
      let currentTime = new Date();
      currentTime.setDate(currentTime.getDate() + day);

      let cookieValue =
        encodeURIComponent(value) +
        ";expires=" +
        currentTime.toGMTString();

      document.cookie = key + "=" + cookieValue;
    }

    // 쿠키 삭제
    function deleteCookie(key) {
      let currentTime = new Date();
      currentTime.setDate(currentTime.getDate() - 1);

      document.cookie =
        key + "=;expires=" +
        currentTime.toGMTString();
    }

    fetch('../js/users.json')
      .then(response => response.json())
      .then(userList => {

        $('.submit').click(function() {

          // 아이디 저장 설정
          if ($("#id_save").is(":checked")) {
            setCookie("key", $("#userId").val(), 3);
          } else {
            deleteCookie("key");
          }

          const userId = $("#userId").val();
          const userPw = $("#userPw").val();

          const user = userList.find(function(user) {
            return user.id === userId && user.pw === userPw;
          });

          if (user) {
            alert(`${user.name}님 로그인 성공`);
            location.href = "../index.html";
          } else {
            alert("아이디 또는 비밀번호가 틀렸습니다.");
          }

        });

      })
      .catch(error => {
        console.error("사용자 데이터를 불러오지 못했습니다.", error);
      });
  });
  ```

</details>

#### 💡 셀프 코드리뷰 & 배운 점

* **로그인 화면 구현**: JSON에 저장된 사용자 데이터를 불러오고, 아이디와 비밀번호 입력 영역 및 관련 메뉴를 구성하면서 사용자 입력을 처리하는 기본적인 흐름을 익혔습니다.
* **사용자 편의성 고려**: 로그인과 회원가입, 아이디 및 비밀번호 찾기 등 관련 기능으로 이동할 수 있도록 구성하여 접근성을 높이고자 하였습니다.
* **앞으로의 보완점**: 실제 서비스에서는 입력값 검증과 로그인 실패 안내를 보완하고, 실제 서비스에서는 서버 인증과 비밀번호 보안 처리를 적용하고 싶습니다.

### 03. 회원가입 기능
```text
→ 회원가입에 필요한 사용자 정보 입력과 비밀번호 확인,
전화번호 입력 및 주소 검색 기능을 구현하였습니다.

또한 이메일 도메인 선택과 약관 동의 기능을 구성하여
사용자가 회원가입에 필요한 정보를 편리하게 입력할 수 있도록 하였습니다.
```

<details>
  <summary>🔍 signup.js (회원가입 입력값 검증 및 편의 기능) 펼치기</summary>
  
```js
  document.addEventListener('DOMContentLoaded', function() {

    const userId = document.getElementById('user_id');
    const userPw1 = document.getElementById('user_pw1');
    const userPw2 = document.getElementById('user_pw2');
    const btnPw = document.querySelector('.btn_pw');
    const telSecond = document.getElementById('tel_second');
    const telThird = document.getElementById('tel_third');

    // 아이디 및 비밀번호 입력 확인
    userId.addEventListener('change', checkId);
    userPw1.addEventListener('change', checkPw);
    btnPw.addEventListener('click', comparePw);
    telSecond.addEventListener('keyup', moveTel);

    // 아이디 길이 확인
    function checkId() {
      if (userId.value.length < 5 || userId.value.length > 16) {
        alert('사용할 수 없는 아이디입니다.');
        userId.value = '';
        userId.focus();
      }
    }

    // 비밀번호 길이 확인
    function checkPw() {
      if (userPw1.value.length > 16 && userPw1.value.length < 5) {
        alert('사용할 수 없는 비밀번호입니다.');
        userPw1.select();
      }
    }

    // 비밀번호 일치 여부 확인
    function comparePw() {
      if (userPw1.value !== userPw2.value) {
        alert('비밀번호가 일치하지 않습니다.');
      } else {
        alert('비밀번호가 일치합니다.');
      }
    }

    // 전화번호 입력 시 다음 입력란으로 이동
    function moveTel() {
      if (telSecond.value.length >= 4) {
        telThird.focus();
      }
    }

    // 주소 검색
    document.getElementById('btn_search_address')
      .addEventListener('click', searchAddress);

    function searchAddress() {
      new kakao.Postcode({
        oncomplete: function(data) {
          document.getElementById('userAddress').value = data.address;
          document.getElementById('userPostCode').value = data.zonecode;

          const inputDtlAddr =
            document.getElementById('userDtlAddress');

          inputDtlAddr.readOnly = false;
        }
      }).open();
    }

    // 이메일 도메인 선택
    const domain = document.querySelector('.domain');
    const domainSpace = document.querySelector('.domain_space');

    domain.addEventListener('change', () => {
      domainSpace.value = domain.value;
    });

    // 약관 전체 동의 및 개별 동의
    const totalTerms = document.getElementById('total_terms');
    const termsEls = document.querySelectorAll('.terms_el');

    const terms01 = document.getElementById('terms_01');
    const terms02 = document.getElementById('terms_02');
    const terms03 = document.getElementById('terms_03');
    const terms04 = document.getElementById('terms_04');
    const terms05 = document.getElementById('terms_05');

    totalTerms.addEventListener('click', totalCheck);
    terms01.addEventListener('click', termsCheck);
    terms02.addEventListener('click', termsCheck);
    terms03.addEventListener('click', termsCheck);
    terms04.addEventListener('click', termsCheck);
    terms05.addEventListener('click', termsCheck);

    // 전체 약관 동의
    function totalCheck() {
      termsEls.forEach((termsEl) => {
        termsEl.checked = totalTerms.checked;
      });
    }

    // 개별 약관 동의 상태 확인
    function termsCheck() {
      totalTerms.checked =
        terms01.checked &&
        terms02.checked &&
        terms03.checked &&
        terms04.checked &&
        terms05.checked;
    }

  });
```

</details>

#### 💡 셀프 코드리뷰 & 배운 점

* **입력값 검증**: 아이디 길이 확인과 비밀번호 일치 여부 확인 기능을 구현하여 입력값을 검증하는 방법을 익혔습니다.
* **사용자 편의 기능**: 전화번호 입력란 자동 이동, 주소 검색, 이메일 도메인 선택 및 약관 전체 동의 기능을 구현하였습니다.
* **앞으로의 보완점**: 비밀번호 길이 검증 조건을 수정하고, 필수 입력값 확인과 중복 아이디 검사, 실제 회원 정보 저장 기능 등을 보완하고 싶습니다.

### 04. 상품 문의(Q&A) 기능

```text
→ 상품 상세 페이지에서 문의 내용을 작성하고 등록할 수 있도록 구현하였습니다.

문의 제목, 작성자, 문의 내용의 입력 여부를 확인하고,
등록된 문의는 작성 날짜와 함께 목록 상단에 표시되도록 구성하였습니다.

또한 작성자 이름 일부를 마스킹하고,
등록된 문의를 삭제할 수 있도록 구현하였습니다.
```

<details>
  <summary>🔍 Q&A.js (문의 등록 기능) 펼치기</summary>
  
  ```js
  document.addEventListener('DOMContentLoaded', function() {

    const QnASubmit = document.querySelector('.QnA_submit');

    QnASubmit.addEventListener('click', () => {
      const QnATitle = document.querySelector('.QnA_title');
      const QnAName = document.querySelector('.user_name');
      const QnA = document.querySelector('.QnA');
      const QnAList = document.querySelector('.QnA_list');

      // 필수 입력값 확인
      if (!QnATitle.value) {
        alert('문의사항 제목을 작성하셔야 등록이 가능합니다.');
        QnATitle.focus();
        return;
      }

      if (!QnAName.value) {
        alert('작성자를 입력하셔야 등록이 가능합니다.');
        QnAName.focus();
        return;
      }

      if (!QnA.value) {
        alert('문의사항 내용을 작성하셔야 등록이 가능합니다.');
        QnA.focus();
        return;
      }

      // 문의 항목 생성
      const newItem = document.createElement('div');

      const newTitle = document.createElement('p');
      newTitle.textContent = QnATitle.value;

      // 작성자 이름 마스킹
      const newName = document.createElement('p');
      const name = QnAName.value;
      newName.textContent = name[0] + '*'.repeat(name.length - 1);

      // 작성 날짜 표시
      const newDate = document.createElement('p');
      newDate.textContent = remaindTime();

      const newP = document.createElement('p');
      newP.textContent = QnA.value;

      // 문의 삭제 버튼
      const newSpan = document.createElement('span');
      newSpan.textContent = 'x';
      newSpan.classList.add('delete');

      newP.appendChild(newSpan);
      newItem.appendChild(newTitle);
      newItem.appendChild(newName);
      newItem.appendChild(newDate);
      newItem.appendChild(newP);

      // 최신 문의를 목록 상단에 추가
      QnAList.insertBefore(newItem, QnAList.firstChild);

      // 입력값 초기화
      QnATitle.value = '';
      QnAName.value = '';
      QnA.value = '';
      QnATitle.focus();

      // 문의 삭제
      newSpan.addEventListener('click', () => {
        newItem.remove();
      });
    });

    // 현재 날짜 및 시간 반환
    function remaindTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const minute = String(now.getMinutes()).padStart(2, '0');

      return `${year}.${month}.${day} ${hour}:${minute}`;
    }

  });
  ```

</details>

#### 💡 셀프 코드리뷰 & 배운 점

* **문의 목록 관리**: JavaScript로 문의 항목을 동적으로 생성하고, 작성 날짜 표시와 등록 항목 삭제 기능을 구현하였습니다.
* **입력값 정보 검증**: 문의 제목, 작성자, 문의 내용의 필수 입력 여부를 확인하여 누락된 정보가 있을 때 등록을 제한하였습니다.
* **앞으로의 보완점**: 작성자 이름 마스킹을 적용하였으며, 향후 서버와 연동하여 문의 데이터를 저장하고 새로고침 후에도 유지되도록 개선하고 싶습니다.


## 🖥️ 실행 결과

### main
<img width="1249" height="918" alt="image" src="https://github.com/user-attachments/assets/79fdf95f-cfd7-44ce-a6f1-b9bc52d26896" />
<img width="1605" height="922" alt="image" src="https://github.com/user-attachments/assets/627ff5ae-564a-449f-81dd-3fe1f015518d" />

### sub
<img width="868" height="887" alt="image" src="https://github.com/user-attachments/assets/cafd615b-7921-45a0-ab57-fe53a4ec1597" />

### detail
<img width="855" height="931" alt="image" src="https://github.com/user-attachments/assets/08a84df1-7650-4cea-9abd-5f7e002009da" />



---
### GitHub
https://dbwls9379.dothome.co.kr/

### 회고

영유아 쇼핑몰을 기획하고 구현하면서 상품을 단순히 나열하는 것보다 사용자가 필요한 정보를 빠르게 찾고 편리하게 선택할 수 있도록 정보 구조를 설계하는 과정이 중요하다는 것을 배웠습니다.

특히 상품 옵션 선택과 로그인, Q&A 기능을 구현하며 쇼핑몰에서 필요한 기본 기능과 사용자 흐름을 고민해 볼 수 있었습니다.

앞으로는 상품 정보와 사용자 입력에 대한 예외 처리를 보완하고, 접근성과 웹 표준까지 고려하여 더욱 편리하고 완성도 높은 쇼핑몰을 구현해보고 싶습니다.
