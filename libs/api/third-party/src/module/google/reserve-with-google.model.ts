export interface Text {
  value: string;
  localizedValue?: {
    locale: string;
    value: string;
  }[];
}

export interface Price {
  priceMicros: string;
  currencyCode: string;
  pricingOptionTag?: string;
}

export interface GeoCoordinates {
  latitude?: number;
  longitude?: number;
  address?: {
    addressCountry: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode: string;
    streetAddress: string;
  };
  unstructuredAddress?: string;
}
export interface ServiceIntakeForm {
  field: {
    id: string;
    type:
      | 'FIELD_TYPE_UNSPECIFIED'
      | 'SHORT_ANSWER'
      | 'PARAGRAPH'
      | 'MULTIPLE_CHOICE'
      | 'CHECKBOXES'
      | 'DROPDOWN'
      | 'BOOLEAN'
      | 'LOCATION_SEARCH';
    label: string;
    localizedLabel: Text;
    value?: string[];
    choiceText?: Text[];
    isRequired: boolean;
    allowCustomAnswer?: boolean;
    additionalOption?: Text[];
    ticketTypeRestrict?: string[];
    hint?: Text;
  }[];
}
export interface MerchantModel {
  name: string;
  merchantName: string;
  telephone: string;
  url: string;
  geo: GeoCoordinates;
  category?: string;
  numBookings30d?: string;
  taxRate?: {
    microPercent: number;
  };
  paymentRestrictions?: {
    creditCardRestrictions: {
      creditCardType:
        | 'CREDIT_CARD_TYPE_UNSPECIFIED'
        | 'VISA'
        | 'MASTERCARD'
        | 'AMERICAN_EXPRESS'
        | 'DISCOVER'
        | 'JCB'[];
    };
  };
  paymentOption?: any;
  paymentProcessorConfig?: {
    processor:
      | 'PROCESSOR_UNSPECIFIED'
      | 'PROCESSOR_STRIPE'
      | 'PROCESSOR_BRAINTREE';
    publicKey: string;
    version: string;
  };
  tokenizationConfig?: {
    tokenizationParameter: {
      [k: string]: string
    },
    billingInformationFormat: 'BILLING_INFORMATION_FORMAT_UNSPECIFIED'|'MIN'|'FULL'
  };
  terms?: {
    url: string;
    text: string;
    localizedText: {
      value: string;
      localizedValue: {
        locale: string;
        value: string;
      }[];
    };
  };
  brandId?: string;
  matchingHints?: {
    placeId: string;
  };
  serviceAttribute?: {
    attributeId: string;
    attributeName: string;
    value: {
      valueId: string;
      valueName: string;
    }[];
  };
  actionLink?: {
    url: string;
    language: string;
    restrictedCountry: string[];
    platform:
      | 'ACTION_PLATFORM_UNSPECIFIED'
      | 'ACTION_PLATFORM_WEB_APPLICATION'
      | 'ACTION_PLATFORM_MOBILE_WEB'
      | 'ACTION_PLATFORM_ANDROID'
      | 'ACTION_PLATFORM_IOS';
    actionLinkType:
      | 'ACTION_LINK_TYPE_UNSPECIFIED'
      | 'ACTION_LINK_TYPE_BOOK_APPOINTMENT'
      | 'ACTION_LINK_TYPE_BOOK_ONLINE_APPOINTMENT'
      | 'ACTION_LINK_TYPE_ORDER_FOOD'
      | 'ACTION_LINK_TYPE_ORDER_FOOD_DELIVERY'
      | 'ACTION_LINK_TYPE_ORDER_FOOD_TAKEOUT'
      | 'ACTION_LINK_TYPE_MAKE_DINING_RESERVATION';
  }[];
}

