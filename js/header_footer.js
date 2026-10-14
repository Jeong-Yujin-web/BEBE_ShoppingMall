//------header--------//
  const btn=$('.wrap .filter p')
  btn.on("click",function(){
    $('.option').slideToggle(300).css('display','block');
  });

//------ gnb-------//
$(function(){
  const btnOpen=$('.gnb .btn_open');
  const btnClose=$('.gnb .btn_close');
  const downMenu=$('.gnb .gnb_menu_full_outer');
  btnOpen.click(function(){
    downMenu.stop().animate({
      height:420
    }, 200);
    btnOpen.css('display','none');
    btnClose.css('display','block');
  });
  btnClose.click(function(){
    downMenu.stop().animate({
      height:0
    }, 200);
    btnOpen.css('display','block');
    btnClose.css('display','none');
  });
});