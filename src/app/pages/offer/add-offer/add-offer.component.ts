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
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      allTimeActive: [false],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      contact: ['', [Validators.required, this.customValidator.contactValidator()]],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required]
    });


    this.route.params.subscribe(params => {
      this.id = params['id']

      if(this.id) {
        let offer = this.offerService.getOfferById(this.id)
        console.log(offer)
        this.offerForm.patchValue(offer)
      }

    });

    this.countries$ = this.dropdownService.getCountryList()

    this.states$ = this.offerForm.get('country')!.valueChanges.pipe(
      switchMap(countryId => {

        this.offerForm.get('state')!.reset({value: null, disabled: true});
        this.offerForm.get('city')!.reset({value: null, disabled: true});

        if(countryId) {
          return this.dropdownService.getStateList(countryId)
        } else {
          return []
        }
      })
    );

    this.cities$ = this.offerForm.get('state')!.valueChanges.pipe(
      switchMap(stateId => {

        this.offerForm.get('city')!.reset({value: null, disabled: true});

        if(stateId) {
          return this.dropdownService.getCityList(stateId)
        } else {
          return []
        }
      })
    );

    this.states$.subscribe(() => this.offerForm.get('state')!.enable())
    this.cities$.subscribe(() => this.offerForm.get('city')!.enable())
  }

  listenToAllTimeActive() {
    this.offerForm.get('allTimeActive')?.valueChanges.subscribe(value => {

      console.log(value)

      if(value === true) {
        this.offerForm.get('startDate')?.clearValidators();
        this.offerForm.get('startDate')?.setValue(null)
        this.offerForm.get('startDate')?.updateValueAndValidity();

        this.offerForm.get('endDate')?.clearValidators();
        this.offerForm.get('endDate')?.setValue(null)
        this.offerForm.get('endDate')?.updateValueAndValidity();
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
    return control && control.errors && control.errors['required']
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