export interface MerchantServiceModel {
  name: string;
  serviceName: string;
  localizedServiceName: Text;
  description?: string;
  localizedDescription: Text;
  price: Price;
  priceInterpretation:
    | 'PRICE_INTERPRETATION_UNSPECIFIED'
    | 'EXACT_AMOUNT'
    | 'STARTS_AT'
    | 'NOT_DISPLAYED';
  rules: {
    minAdvanceOnlineCanceling: string;
    admissionPolicy?:
      | 'ADMISSION_POLICY_UNSPECIFIED'
      | 'TIME_STRICT'
      | 'TIME_FLEXIBLE'
      | 'TIMED_ENTRY_WITH_FLEXIBLE_DURATION';
    cancellationPolicy: {
      refundCondition: {
        minDurationBeforeStartTime: string;
        refundPercent: number;
      }[];
    };
    minAdvanceBooking?: string;
    minBookingBufferBeforeEndTime?: string;
  }[];
  prepaymentType:
    | 'PREPAYMENT_TYPE_UNSPECIFIED'
    | 'REQUIRED'
    | 'OPTIONAL'
    | 'NOT_SUPPORTED';
  prepaymentTerms: {
    chargeTiming: 'CHARGE_TIMING_UNSPECIFIED' | 'CHARGE_NOW' | 'CHARGE_LATER';
    chargeTimeBeforeStartTimeSec: string;
  };
  intakeForm?: ServiceIntakeForm;
  perTicketIntakeForm?: ServiceIntakeForm;
  taxRate: {
    microPercent: number;
  };
  paymentOptionId: string[];
  deposit?: {
    deposit: Price;
    minAdvanceCancellationSec: string;
    depositType: 'FIXED_RATE_DEFAULT' | 'PER_PERSON';
  };
  noShowFee?: {
    fee: Price;
    feeType: 'FIXED_RATE_DEFAULT' | 'PER_PERSON';
  };
  requireCreditCard?:
    | 'REQUIRE_CREDIT_CARD_UNSPECIFIED'
    | 'REQUIRE_CREDIT_CARD_CONDITIONAL'
    | 'REQUIRE_CREDIT_CARD_ALWAYS';
  actionLink?: {
    url: string;
    language: string;
    restrictedCountry: string[];
    platform:
      | 'ACTION_PLATFORM_UNSPECIFIED'
      | 'ACTION_PLATFORM_WEB_APPLICATION'
      | 'ACTION_PLATFORM_MOBILE_WEB'
      | 'ACTION_PLATFORM_ANDROID'
      | 'ACTION_PLATFORM_IOS';
    actionLinkType:
      | 'ACTION_LINK_TYPE_UNSPECIFIED'
      | 'ACTION_LINK_TYPE_BOOK_APPOINTMENT'
      | 'ACTION_LINK_TYPE_BOOK_ONLINE_APPOINTMENT'
      | 'ACTION_LINK_TYPE_ORDER_FOOD'
      | 'ACTION_LINK_TYPE_ORDER_FOOD_DELIVERY'
      | 'ACTION_LINK_TYPE_ORDER_FOOD_TAKEOUT'
      | 'ACTION_LINK_TYPE_MAKE_DINING_RESERVATION';
  }[];
  type?:
    | 'SERVICE_TYPE_UNSPECIFIED'
    | 'SERVICE_TYPE_DINING_RESERVATION'
    | 'SERVICE_TYPE_FOOD_ORDERING'
    | 'SERVICE_TYPE_FOOD_DELIVERY'
    | 'SERVICE_TYPE_FOOD_TAKEOUT'
    | 'SERVICE_TYPE_EVENT_TICKET'
    | 'SERVICE_TYPE_TRIP_TOUR'
    | 'SERVICE_TYPE_APPOINTMENT'
    | 'SERVICE_TYPE_ONLINE_APPOINTMENT';
  ticketType?: {
    ticketTypeId: string;
    shortDescription: string;
    localizedShortDescription?: Text;
    price: Price;
    optionDescription?: string;
    localizedOptionDescription?: Text;
  }[];
  relatedMedia?: {
    url: string;
    type: 'TYPE_UNSPECIFIED' | 'PHOTO';
    localizedCaption: Text;
    attribution?: {
      localizedText: Text;
      text: string;
    };
  }[];
  serviceAttributeValueId?: {
    attributeId: string;
    valueId: string;
  }[];
  waitlistRule?: {
    minPartySize: number;
    maxPartySize: number;
    supportsAdditionalRequest: boolean;
  };
  integrationType?:
    | 'INTEGRATION_TYPE_UNSPECIFIED'
    | 'INTEGRATION_TYPE_END_TO_END'
    | 'INTEGRATION_TYPE_INVENTORY_ONLY';
  perOrderFee?: {
    deliveryFee: Price;
    processingFee: Price;
  };
  toursAndActivitiesContent?: {
    highlights: Text[];
    inclusions: Text[];
    exclusions: Text[];
    mustKnow: Text[];
  };
  location?: {
    placeId: string;
    name?: string;
    telephone?: string;
    url?: string;
    geo?: GeoCoordinates;
    locationType?:
      | 'LOCATION_TYPE_UNSPECIFIED'
      | 'VISITED_LOCATION'
      | 'START_LOCATION'
      | 'END_LOCATION';
    locationId?: string;
  }[];
  rating?: {
    value: number;
    numberOfRatings: string;
  };
  homeServiceData?: {
    categoryType: string;
    jobType: string;
  };
  directMerchantPayment?: {
    paymentMethods: Text[];
  };
}

