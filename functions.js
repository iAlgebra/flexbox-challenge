$(document).ready(function() {
  const API_URL = 'https://9ss7bxey8k.execute-api.ap-southeast-2.amazonaws.com/default/dummy_service';
  const $imgs = $('a > img');

  jQuery.ajax(API_URL, {
    success: function(response){
      changeImgs(response);
      createModals(response);
    },
  });

  function changeImgs(response) {
    const objectsArr = response.Data;
    for(let i = 0; i < objectsArr.length; i++) {
      let imgUrl = objectsArr[i].node.frontmatter.cover;
      if($imgs[i]) {
        $($imgs[i]).attr('src', imgUrl);
      }
    }
  }

  function createModals(response) {
    const objectsArr = response.Data;
    const $body = document.querySelector('body');
    for(let i = 0; i < objectsArr.length; i++) {
      //for every object in the arr create these elements
      let $modal = document.createElement('div');
      let $modalImg = document.createElement('img');
      let $modalText = document.createElement('p');
      $modal.appendChild($modalImg);
      $modal.appendChild($modalText);
      $body.appendChild($modal);
      //asign id and class to modal
      $($modal).attr('id', 'modal' + i);
      $($modal).attr('class', 'modal');
      //adding text to the 'p'
      $($modalText).text(objectsArr[i].node.excerpt);
      //adding img
      $($modalImg).attr('src', objectsArr[i].node.frontmatter.cover);
    }
  }

  $('.cta a').click(function() {
    $('html,body').animate({
      scrollTop: $('#tours').offset().top,
    }, 500);
    return false;
  });

  $('#tours li').on('click', function() {
    $('#location').val($('img', this).attr('alt'));
  });
});
