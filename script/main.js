import { hamburgerNav } from './nav.js'

const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        gateway: 'example',
        gatewayMerchantId: 'gatewayMerchantId'
    }
}

cardPaymentMethod = {
    type: 'CARD',
    parameters: {
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    }
}

const googlePayConfiguration = {
    apiVersion: 2,
    apiVersionMonitor: 0,
    allowPaymentMethods: [cardPaymentMethod],
}

let googlePayClient;

function onGooglePayLoaded() {
    googlePayClient = nrw googlePayClient.payments.api.PaymentsClient({
        enviroment: 'TEST',

    })

    googlePayClient.isReadyToPay(googlePayConfiguration)
        .then(response => {
            if (response.result) {
                createAndAddButton()
            }
            else {

            }


        }).catch(error => console.error(`isreadyError:${error}`))
}

function createAndAddButton() {
    const googlePayButton = googlePayClient.createButton({
        onClick: onGooglePayButtonClicked,
    });
    document.getElementById('buy-now').appendChild(googlePayButton)

}

function onGooglePayButtonClicked() {
    const paymentDataRequest = { ...googlePayConfiguration };
    paymentDataRequest.merchantInfo = {
        mercantId: 'BCR2DN4T3CG5L7KN',
        merchantName: 'Papp lászló egyéni vállalkozó',

    };
    paymentDataRequest.transactionInfo = {
        totalPriceStats: 'FINAL',
        totalPreice: selectedItem.price,
        currentCode: 'HUF',
        couintryCode: 'HU',
    }
    googlePayClient.leadPaymentData(paymentDataRequest)
        .then(paymentData => processPaymentData(paymentData))
        .catch(error => console.error(`loadPaymentData error: ${error}`))
}

function proessPaymentData(paymentData) {
    fetch(erdersEndpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        }, body: paymentData
    })
}