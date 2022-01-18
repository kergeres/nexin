const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        gateway: 'example',
        gatewayMerchantId: 'gatewayMerchantId'
    }
}
let price;
document.querySelector('#submit').addEventListener('click', () => {
    price = document.querySelector('#total').innerHTML
    document.querySelector('#submit').style.display = "none"
    onGooglePayLoaded()
})

cardPaymentMethod = {
    type: 'CARD',
    tokenizationSpecification: tokenizationSpecification,
    parameters: {
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    }
}

const googlePayConfiguration = {
    apiVersion: 2,

    apiVersionMinor: 0,
    allowedPaymentMethods: [cardPaymentMethod],
}

let googlePayClient;

function onGooglePayLoaded() {
    googlePayClient = new google.payments.api.PaymentsClient({
        enviroment: 'PRODUCTION',

    })

    googlePayClient.isReadyToPay(googlePayConfiguration)
        .then(response => {
            if (response.result) {
                createAndAddButton()
            }
            else {
            }
        }).catch(error => console.error(`is ready Error:${error}`))
}

function createAndAddButton() {
    const googlePayButton = googlePayClient.createButton({
        onClick: onGooglePayButtonClicked,
    });
    document.querySelector('.table-container').appendChild(googlePayButton)

}

function onGooglePayButtonClicked() {
    alert("Selected item is not in stock")
    // const paymentDataRequest = { ...googlePayConfiguration };
    paymentDataRequest.merchantInfo = {
        merchantId: 'BCR2DN4T3CG37ORA',
        merchantName: 'Nexin',

    };
    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: price,
        currencyCode: 'HUF',
        countryCode: 'HU',
    }
    googlePayClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => console.log(paymentData))
        .catch(error => console.error(`loadPaymentData error: ${error}`))
}

function processPaymentData(paymentData) {
    fetch(ordersEndpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        }, body: paymentData
    })
}