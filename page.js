module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: "#code",
    commentField: "#comment",
    cardNumberField: '//input[@id="number" and @name="number"]',
    cvvField: '//input[@id="code" and @name="code"]',
    linkButton: "button=Link",

    //Overlay
    overlay: ".overlay",

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: 'div.np-text=Phone number',
    supportiveButton: 'div=Supportive',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    placeOrderButton: '.smart-button-main=Order',
    addCardButton: 'div.pp-title=Add card',
    cardCloseButton: '//div[text()="Adding a card"]/preceding-sibling::button[@class="close-button section-close"]',
    addedCard: 'div=Card',
    linkCardButton: '//button[@type="submit" and @class="button full" and text()="Link"]',
    paymentMethod: '//div[@class="pp-text" and text()="Payment method"]',
    iceCreamCounterPlusButton: 'div.counter-plus',
    orderButton: 'button=order',
    blanketSwitch: '.switch-input',
    blanketAndHandkerchiefsButton: '.r-sw',


    // Modals
    carSearchModal: '.car-search-modal',
    driverInfoModal: '.driver-info-modal',
    phoneNumberModal: '.modal',
    driverInfoModal: 'div*=The driver will arrive',
    cardModal: '.payment-picker.open',
    cardDisplay: '//div[@class="pp-value-text" and text()="Card"]',

    // Functions
    waitForOverlayToDisappear: async function () {
        const overlay = await $(this.overlay);
        await overlay.waitForDisplayed({ reverse: true, timeout: 15000 });
    },

    fillAddresses: async function(from, to)  {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },

    submitPhoneNumber: async function (phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1);
        const code = await requests[0].response.body.code;
        await codeField.setValue(code);
        await $(this.confirmButton).click();
    },

    addPaymentMethod: async function(cardNumber, cvv) {
        const paymentMethod = await $(this.paymentMethod);
        await paymentMethod.waitForDisplayed({ timeout: 30000});
        await paymentMethod.click();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed({ timeout: 30000});
        await addCardButton.click();
        const cardModal = await $(this.cardModal);
        await cardModal.waitForDisplayed({timeout: 30000});
        const cardNumberField = await $(this.cardNumberField); 
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(String(cardNumber));
        const cvvField = await $(this.cvvField);
        await cvvField.waitForDisplayed();
        await cvvField.setValue(String(cvv));
        await browser.keys("Tab");
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();
        const cardCloseButton = await $('.payment-picker .close-button');
        await cardCloseButton.waitForDisplayed();
        await cardCloseButton.click();
    },

    writeDriverMessage: async function (message) {
        const messageField = await $(this.commentField);
        await messageField.waitForDisplayed();
        await messageField.setValue(message);
    },

    selectSupportivePlan: async function () {
        await this.waitForOverlayToDisappear();
        const supportivePlan = await $("div=Supportive");
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();
    },

    selectVehicleType: async function (planName) {
        await this.waitForOverlayToDisappear();
        const vehicleType = await $(`div=${planName}`);
        await vehicleType.waitForDisplayed();
        await vehicleType.click();
    },

    orderBlanketAndHandkerchiefs: async function () {
        const blanketAndHandkerchiefsButton = await $(this.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefsButton.waitForDisplayed();
        await blanketAndHandkerchiefsButton.click()
    },

    orderIceCreams: async function (quantity) {
        const iceCreamCounterPlusButton = await $(this.iceCreamCounterPlusButton);
        await iceCreamCounterPlusButton.waitForDisplayed();
        await iceCreamCounterPlusButton.click();
        await iceCreamCounterPlusButton.click();
    },

    verifyCarSearchModal: async function () {
        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForDisplayed({ timeout: 45000 });
    },
      
    waitForCarSearchModal: async function () {
        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForDisplayed({ timeout: 45000 });
    },
      
    waitForDriverInfo: async function () {
        const driverInfoModal = await $(this.driverInfoModal);
        await driverInfoModal.waitForDisplayed({ timeout: 45000 });
    },
      
    clickPlaceOrderButton: async function () {
        const orderButton = await $(this.placeOrderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
    },

    waitForDriverAssignmentCountdown: async function (timeout = 45000) {
        await browser.pause(timeout);
    },

    verifyDriverInfoModalTitle: async function (expectedTitle) {
        const driverInfoModal = await $(this.driverInfoModal);
        const driverInfoModalTitle = await driverInfoModal.$(".driver-info-modal-title");
        await driverInfoModalTitle.waitForDisplayed();
        const titleText = await driverInfoModalTitle.getText();
        return titleText === expectedTitle;
    },
};