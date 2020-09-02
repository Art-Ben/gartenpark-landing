let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

jQuery(document).ready(function () {


  if( Cookies.get('cookieBanner') == 'yes') {
    $('.cookieBanner').hide();
  }
  
  $('.my-select').select2({
    minimumResultsForSearch: -1,
    dropdownCssClass: 'my-select-drop',
    containerCssClass: 'my-select-cont',
    dropdownParent: $('.selectgrp')
  });

  function checkEmpty(val) {
    return (!val || 0 === val.length);
  }

  $('.customCtaForm__form').submit(function (e) {
    e.preventDefault();
    var _this = $(this);
    var name, lastname_elem, lastname, tel, email, type, message, button, name_elem, tel_elem, email_elem, type_elem, message_elem;
    button = _this.find('.my-sbm');

    name_elem = _this.find('#name');
    lastname_elem = _this.find('#lastname');
    tel_elem = _this.find('#tel');
    email_elem = _this.find('#email');
    type_elem = _this.find('#type');
    message_elem = _this.find('#message');

    name = name_elem.val();
    lastname = lastname_elem.val();
    tel = tel_elem.val();
    email = email_elem.val();
    type = type_elem.val();
    message = message_elem.val();

    var emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var error = false;
    var errors = '';
    var errors_obj = _this.data('messages');

    var infoCont = _this.find('.afterSubmitBlock');

    var data = new FormData();
    data.append('action', 'sendcontactform');
    data.append('name', name);
    data.append('lastname', lastname);
    data.append('tel', tel);
    data.append('email', email);
    data.append('type', type);
    data.append('message', message);

    function addErrorClass(elem, errorClass) {
      $(elem).addClass(errorClass);
    }

    function removeErrorClass(elem, errorClass) {
      $(elem).removeClass(errorClass);
    }

    if (checkEmpty(name)) {
      error = true;
      addErrorClass(name_elem, 'error');
    } else {
      removeErrorClass(name_elem, 'error');
    }

    if (checkEmpty(lastname)) {
      error = true;
      addErrorClass(lastname_elem, 'error');
    } else {
      removeErrorClass(lastname_elem, 'error');
    }

    if (checkEmpty(tel)) {
      error = true;
      addErrorClass(tel_elem, 'error');
    } else {
      removeErrorClass(tel_elem, 'error');
    }

    if (checkEmpty(type)) {
      error = true;
      addErrorClass(type_elem, 'error');
    } else {
      removeErrorClass(type_elem, 'error');
    }

    if (checkEmpty(message)) {
      error = true;
      addErrorClass(message_elem, 'error');
    } else {
      removeErrorClass(message_elem, 'error');
    }

    if (!email.match(emailRegExp)) {
      error = true;
      addErrorClass(email_elem, 'error');
    } else {
      removeErrorClass(email_elem, 'error');
    }

    if (!error) {
      $.ajax({
        url: ajax_object.ajaxurl,
        data: data,
        type: 'POST',
        processData: false,
        contentType: false,
        dataType: "json",

        beforeSend: function (xhr) {
          button.addClass('loading');
        },

        success: function (data) {
          if (data.response == "SUCCESS") {
            button.removeClass('loading');
            _this.find('.formGroup:not(.special)').fadeOut(600);

            infoCont.fadeIn(600).addClass('success').html(errors_obj.success);
          } else {
            console.log(data.error);
          }
        },
      })
    } else {
      //infoCont.fadeIn(600).removeClass('success').addClass('errors').html(errors);
    }
  });

  $('.acceptCookie').click(function(){
    Cookies.set('cookieBanner', 'yes', { expires: 7 });
    $('.cookieBanner').hide(600);
  })
})