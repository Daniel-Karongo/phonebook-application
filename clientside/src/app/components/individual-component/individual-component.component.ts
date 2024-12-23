import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactNavigationService } from '../../services/contact-navigation/contact-navigation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../models/contact.interface';
import { CommonModule, Location } from '@angular/common';
import { ContactsService } from '../../services/contacts/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule],
  templateUrl: './individual-component.component.html',
  styleUrl: './individual-component.component.scss'
})
export class IndividualContactComponent {
  
  contact!: Contact;
  contactForm!: FormGroup;

  constructor(
    private contactNavigationService: ContactNavigationService,
    private contactsService: ContactsService,
    private fb: FormBuilder,
    private location: Location,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.contact = this.contactNavigationService.contact;
    
    this.contactForm = this.fb.group({
      id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      physical_address: ['', [Validators.required, Validators.email]],
      // contact_image: ['', Validators.required],
    });

    if(this.contact) {
      this.contactForm.patchValue({
        id: this.contact.id,
        first_name: this.contact.first_name,
        last_name: this.contact.last_name,
        email_address: this.contact.email_address,
        phone_number: this.contact.phone_number,
        physical_address: this.contact.physical_address,
      });
    }
  }

  updateContact() {
    this.contactsService.updateContact(this.contactForm.value).subscribe(
      (data) => {
        this.snackBar.open('Contact updated successfully', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigateByUrl("contacts")
      },
      (error) => {
        this.snackBar.open('Contact update failed', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }

    );
  }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //           const base64String = reader.result as string;
  //           this.contactForm.patchValue({ contact_image: base64String });
  //       };
  //       reader.readAsDataURL(file); // Read file as Base64
  //   }
  // }

  addContact() {
    this.contactsService.addContact(this.contactForm.value).subscribe(
      (data) => {
        this.snackBar.open('Contact added successfully', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigateByUrl("contacts")
      },
      (error) => {
        this.snackBar.open('Contact not added', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }

    );
  }

  goBack() {
    this.location.back(); // This will navigate to the previous page
  }
}
