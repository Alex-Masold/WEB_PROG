// **** Variables **** //
  const BASE_URL = "/api/users"
  
  // **** Run **** //
  
  // Start
  displayUser();
  
  /**
   * Call api
   */
  function displayUser() {
    Http
      .get(`${BASE_URL}`)
      .then(resp => resp.json())
      .then(resp => {
        var allusersTemplate = document.getElementById('all-users-template'),
          allusersTemplateHtml = allusersTemplate.innerHTML,
          template = Handlebars.compile(allusersTemplateHtml);
        var allusersAnchor = document.getElementById('all-users-anchor');
        allusersAnchor.innerHTML = template({
          users: resp.users.map(user => ({
            ...user,
          })),
        });
      });
  }
  
  // Setup event listener for button click
  document.addEventListener('click', event => {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#add-user-btn')) {
      adduser();
    } else if (ele.matches('.edit-user-btn')) {
      showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
      cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
      submitEdit(ele);
    } else if (ele.matches('.delete-user-btn')) {
      deleteUser(ele);
    }
  }, false);
  
  /**
   * Add a new user.
   */
  function adduser() {
    var nameInput = document.getElementById('name-input');
    var data = {
      user: {
        id: -1,
        name: nameInput.value,
      },
    };
    // Call api
    Http
      .post(`${BASE_URL}`, data)
      .then(() => {
        nameInput.value = '';
        displayUser();
      });
  }
  
  /**
   * Show edit view.
   */
  function showEditView(userEle) {
    var normalView = userEle.getElementsByClassName('normal-view')[0];
    var editView = userEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
  }
  
  /**
   * Cancel edit.
   */
  function cancelEdit(userEle) {
    var normalView = userEle.getElementsByClassName('normal-view')[0];
    var editView = userEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
  }
  
  /**
   * Submit edit.
   */
  function submitEdit(ele) {
    var userEle = ele.parentNode.parentNode;
    var nameInput = userEle.getElementsByClassName('name-edit-input')[0];
    var id = ele.getAttribute('data-user-id');
    console.log(ele)
    var data = {
      user: {
        id: Number(id),
        name: nameInput.value,
      },
    };
    Http
      .patch(`${BASE_URL}/${id}`, data)
      .then(() => displayUser());
  }
  
  /**
   * Delete a user
   */
  function deleteUser(ele) {
    var id = ele.getAttribute('data-user-id');
    Http
      .delete(`${BASE_URL}/${id}`)
      .then(() => displayUser());
  }
  