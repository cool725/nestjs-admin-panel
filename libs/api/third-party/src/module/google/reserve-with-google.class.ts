import {
  ExtendedServiceAvailabilityModel,
  MerchantModel,
  MerchantServiceModel,
} from './reserve-with-google.model';

export class Merchant {
  constructor(private client, private options) {}

  getStatus() {
    // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants/getStatus
    const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/feeds/merchants/status`;
    const res = this.client.request({
      url,
      method: 'GET',
    });
    res.then((result) => {
      console.log(result.data);
    });
  }

  create(merchantId: string, merchant: MerchantModel) {
    // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants/create
    const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/merchants`;
    const res = this.client.request({
      url,
      method: 'POST',
      params: {
        merchantId,
      },
      data: merchant,
    });
    return res.then((result) => {
      console.log(result.data);
    });
  }

  update(merchantId: string, merchant: MerchantModel, updateMask: string) {
    // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants/patch
    const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/merchants/${merchantId}`;
    const res = this.client.request({
      url,
      method: 'PATCH',
      params: {
        updateMask,
      },
      data: merchant,
    });
    return res.then((result) => {
      console.log(result.data);
    });
  }

  delete(merchantId: string) {
    // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants/delete
    const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/merchants/${merchantId}`;
    const res = this.client.request({
      url,
      method: 'DELETE',
    });
    return res.then((result) => {
      console.log(result.data);
    });
  }
}

export class MerchantServices {
  // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants.services/ -> All Methods (u can find them at the bottom of the webpage)
  constructor(private client, private options) {}

  create(merchantId: string, serviceId: string, service: MerchantServiceModel) {
    // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants.services/create
    const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/merchants/${merchantId}`;
    const res = this.client.request({
      url,
      method: 'POST',
      params: {
        serviceId,
      },
      data: service,
    });
    return res.then((result) => {
      console.log(result.data);
    });
  }

  update(
    merchantId: string,
    serviceId: string,
    service: MerchantServiceModel,
    updateMask: string
  ) {
    // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants.services/patch
    const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/merchants/${merchantId}/services/${serviceId}`;
    const res = this.client.request({
      url,
      method: 'PATCH',
      params: {
        updateMask,
      },
      data: service,
    });
    return res.then((result) => {
      console.log(result.data);
    });
  }

  delete(merchantId: string, serviceId: string) {
    // https://developers.google.com/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.merchants.services/delete
    const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/merchants/${merchantId}/services/${serviceId}`;
    const res = this.client.request({
      url,
      method: 'DELETE',
    });
    return res.then((result) => {
      console.log(result.data);
    });
  }
}

export class Availability {
  constructor(private client, private options) {}

  replace(availability: ExtendedServiceAvailabilityModel) {
    // https://developers.google.cn/maps-booking/reference/maps-booking-api/rest/v1alpha/inventory.partners.availability/replace
    const url = `${this.options.endpoint}/v1alpha/inventory/partners/${this.options.partnerId}/availability:replace`;
    const res = this.client.request({
      url,
      method: 'POST',
      data: availability,
    });
    return res.then((result) => {
      console.log(result.data);
    });
  }
}