export interface AvailabilityModel {
  startTime: string;
  duration: string;
  spotsTotal: string;
  spotsOpen: string;
  availabilityTag?: string;
  resources?: {
    staffId?: string;
    staffName?: string;
    roomId?: string;
    roomName?: string;
    partySize?: number;
  };
  paymentOptionId?: string[];
  recurrence?: {
    repeatUntil: string;
    repeatEvery: string;
  };
  scheduleException?: [
    {
      timeRange: {
        startTime: string;
        endTime: string;
      };
    }
  ];
  deposit?: {
    deposit: {
      priceMicros: string;
      currencyCode: string;
      pricingOptionTag?: string;
    };
    minAdvanceCancellationSec: string;
    depositType: 'FIXED_RATE_DEFAULT' | 'PER_PERSON';
  };
  noShowFee?: {
    fee: {
      priceMicros: string;
      currencyCode: string;
      pricingOptionTag?: string;
    };
    feeType: 'FIXED_RATE_DEFAULT' | 'PER_PERSON';
  };
  requireCreditCard?:
    | 'REQUIRE_CREDIT_CARD_UNSPECIFIED'
    | 'REQUIRE_CREDIT_CARD_CONDITIONAL'
    | 'REQUIRE_CREDIT_CARD_ALWAYS';
  ticketTypeId?: string[];
  durationRequirement?:
    | 'DURATION_REQUIREMENT_UNSPECIFIED'
    | 'DO_NOT_SHOW_DURATION'
    | 'MUST_SHOW_DURATION';
  schedulingRuleOverrides?: {
    lastBookableSec: string;
    firstBookableSec: string;
    lastOnlineCancellableSec?: string;
  };
  confirmationMode:
    | 'CONFIRMATION_MODE_UNSPECIFIED'
    | 'CONFIRMATION_MODE_SYNCHRONOUS'
    | 'CONFIRMATION_MODE_ASYNCHRONOUS';
}

export interface ExtendedServiceAvailabilityModel {
  merchantId: string;
  serviceId: string;
  startTimeRestrict?: string;
  endTimeRestrict?: string;
  durationRestrict?: string;
  resourcesRestrict?: {
    staffId?: string;
    staffName?: string;
    roomId?: string;
    roomName?: string;
    partySize?: number;
  };
  availability: AvailabilityModel[];
}
