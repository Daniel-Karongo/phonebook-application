import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts/contacts.service';
import { Contact } from '../../models/contact.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ContactNavigationService } from '../../services/contact-navigation/contact-navigation.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent implements OnInit {

  contacts: Contact[] = [];
  viewMode: 'list' | 'grid' = 'list'; // Default view is list
  selectedContacts: number[] = []; // For bulk deletion
  selectedFavoriteContacts: number[] = []; // For bulk deletion
  favoritesPanel: boolean = false;

  constructor(
    private contactService: ContactsService,
    private contactNavigationService: ContactNavigationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data || []; // Assign an empty array if data is null/undefined
      },
      (error) => {
        this.contacts = []; // Assign an empty array in case of error
      }
    );
  }

  getFavoriteContacts() {
    this.contactService.getFavoriteContacts().subscribe(
      (data) => {
        this.contacts = data || []; // Assign an empty array if data is null/undefined
      },
      (error) => {
        this.contacts = []; // Assign an empty array in case of error
      }
    );
  }

  toggleView() {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }

  viewFavorites() {
    this.contacts = this.contacts.filter(contact => {
      return contact.favorite===1;
    });
    this.favoritesPanel = true;
    this.clearAllCheckboxes();
  }

  clearAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false; // Explicitly assert type
    });
  
    // Clear the bulk selection list
    this.selectedContacts = [];
  }

  viewAllContacts() {
    this.getContacts();
    this.favoritesPanel = false;
    this.clearAllCheckboxes();
  }

  removeFromFavorites(id: number, event: Event) {
    event.stopPropagation();
    this.contactService.removeFromFavorites(id).subscribe(
      (data) => {
        this.snackBar.open('Contact removed from favorites', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.getFavoriteContacts();
      },
      (error) => {
        this.snackBar.open('Contact failed to remove from favorites', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  addANewContact() {
    this.router.navigateByUrl("/contacts/individual-contact");
  }

  addANewFavorite(id: number, event: Event) {
    event.stopPropagation();
    this.contactService.addAsFavorite(id).subscribe(
      (data) => {
        this.snackBar.open('Contact set as favorite', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.getContacts();
      },
      (error) => {
        this.snackBar.open('Contact failed to set as favorite', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  searchContacts(event: Event) {
    const input = event.target as HTMLInputElement;  // Cast the target to HTMLInputElement
    const searchTerm = input.value.trim();  // Now TypeScript knows input has a 'value' property
  
    if (searchTerm) {
      // Filter contacts based on the search term
      this.contacts = this.contacts.filter(contact => {
        return contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               contact.email_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
               contact.phone_number.includes(searchTerm);
      });
    } else {
      // Reset the contacts list if the search term is empty
      this.getContacts();
    }
  }

  deleteContact(id: number, event: Event) {
    event.stopPropagation();
    this.contactService.deleteContact(id).subscribe(
      (data) => {
        this.snackBar.open('Contact deleted successful', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.getContacts();
      },
      (error) => {
        this.snackBar.open('Contact failed to deleted', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  selectContact(contact: Contact) {
    this.contactNavigationService.contact = contact;
  } 

  addToBulk(id: number, event: Event) {
    event.stopPropagation();
    const checkbox = event.target as HTMLInputElement; // Typecast to HTMLInputElement to access the 'checked' property
    if (checkbox.checked) {
      if(!this.favoritesPanel) {
        // Add the ID if not already present
        if (!this.selectedContacts.includes(id)) {
          this.selectedContacts.push(id);
        }
      } else {
        // Add the ID if not already present
        if (!this.selectedFavoriteContacts.includes(id)) {
          this.selectedFavoriteContacts.push(id);
        }
      }
    } else {
      if(!this.favoritesPanel) {
        // Remove the ID if it exists
        this.selectedContacts = this.selectedContacts.filter(contactId => contactId !== id);
      } else {
        this.selectedFavoriteContacts = this.selectedFavoriteContacts.filter(contactId => contactId !== id);
      }
      
    }
  }

  bulkDelete() {
    this.contactService.bulkDelete(this.selectedContacts).subscribe(
      (data) => {
        this.snackBar.open('Contacts deleted successful', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.selectedContacts = [];
        this.getContacts();
      },
      (error) => {
        this.snackBar.open('Contacts failed to deleted', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  contactToView(contact: Contact, event: Event) {
    this.contactNavigationService.contact = contact;
    this.router.navigateByUrl("/contacts/individual-contact");
  }

  stopPropagation(event: Event) {
    event.stopPropagation(); // Helper method to stop propagation
  }

  bulkRemoveFromFavorites() {
    console.log(this.selectedFavoriteContacts);
    this.contactService.bulkRemoveFromFavorites(this.selectedFavoriteContacts).subscribe(
      (data) => {
        this.snackBar.open('Contacts removed from favorites successfully', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.selectedFavoriteContacts = [];
        this.getFavoriteContacts();
      },
      (error) => {
        this.snackBar.open('Contacts failed to be removed from favorites', 'X', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
  
  ngOnDestroy() {
    console.log("destroying component");
  }
}