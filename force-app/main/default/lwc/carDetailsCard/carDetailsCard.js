import { api, LightningElement } from 'lwc';
export default class CarDetailsCard extends LightningElement {

    @api
    mycar;

    //firing event on clicking the book car button
    bookNowEvent() {
        this.dispatchEvent(new CustomEvent('bookingevt', { detail: this.mycar }));
    }

}