// review_popup
  $(document).ready(function () {
    const reviewOpen = $('.review_write');
    const reviewClose = $('.review_write_close', );
    const reviewPopup = $('.review_btn_popupbox');
    const popupBg = $('.popup_bg');

    reviewOpen.click(function () {
      popupBg.fadeIn(200);
      reviewPopup.fadeIn(200);
    });

    reviewClose.click(function () {
      popupBg.fadeOut(200);
      reviewPopup.fadeOut(200);
    });
  });
// QnA
  document.addEventListener('DOMContentLoaded',function(){

    const QnASubmit = document.querySelector('.QnA_submit');
    QnASubmit.addEventListener('click', () => {
      const QnATitle = document.querySelector('.QnA_title');
      const QnAName = document.querySelector('.user_name');
      const QnA = document.querySelector('.QnA');
      const QnAList = document.querySelector('.QnA_list');

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

      const newItem = document.createElement('div');

      const newTitle = document.createElement('p');
      newTitle.textContent = QnATitle.value;

      const newName = document.createElement('p');
      const name=QnAName.value;
      newName.textContent = name[0] + '*'.repeat(name.length - 1);
      
      const newDate = document.createElement('p');
      newDate.textContent = remaindTime();

      const newP = document.createElement('p');
      newP.textContent = QnA.value;

      const newSpan = document.createElement('span');
      newSpan.textContent = 'x';
      newSpan.classList.add('delete');

      newP.appendChild(newSpan);
      newItem.appendChild(newTitle);
      newItem.appendChild(newName);
      newItem.appendChild(newDate);
      newItem.appendChild(newP);

      QnAList.insertBefore(newItem, QnAList.firstChild);

      QnATitle.value = '';
      QnAName.value = '';
      QnA.value = '';
      QnATitle.focus();

      newSpan.addEventListener('click', () => {
        newItem.remove();
      });
    });

    function remaindTime(){
      const now= new Date();
      const year=now.getFullYear();
      const month=String(now.getMonth() + 1).padStart(2, '0');
      const day=String(now.getDate()).padStart(2, '0');
      const hour=String(now.getHours()).padStart(2, '0');
      const minute=String(now.getMinutes()).padStart(2, '0');

      return`${year}.${month}.${day} ${hour}:${minute}`;
    }

  });