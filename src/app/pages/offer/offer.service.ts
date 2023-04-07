import { Injectable } from '@angular/core';

@Injectable()
export class OfferService {

  offerList: any = []
  currentOfferId = 1

  constructor() { }


  addOffer(offer: any) {
    this.offerList.push({
      id: this.currentOfferId,
      ...offer
    })

    this.currentOfferId++;
  }

  editOffer(offer: any) {
    let existingOffer = this.offerList.find((obj: any) => obj.id === offer.id)

    if(!existingOffer) return

    existingOffer = offer
  }

  removeOffer(offerId: any) {
    this.offerList = this.offerList.filter((offer: any) => offer.id !== offerId)
  }
}
