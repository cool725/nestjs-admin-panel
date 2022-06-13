/*
* Todos:
* replace require with import
*  u can find the credentials file in jira
*
* 1. implement all Merchant API ((u can find the methods at the bottom of the webpage))
* https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants/ -> Methods (create,delete,update,getStatus)
*
* 2. implement All Services API
* https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants.services/ -> All Methods
*
* 3. implement
* https://developers.google.cn/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.availability/replace
*
* Create own class
*
* ensure to delete all your testing data that u have created
* */

import * as fs from 'fs'
import * as path from 'path'
const Client = require("ssh2-sftp-client");
const { JWT } = require("google-auth-library");

// EDIT with your information
const PARTNER_ID = 20000884; // replace by your partner ID
const JSON_KEY_FULL_PATH = './credentials.json';
const ENDPOINT = 'https://partnerdev-mapsbooking.googleapis.com'; // for sandbox
// END EDIT

const keys = require(JSON_KEY_FULL_PATH);

class Merchant{


    constructor(private client,private options) {}

    static testData(){
        // test data
        return  {
            "category": "beauty_salon",
            "merchant_id": "silkskin-1",
            "name": "Silkskin Aesthetic Center, Rosangela Mäder",
            "url": "www.silkskin.ch",
            "telephone": "+41786525655",
            "geo": {
                "latitude": 47.3761,
                "longitude": 8.5416975,
                "address": {
                    "locality": "Zuerich",
                    "country": "CH",
                    "region": "ZH",
                    "street_address": "Limmatquai 138",
                    "postal_code": "8001"
                }
            }

        }
    }

    getStatus(){
        const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/feeds/merchants/status`;
        const res = this.client.request({
            url: url,
            method: 'GET'
        });
        res.then( (result) => {
            console.log(result.data.status);
        });
    }

    get(merchantId:any){
        // implement the get endpoint
        const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/merchants/` + merchantId;

    }

    create(merchantId,merchant)
    {
        const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/merchants`;
        const res = this.client.request({
            url: url,
            method: 'POST',
            params :{
                merchantId: merchantId
            },
            data : merchant,
        });
        return res.then( (result) => {console.log(result.data)});
    }

    update(){
        // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants/patch
    }

    delete(){
        // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants/delete
    }


}

class MerchantServices{
    // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants.services/ -> All Methods (u can find them at the bottom of the webpage)
    constructor(private client,private options) {}
}


const testData = Merchant.testData()

new Merchant(new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/mapsbooking'],
}),{
})

