$(() => {


  // $('input#radio1').click(function(e){

  // //alert('id ='+ e.currentTarget.id);
  // console.log('id ='+ e.currentTarget.id);

  // });






  //Start coding here!
  // Eduardo Campos
});



$(document).ready(function () {

  const empty = 'select-account';

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


  // radio button toggle
  // add an event listener for the change event
  const radioButtons = document.querySelectorAll('input[name="transaction-type"]');
  for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', showSelected);
  }

  function showSelected(e) {
    console.log(e);
    if (this.checked) {
      if (this.id === 'input-withdraw' || this.id === 'input-deposit') {

        console.log('with or deposit');
        $('select[name=select-from]').attr("disabled", true);
        $('select[name=select-to]').attr("disabled", true);
        $('select[name=select-account]').attr("disabled", false);
      }
      else if (this.id === 'input-transfer') {
        console.log('ELSE:');
        $('select[name=select-from]').attr("disabled", false);
        $('select[name=select-to]').attr("disabled", false);
        $('select[name=select-account]').attr("disabled", true);

      }
      console.log('you have selected :' + this.id);

    }
  }
  //btn sumbit the transaction.
  $("#btn-add-transaction").on("click", function () {

    if (!$('#input-amount').val()) {
      $("#input-amount").focus();
      $("#errorMessage").text('ammount must to be greater than 0');

    } else if ($("#select-category").val() === 'Select Category' || $("#select-category").val() === 'Add new') {

      $("#select-category").focus();
      $("#errorMessage").text('You must to select a category');
    }

    else if ($("#select-account").val() === '1') {
      console.log('inside account if ' + $("#select-account").val());
      $("#errorMessage").text('You must to select an Account');
      $("#select-account").focus();
    } else if ($('input[name="transaction-type"]:checked').length == 0) {

      $("#errorMessage").text('You must to select  a type of transaction ');
      $("#transaction-type").focus();

    } else {

      let id_checked = $('input[name="transaction-type"]:checked').attr('id')
      console.log('ID CHECKED' + id_checked);
      if (id_checked === 'input-transfer') {
        console.log($("#select-from").val());
        if ($("#select-from").val() === 'Select-Option' || $("#select-to").val() === 'Select-Option') {

          $("#errorMessage").text('You must to select a from and To to create a Transfer ');
          console.log('inside if ql');
        } else if ($("#select-from").val() === $("#select-to").val()) {

          $("#errorMessage").text('You must to select differents acccount to transfer ');

        } else {
          console.log(' ready to save transaction');
          saveNewTransferTransaction();
        }


        //TODO check balance
        // else if () {

        //   $("#errorMessage").text(' ');

        // }

      } else if (id_checked === 'input-withdraw') {

        if ($("#select-account").val() === 'Select-Option' || $("#select-account").val() === 'Select-Option') {

          $("#errorMessage").text('You must to select an Account to make  a Withdraw ');

        } else {

          saveNewWithdrawTransaction();
        }




      } else if (id_checked === 'input-deposit') {


        if ($("#select-account").val() === 'Select-Option' || $("#select-account").val() === 'Select-Option') {

          $("#errorMessage").text('You must to select an Account to make  a Deposit ');

        } else {

          saveNewDeposit();
        }



      }

    }

  });



  $("#btn-clear").on("click", function () {

    window.localStorage.clear();

  });



  function saveNewDeposit() {

    let account_id = $("#select-account").val();


    console.log('saveNewWithdraw ' + account_id.charAt(0));
    $.ajax({
      method: 'post',
      data: JSON.stringify({
        newTransaction: {
          accountId: account_id.charAt(0),
          accountIdFrom: null,
          accountIdTo: null
        },
      }),
      url: 'http://localhost:3000/transaction',
      contentType: 'application/json',
      dataType: 'json',
    }).done((data) => {
      console.log('Transaction Saved', data);
    });

    let amount = $("#input-amount").val();
    let category = $("#select-category").val();
    let description = $("#input-description").val();



    let newTransaction = new Deposit(amount, account_id.charAt(0), description
      , category);

    var transactions = [];
    console.log('beofre get whit ' + JSON.parse(window.localStorage.getItem(account_id.charAt(0))));
    transactions = JSON.parse(window.localStorage.getItem(account_id.charAt(0)));
    if (null != transactions) {
      console.log('ARRAY with' + transactions);
      transactions.push(newTransaction);
      window.localStorage.setItem(account_id.charAt(0), JSON.stringify(transactions));

      $.each(transactions, (i, post) => {
        console.log('itemes Account' + post.account);
        console.log('itemes idFrom' + post.idFrom);
        console.log('itemes idTo' + post.idTo);
        console.log('itemes amount' + post.amount);
        console.log('itemes description' + post.description);
        console.log('itemes category' + post.category);
        console.log('itemes type' + post.transactionType);
      });


    } else {
      var transactions1 = [];
      transactions1.push(newTransaction);
      window.localStorage.setItem(account_id.charAt(0), JSON.stringify(transactions1));


      $.each(transactions1, (i, post) => {
        console.log('itemes Account' + post.account);
        console.log('itemes idFrom' + post.itFrom);
        console.log('itemes idTo' + post.idTo);
        console.log('itemes amount' + post.amount);
        console.log('itemes description' + post.description);
        console.log('itemes category' + post.category);
        console.log('itemes type' + post.transactionType);
      });



    }

  }


  function saveNewWithdrawTransaction() {


    let account_id = $("#select-account").val();


    console.log('saveNewWithdraw ' + account_id.charAt(0));
    $.ajax({
      method: 'post',
      data: JSON.stringify({
        newTransaction: {
          accountId: account_id.charAt(0),
          accountIdFrom: null,
          accountIdTo: null
        },
      }),
      url: 'http://localhost:3000/transaction',
      contentType: 'application/json',
      dataType: 'json',
    }).done((data) => {
      console.log('Transaction Saved', data);
    });

    let amount = $("#input-amount").val();
    let category = $("#select-category").val();
    let description = $("#input-description").val();



    let newTransaction = new Withdrawal(amount, account_id.charAt(0), description
      , category);

    var transactions = [];
    console.log('beofre get whit ' + JSON.parse(window.localStorage.getItem(account_id.charAt(0))));
    transactions = JSON.parse(window.localStorage.getItem(account_id.charAt(0)));
    if (null != transactions) {
      console.log('ARRAY with' + transactions);
      transactions.push(newTransaction);
      window.localStorage.setItem(account_id.charAt(0), JSON.stringify(transactions));

      $.each(transactions, (i, post) => {
        console.log('itemes Account' + post.account);
        console.log('itemes idFrom' + post.idFrom);
        console.log('itemes idTo' + post.idTo);
        console.log('itemes amount' + post.amount);
        console.log('itemes description' + post.description);
        console.log('itemes category' + post.category);
        console.log('itemes type' + post.transactionType);
      });


    } else {
      var transactions1 = [];
      transactions1.push(newTransaction);
      window.localStorage.setItem(account_id.charAt(0), JSON.stringify(transactions1));



      $.each(transactions1, (i, post) => {
        console.log('itemes Account' + post.account);
        console.log('itemes idFrom' + post.idFrom);
        console.log('itemes idTo' + post.idTo);
        console.log('itemes amount' + post.amount);
        console.log('itemes description' + post.description);
        console.log('itemes category' + post.category);
        console.log('itemes type' + post.transactionType);
      });


    }

  }


  function saveNewTransferTransaction() {


    let account_id = '';
    let account_id_from = $("#select-from").val();
    let account_id_to = $("#select-to").val();

    console.log('saveNewTransaction' + account_id_from.charAt(0) + ' to ' + account_id_to.charAt(0));
    $.ajax({
      method: 'post',
      data: JSON.stringify({
        newTransaction: {
          accountId: "",
          accountIdFrom: account_id_from.charAt(0),
          accountIdTo: account_id_to.charAt(0)
        },
      }),
      url: 'http://localhost:3000/transaction',
      contentType: 'application/json',
      dataType: 'json',
    }).done((data) => {
      console.log('Transaction Saved', data);
    });

    let amount = $("#input-amount").val();
    let category = $("#select-category").val();
    let description = $("#input-description").val();


    let newTransaction = new Transfer(amount, '',
      account_id_from.charAt(0), account_id_to.charAt(0), description, category);



    var transactions = [];
    transactions = JSON.parse(window.localStorage.getItem(account_id_from.charAt(0)));
    if (null != transactions) {

      transactions.push(newTransaction);
      window.localStorage.setItem(account_id_from.charAt(0), JSON.stringify(transactions));

      $.each(transactions, (i, post) => {
        console.log('itemes Account' + post.account);
        console.log('itemes idFrom' + post.idFrom);
        console.log('itemes idTo' + post.idTo);
        console.log('itemes amount' + post.amount);
        console.log('itemes description' + post.description);
        console.log('itemes category' + post.category);
        console.log('itemes type' + post.transactionType);
      });


    } else {
      var transactions1 = [];
      transactions1.push(newTransaction);
      window.localStorage.setItem(account_id_from.charAt(0), JSON.stringify(transactions1));

      $.each(transactions1, (i, post) => {
        console.log('itemes Account' + post.account);
        console.log('itemes idFrom' + post.idFrom);
        console.log('itemes idTo' + post.idTo);
        console.log('itemes amount' + post.amount);
        console.log('itemes description' + post.description);
        console.log('itemes category' + post.category);
        console.log('itemes type' + post.transactionType);
      });


    }



  }


  //? Eduardo's Code

  getNewAccounts();


  $('#btn-add-new-account').on('click', function (e) {
    let new_account = $('#new-account').val();

    if (new_account.length == 0) {
      alert("Empty field!");
    } else {

      $.ajax({
        method: 'get',
        url: 'http://localhost:3000/accounts',
        dataType: 'json',
      }).done((data) => {
        console.log('data get ajax', data);
        let aux = 0;

        $.each(data, (i, post) => {
          console.log('New Account: ', post.username);
          if (post.username === new_account) {
            aux = aux + 1;

          }
        });
        if (aux > 0) {
          $("#errorMessage").text('Account already exist!');
        } else {
          console.log('Send post:', new_account);
          $.ajax({
            method: 'post',
            data: JSON.stringify({
              newAccount: {
                username: `${new_account}`,
                transactions: [],
              },
            }),
            url: 'http://localhost:3000/accounts',
            contentType: 'application/json',
            dataType: 'json',
          }).done((data) => {
            console.log('Account Saved', data);
          });

        }
      });
    }

    getNewAccounts();


  });

  function getNewAccounts() {
    let new_account = "Select-Option";
    $.ajax({
      method: 'get',
      url: 'http://localhost:3000/accounts',
      dataType: 'json',
    }).done((data) => {
      console.log('data get ajax', data);
      $('#select-account').empty();
      $('#select-from').empty();
      $('#select-to').empty();
      $('#select-filter-by-account').empty();

      $('#select-account').append('<option>' + new_account + '</option>');
      $('#select-from').append('<option>' + new_account + '</option>');
      $('#select-to').append('<option>' + new_account + '</option>');
      $('#select-filter-by-account').append('<option>' + new_account + '</option>');


      $.each(data, (i, post) => {
        console.log('New Account: ', post.username);
        $('#select-account').append('<option>' + post.id + " " + post.username + '</option>');
        $('#select-from').append('<option>' + post.id + " " + post.username + '</option>');
        $('#select-to').append('<option>' + post.id + " " + post.username + '</option>');
        $('#select-filter-by-account').append('<option>' + post.id + " " + post.username + '</option>');

      });
    });

  }

  /*   //getJSON - file, cb(data)
    $.getJSON('data.json', (data) => {
      $.each(data, (index, user) => {
        $('#th-id').append(`<tr><td>${user.id}</td></tr>`);
        $('#th-username').append(`<tr><td>${user.username}</td></tr>`);
        $('#th-transaction-type').append(`<tr><td>${user.transactionType}</td></tr>`);
        $('#th-category').append(`<tr><td>${user.category}</td></tr>`);
        $('#th-Description').append(`<tr><td>${user.description}</td></tr>`);
        $('#th-amount').append(`<tr><td>${user.amount}</td></tr>`);
        $('#th-from').append(`<tr><td>${user.from}</td></tr>`);
        $('#th-to').append(`<tr><td>${user.to}</td></tr>`);
  
      });
    }); */


  $('#btn-account-sumary').on('click', function (e) {
    getAcoountSumary();
  });


  function getAcoountSumary() {
    $.getJSON('sumary.json', (data) => {
      console.log('data json', data);
      $.each(data, (index, user) => {
        $('#list').append(`<li>${user.id} ${user.username} ${user.total}</li>`);
      });
    });

  }


});