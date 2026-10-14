document.addEventListener('DOMContentLoaded', function(){

  // ================= 아이디 저장 =================

  let cookieId = getCookie("key");

  if(cookieId != ''){
    $("#userId").val(cookieId);
    $("#id_save").prop("checked", true);
  }

  // 쿠키 가져오기
  function getCookie(key){
    key = key + "=";

    let cookieData = document.cookie;
    let firstCookie = cookieData.indexOf(key);
    let cookieValue = "";

    if(firstCookie != -1){
      firstCookie += key.length;

      let endCookie = cookieData.indexOf(';', firstCookie);

      if(endCookie == -1){
        endCookie = cookieData.length;
      }

      cookieValue = cookieData.substring(firstCookie, endCookie);
    }

    return decodeURIComponent(cookieValue);
  }

  // 쿠키 저장
  function setCookie(key, value, day){
    let currentTime = new Date();

    currentTime.setDate(currentTime.getDate() + day);

    let cookieValue =
      encodeURIComponent(value) +
      ";expires=" +
      currentTime.toGMTString();

    document.cookie = key + "=" + cookieValue;
  }

  // 쿠키 삭제
  function deleteCookie(key){
    let currentTime = new Date();

    currentTime.setDate(currentTime.getDate() - 1);

    document.cookie =
      key + "=;expires=" +
      currentTime.toGMTString();
  }


  //  사용자 데이터_SQL에서 Json으로 내보낸 데이터

  fetch('../js/users.json')
    .then(response => response.json())
    .then(userList => {
    console.log("유저 데이터:", userList);

      // 로그인 버튼
      $('.submit').click(function(){

        // 아이디 저장
        if($("#id_save").is(":checked")){
          setCookie("key", $("#userId").val(), 3);
        }else{
          deleteCookie("key");
        }

        // 입력한 로그인 정보
        const userId = $("#userId").val();
        const userPw = $("#userPw").val();

        // 사용자 데이터에서 회원 찾기
        const user = userList.find(function(user){
          return user.id === userId && user.pw === userPw;
        });

        // 로그인 결과
        if(user){
          alert(`${user.name}님 로그인 성공`);
          location.href = "../index.html";
        }else{
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        }

      });

    })
    .catch(error => {
      console.error("사용자 데이터를 불러오지 못했습니다.", error);
    });

});