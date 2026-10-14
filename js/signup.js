document.addEventListener('DOMContentLoaded',function(){

  const userId=document.getElementById('user_id');
  const userPw1=document.getElementById('user_pw1');
  const userPw2=document.getElementById('user_pw2');
  const btnPw=document.querySelector('.btn_pw');
  const telSecond=document.getElementById('tel_second');
  const telThird=document.getElementById('tel_third');

  userId.addEventListener('change',checkId);
  userPw1.addEventListener('change',checkPw);
  btnPw.addEventListener('click',comparePw);
  telSecond.addEventListener('keyup', moveTel);

  function checkId(){
    if(userId.value.length < 5 || userId.value.length > 16){
      alert('사용할 수 없는 아이디입니다.');//사용할 수 있는아이디창도띄우기
      userId.value='';//잘못입력하면 지워짐
      userId.focus();
    }
  }//checkId()

  function checkPw(){
    if(userPw1.value.length>16 && userPw1.value.length<5){
      alert('사용할 수 없는 비밀번호입니다.');
      userPw1.select();//잘못입력하면 블럭잡힘
    }
  }//checkPw

  function comparePw(){
    if(userPw1.value !== userPw2.value){
      alert('비밀번호가 일치하지 않습니다.');
    }else{
      alert('비밀번호가 일치합니다.');
    }
  }//comparePw

  //키다운걸면 쭉 누르면 여러개쳐져서 오류날수도있음-키업넣어줘야함
  function moveTel(){
    if(telSecond.value.length>=4){
      telThird.focus();
    }
  }//moveTel()
/* --------- id,pw ---------- */
  document.getElementById('btn_search_address').addEventListener('click',searchAddress);

    function searchAddress(){
    new kakao.Postcode({
      oncomplete: function(data) {
        document.getElementById("userAddress").value=data.address;
        document.getElementById("userPostCode").value=data.zonecode;
        var inputDtlAddr=document.getElementById("userDtlAddress");
        inputDtlAddr.readOnly=false;
      }
    }).open();
  }
/* --------- address ---------- */
  const domain=document.querySelector('.domain');
  const domainSpace=document.querySelector('.domain_space');
  domain.addEventListener('change',()=>{
    domainSpace.value=domain.value;
  })
/* --------- domain ---------- */
  const totalTerms=document.getElementById('total_terms');
  const termsEls=document.querySelectorAll('.terms_el');
  const terms01=document.getElementById('terms_01');
  const terms02=document.getElementById('terms_02');
  const terms03=document.getElementById('terms_03');
  const terms04=document.getElementById('terms_04');
  const terms05=document.getElementById('terms_05');

  totalTerms.addEventListener('click',totalCheck);
  terms01.addEventListener('click',termsCheck);
  terms02.addEventListener('click',termsCheck);
  terms03.addEventListener('click',termsCheck);
  terms04.addEventListener('click',termsCheck);
  terms05.addEventListener('click',termsCheck);

  function totalCheck(){
    if (totalTerms.checked===true){
      termsEls.forEach((termsEl)=>{
        termsEl.checked=true;
      })
    }else{
      termsEls.forEach((termsEl)=>{
        termsEl.checked=false;
      })
    }
  }
  function termsCheck(){
    if(terms01.checked&&terms02.checked&&terms03.checked&&terms04.checked&&terms05.checked){
      totalTerms.checked=true;
    }else{
      totalTerms.checked=false;
    }
  }
//termsCheck()
/* ----------- agreeform ----------- */
});