import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidatorService } from 'src/app/common/custom-validator.service';
import { DropdownService } from 'src/app/common/dropdown.service';
import { Observable, map, skip, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  offerForm!: FormGroup

  id: any = null

  countries$!: Observable<any[]>;
  states$!: Observable<any[]>;
  cities$!: Observable<any[]>;


  countryList: any = []
  stateList: any = []
  cityList: any = []

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private customValidator: CustomValidatorService,
    private dropdownService: DropdownService
  ) {

  }

  ngOnInit(): void {
    this.offerForm = this.formBuilder.group({
      name: ['test', Validators.required],
      code: ['test', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      allTimeActive: [true],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      contact: ['8888888888', [Validators.required, this.customValidator.contactValidator()]],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required]
    });


    this.listenToAllTimeActive()


    this.route.params.subscribe(params => {
      this.id = params['id']

      if(this.id) {
        let offer = this.offerService.getOfferById(this.id)
        this.offerForm.patchValue(offer)

        this.getStateList(offer.country)
        this.getCityList(offer.state)
      }

    });

    this.getCountryList()

  }

  getCountryList() {
    this.dropdownService.getCountryList().subscribe((result) => {
      this.countryList = result
    })
  }
  getStateList(countryId: any) {
    this.dropdownService.getStateList(countryId).subscribe((result) => {
      this.stateList = result
    })
  }
  getCityList(stateId: any) {
    this.dropdownService.getCityList(stateId).subscribe((result) => {
      this.cityList = result
    })
  }

  countrySelected(countryId: any) {
    this.stateList = []
    this.cityList = []

    this.offerForm.get('state')!.setValue(null)
    this.offerForm.get('city')!.setValue(null)

    this.getStateList(countryId)
  }

  stateSelected(stateId: any) {
    this.cityList = []

    this.offerForm.get('city')!.setValue(null)

    this.getCityList(stateId)
  }

  listenToAllTimeActive() {
    this.offerForm.get('allTimeActive')?.valueChanges.subscribe(value => {

      console.log(value)

      if(value === true) {
        this.offerForm.get('startDate')?.clearValidators();
        this.offerForm.get('startDate')?.updateValueAndValidity();
        this.offerForm.get('startDate')?.setValue(null)

        this.offerForm.get('endDate')?.clearValidators();
        this.offerForm.get('endDate')?.updateValueAndValidity();
        this.offerForm.get('endDate')?.setValue(null)
      } else {
        this.offerForm.get('startDate')?.setValidators(Validators.required);
        this.offerForm.get('startDate')?.updateValueAndValidity();

        this.offerForm.get('endDate')?.setValidators(Validators.required);
        this.offerForm.get('endDate')?.updateValueAndValidity();
      }
      console.log(this.offerForm.get('startDate'))
    })
  }

  onSubmit() {
    console.log(this.offerForm)
    if(!this.offerForm.valid) {
      this.offerForm.markAllAsTouched()
      return
    }

    let data = this.offerForm.value


    if(this.id) {
      console.log('editOffer', data)
      this.offerService.editOffer(data, this.id)
    } else {
      this.offerService.addOffer(data)
    }

    this.router.navigate(['/offer/list'])

  }

  allTimeActiveChange(value: boolean) {
    console.log(value)
  }

  isRequired(controlName: string): boolean {
    const control = this.offerForm.get(controlName);
    return control?.hasValidator(Validators.required) || false
  }

  getErrorMessage(controlName: string): string {

    const control = this.offerForm.get(controlName)!

    if ((control.touched || control.dirty) && control.errors) {
      if (control.hasError('required')) {
        return 'This field is required.';
      } else if (control.hasError('minlength')) {
        return `This field must be at least ${control.errors!['minlength'].requiredLength} characters long.`;
      } else if (control.hasError('maxlength')) {
        return `This field cannot be longer than ${control.errors!['maxlength'].requiredLength} characters.`;
      } else if (control.hasError('email')) {
        return 'Please enter a valid email address.';
      } else if (control.hasError('invalidContact')) {
        return 'Please enter valid contact number'
      }
    }
    return '';
  }

}
