import { Injectable } from '@angular/core';

@Injectable()
export class OfferService {

  private offerList: any = []
  currentOfferId = 1

  constructor() { }

  getOffers() {
    return this.offerList
  }

  getOfferById(offerId: any) {
    return this.offerList.find((offer: any) => offer.id == offerId)
  }

  addOffer(offer: any) {
    this.offerList.push({
      id: this.currentOfferId,
      ...offer
    })

    this.currentOfferId++;
  }

  editOffer(offer: any, offerId: any) {
    let existingOffer = this.offerList.find((obj: any) => obj.id == offerId)

    console.log("existingOffer", existingOffer)

    if(!existingOffer) return

    existingOffer.name = offer.name
    existingOffer.code = offer.code
    existingOffer.allTimeActive = offer.allTimeActive
    existingOffer.startDate = offer.startDate
    existingOffer.endDate = offer.endDate
  }

  removeOffer(offerId: any) {
    this.offerList = this.offerList.filter((offer: any) => offer.id !== offerId)
  }
}
