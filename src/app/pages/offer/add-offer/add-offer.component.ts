import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  offerForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService
  ) {
  }

  ngOnInit(): void {
    this.offerForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      allTimeActive: [false],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.offerForm)
  }
}
