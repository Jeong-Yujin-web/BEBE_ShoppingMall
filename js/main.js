//------trend_hover_toggle--------//
  const hearts=document.querySelectorAll('.trend_product button')

  hearts.forEach(heart =>{
    heart.addEventListener('click', function(){
      this.classList.toggle('active');
    });
  });
//------new_hover_toggle--------//
  const newBtns=document.querySelectorAll('.new_product button')

  newBtns.forEach(newBtn =>{
    newBtn.addEventListener('click', function(){
      this.classList.toggle('active');
    });
  });
//------codi_slider--------//
  $(function () {
    const img = document.querySelectorAll('.trend_product img');

    const normalImg = [
        './images/trend01.jpg',
        './images/trend02.jpg',
        './images/trend03.jpg'
    ];

    const hoverImg = [
        './images/trend01_hover.jpg',
        './images/trend02_hover.jpg',
        './images/trend03_hover.jpg'
    ];

    for (let i = 0; i < img.length; i++) {

        img[i].addEventListener('mouseenter', function () {
            this.src = hoverImg[i];
        });

        img[i].addEventListener('mouseleave', function () {
            this.src = normalImg[i];
        });
    }
    });
//------recommend_tab--------//
  const tab=$('.recommend_product .tab li');
  const sheet=$('.recommend_product> .sheet');
  let index=0;
  tab.click (function(){
    const index=$(this).index();
    tab.removeClass('on_tab');
    $(this).addClass('on_tab');
    sheet.removeClass('on_sheet');
    sheet.eq(index).addClass('on_sheet');
  });
  const sub_tab_01=$('.recommend_01 .sub_tab_01 li');
  const sub_sheet_01=$('.recommend_01 .sub_sheet');
  
  sub_tab_01.click (function(){
    const index=$(this).index();
    sub_tab_01.removeClass('sub_on_tab');
    $(this).addClass('sub_on_tab');
    sub_sheet_01.removeClass('sub_on_sheet');
    sub_sheet_01.eq(index).addClass('sub_on_sheet');
  });
  const sub_tab_02=$('.recommend_02 .sub_tab_02 li');
  const sub_sheet_02=$('.recommend_02 .sub_sheet_02');
  
  sub_tab_02.click (function(){
    const index=$(this).index();
    sub_tab_02.removeClass('sub_on_tab');
    $(this).addClass('sub_on_tab');
    sub_sheet_02.removeClass('sub_on_sheet');
    sub_sheet_02.eq(index).addClass('sub_on_sheet');
  });
//------recommend_tab--------//