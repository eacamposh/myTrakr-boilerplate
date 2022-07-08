$(() => {


  // $('input#radio1').click(function(e){

  // //alert('id ='+ e.currentTarget.id);
  // console.log('id ='+ e.currentTarget.id);

  // });






  //Start coding here!
  // Eduardo Campos
});



$(document).ready(function () {


  let accountsArray = [];
  let new_account = new Account('test_account');
  const empty = 'select-account';

  $('#btn-add-new-category').attr('disabled', true);
  $('#input-new-category').attr('disabled', true);
  //dummy section while waiting merge.

  $('select#select-account').append('<option>' + empty + '</option>');

  $('select#select-account').append('<option>' + new_account.username + '</option>');

  $('select#select-from').append('<option>' + empty + '</option>');

  $('select#select-from').append('<option>' + new_account.username + '</option>');


  $('select#select-to').append('<option>' + empty + '</option>');

  $('select#select-to').append('<option>' + new_account.username + '</option>');


  // to populate category select when the page is loading.
  getCategories();

  $('select#select-category').click(function () {

    let aux = $("#select-category").val();
    console.log('value' + aux);
    if (aux === 'Add new') {

      console.log('inner function papa');

      $("#input-new-category").val('');

      $('#btn-add-new-category').attr('disabled', false);
      $('#input-new-category').attr('disabled', false);


    } else {


      $('#btn-add-new-category').attr('disabled', true);
      $('#input-new-category').attr('disabled', true);
    }


  });

  $("#btn-add-new-category").on("click", function () {


    let category_input = $('#input-new-category').val();
    console.log(category_input);

    if (category_input != '') {

      saveNewCategory(category_input);
      getCategories();

      //it should add the new category
      $("#errorMessage").text('');
      $("#succesMessage").text('A new category was added');

      $('#btn-add-new-category').attr('disabled', true);
      $('#input-new-category').attr('disabled', true);

    } else {
      $("#errorMessage").text('error, you have to type a category name to add');
      $("#succesMessage").text('');
    }

  });


  function saveNewCategory(input) {


    console.log('category ql ' + input);

    const data = { newCategory: input, };
    $.ajax({
      method: 'post',
      data: data,
      url: 'http://localhost:3000/categories',
      dataType: 'json',
    }).done((data) => {
      console.log('data post ajax', data);

    });


  }

  function getCategories() {
    const new_category = 'Add new';
    const select = 'Select Category';

    $.ajax({
      method: 'get',
      url: 'http://localhost:3000/categories',
      dataType: 'json',
    }).done((data) => {
      console.log('data get ajax', data);
      $('select#select-category').empty();

      $('select#select-category').append('<option>' + select + '</option>');

      $.each(data, (i, post) => {
        $('select#select-category').append('<option>' + post.name + '</option>'
        );
      });
      $('select#select-category').append('<option>' + new_category + '</option>');


    });

  }

  //TO-DO
  $('button#btn-add-new-account').click(function () {


  });

  // radio button toggle
  // add an event listener for the change event
  const radioButtons = document.querySelectorAll('input[name="transaction-type"]');
  for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', showSelected);
  }

  function showSelected(e) {
    console.log(e);
    if (this.checked) {

      if (this.id != 'input-transfer') {

        $('select[name=select-from]').attr("disabled", true);

      }
      else {
        $('select[name=select-from]').attr("disabled", false);

      }
      console.log('you have selected :' + this.id);

    }
  }



});