


// import sdk from '@api/paymongo';




// POST a new webhook
const createWebHook = () => {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
    },
    body: JSON.stringify({
      data: {
        attributes: {
          url: 'https://localhost:4000/api/webhooks',
          events: [
            'source.chargeable',
            'payment.paid',
            'payment.failed',
            'payment.refunded',
            'payment.refund.updated',
            'link.payment.paid',
            'checkout_session.payment.paid'
          ]
        }
      }
    })
  };

  fetch('https://api.paymongo.com/v1/webhooks', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}



// GET ALL webhooks
const getWebhooks = () => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
    }
  };

  fetch('https://api.paymongo.com/v1/webhooks', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
  },
  body: JSON.stringify({
    data: {
      attributes: {
        cancel_url: 'https://www.google.com',
        success_url: 'https://www.google.com',
        show_line_items: true,
        show_description: false,
        send_email_receipt: true,
        billing: { email: 'kyanacademics@gmail.com' },
        line_items: [{ amount: 20000, currency: 'PHP', name: 'May 2024 Monthly Due', quantity: 1 }],
        payment_method_types: [
          'billease',
          'card',
          'dob',
          'dob_ubp',
          'brankas_bdo',
          'brankas_landbank',
          'brankas_metrobank',
          'gcash',
          'grab_pay',
          'paymaya'
        ]
      }
    }
  })
};

fetch('https://api.paymongo.com/v1/checkout_sessions', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

// GET a webhook
const getWebhook = (id) => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
    }
  };

  fetch('https://api.paymongo.com/webhooks/' + id, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}



// DISABLE a webhook
const disableWebhook = (id) => {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
    }
  };

  fetch('https://api.paymongo.com/v1/webhooks/' + id + '/disable', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}



// ENABLE a webhook
const enableWebhook = (id) => {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
    }
  };

  fetch('https://api.paymongo.com/v1/webhooks/' + id + '/enable', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}



// UPDATE a webhook
const updateWebhook = (id) => {

  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
    }
  };

  fetch('https://api.paymongo.com/v1/webhooks/' + id, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}






module.exports = { createWebHook, getWebhooks, getWebhook, updateWebhook, disableWebhook, enableWebhook }

