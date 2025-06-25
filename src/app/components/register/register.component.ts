import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match-directive';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, Message, Toast, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private _localStorageService = inject(LocalStorageService);
  private _router = inject(Router);
  canDeActivate = signal<boolean>(false);
  visible: boolean = false;
  private messageService = inject(MessageService);
  onUserConfirmed: () => void = () => { };
  onUserCancelled: () => void = () => { };

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
      userName: new FormControl("", [Validators.required, Validators.pattern("^[A-Za-z]+$")]),
      password: new FormControl("", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[*@%$#]).{8,}")]),
      confirmPassword: new FormControl("", [Validators.required]),
      fullAddress: new FormArray([this.createFormGroup()])
    }, {
      validators: passwordMatchValidator,
    })
  }

  ngDoCheck() {
    if (this.registerForm.touched && !this.registerForm.valid) {
      this.canDeActivate.set(true)
    }
  }

  addAddress() {
    const control = <FormArray>this.registerForm.controls['fullAddress'];
    control.push(this.createFormGroup());
  };

  get addresses() {
    return this.registerForm.get('fullAddress') as FormArray;
  }

  deleteAddress(i: number) {
    if (i > 0) {
      this.addresses.removeAt(i)
    }
  }

  createFormGroup(): FormGroup {
    const addressRow: FormGroup = new FormGroup({
      address: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    })

    return addressRow;
  }

  submit() {
    const accounts = this._localStorageService.getLocalStorage();
    let isEmailExist: boolean = false;
    if (accounts.length > 0) {
      isEmailExist = accounts.some(account => {
        return account.email === this.registerForm.value.email
      })

      if (isEmailExist) {
        this.showError();

      } else {
        this._localStorageService.setInLocalStorage(this.registerForm.value);
        this._router.navigateByUrl('/login');
      }
    } else {
      this._localStorageService.setInLocalStorage(this.registerForm.value);
      this._router.navigateByUrl('/login');
    }
  }

  clearForm() {
    this.registerForm.reset();
  }

  showConfirm(resolve: (result: boolean) => boolean) {
    if (!this.visible) {
      this.messageService.add({
        key: 'confirm',
        sticky: true,
        severity: 'secondary',
        styleClass: 'backdrop-blur-lg rounded-2xl',
      });
      this.visible = true;

      this.onUserConfirmed = () => {
        this.onClose();
        resolve(true);
      };

      this.onUserCancelled = () => {
        this.onClose();
        resolve(false);
      };
    }
  }

  onClose() {
    this.visible = false;
    this.messageService.clear('confirm');
  }

  showError() {
    this.messageService.add({ severity: 'secondary', summary: 'Error', detail: 'This email is already exist!'});
  }
}
