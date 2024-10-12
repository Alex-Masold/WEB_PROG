// **** Variables **** //

const DateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const BASE_URL = "/api/customers"

const formatDate = (date) => DateFormatter.format(new Date(date));

// **** Run **** //

// Start
displayCustomer();

/**
 * Call api
 */
function displayCustomer() {
  Http
    .get(`${BASE_URL}`)
    .then(resp => resp.json())
    .then(resp => {
      var allcustomersTemplate = document.getElementById('all-customers-template'),
        allcustomersTemplateHtml = allcustomersTemplate.innerHTML,
        template = Handlebars.compile(allcustomersTemplateHtml);
      var allcustomersAnchor = document.getElementById('all-customers-anchor');
      allcustomersAnchor.innerHTML = template({
        customers: resp.customers.map(customer => ({
          ...customer,
          createdFormatted: formatDate(customer.created),
        })),
      });
    });
}

// Setup event listener for button click
document.addEventListener('click', event => {
  event.preventDefault();
  var ele = event.target;
  if (ele.matches('#add-customer-btn')) {
    addcustomer();
  } else if (ele.matches('.edit-customer-btn')) {
    showEditView(ele.parentNode.parentNode);
  } else if (ele.matches('.cancel-edit-btn')) {
    cancelEdit(ele.parentNode.parentNode);
  } else if (ele.matches('.submit-edit-btn')) {
    submitEdit(ele);
  } else if (ele.matches('.delete-customer-btn')) {
    deletecustomer(ele);
  }
}, false);

/**
 * Add a new customer.
 */
function addcustomer() {
  var nameInput = document.getElementById('name-input');
  var emailInput = document.getElementById('email-input');
  var data = {
    customer: {
      id: -1,
      name: nameInput.value,
      email: emailInput.value,
      created: new Date(),
    },
  };
  // Call api
  Http
    .post(`${BASE_URL}`, data)
    .then(() => {
      nameInput.value = '';
      emailInput.value = '';
      displayCustomer();
    });
}

/**
 * Show edit view.
 */
function showEditView(customerEle) {
  var normalView = customerEle.getElementsByClassName('normal-view')[0];
  var editView = customerEle.getElementsByClassName('edit-view')[0];
  normalView.style.display = 'none';
  editView.style.display = 'block';
}

/**
 * Cancel edit.
 */
function cancelEdit(customerEle) {
  var normalView = customerEle.getElementsByClassName('normal-view')[0];
  var editView = customerEle.getElementsByClassName('edit-view')[0];
  normalView.style.display = 'block';
  editView.style.display = 'none';
}

/**
 * Submit edit.
 */
function submitEdit(ele) {
  var customerEle = ele.parentNode.parentNode;
  var nameInput = customerEle.getElementsByClassName('name-edit-input')[0];
  var emailInput = customerEle.getElementsByClassName('email-edit-input')[0];
  var id = ele.getAttribute('data-customer-id');
  var created = ele.getAttribute('data-customer-created');
  console.log(ele, created)
  var data = {
    customer: {
      id: Number(id),
      name: nameInput.value,
      email: emailInput.value,
      created: new Date(created),
    },
  };
  Http
    .patch(`${BASE_URL}/${id}`, data)
    .then(() => displayCustomer());
}

/**
 * Delete a customer
 */
function deletecustomer(ele) {
  var id = ele.getAttribute('data-customer-id');
  Http
    .delete(`${BASE_URL}/${id}`)
    .then(() => displayCustomer());
}
