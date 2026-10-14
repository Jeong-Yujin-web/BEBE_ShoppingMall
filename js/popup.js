//------popup_open/close--------//      
  const shoppingOpen=$('.shopping_open');
  const shoppingClose=$('.shopping_close');
  const shoppingPopup=$('.shopping_popup_outer');

  shoppingOpen.click(function(){
    shoppingPopup.fadeIn(200);
  });
  shoppingClose.click(function(){
    shoppingPopup.fadeOut(200);
  });

  const aiOpen=$('.ai_popup_open');
  const aiClose=$('.ai_popup_close');
  const aiPopup=$('.ai_popup_outer');

  aiOpen.click(function(){
    aiPopup.fadeIn(200);
  });
  aiClose.click(function(){
    aiPopup.fadeOut(200);
  });
  
  const searchOpen=$('.search_popup_open');
  const searchClose=$('.search_popup_close');
  const searchPopup=$('.search_popup_outer');
  
  searchOpen.click(function(){
    searchPopup.fadeIn(200);
  });
  searchClose.click(function(){
    searchPopup.fadeOut(200);
  });
  