import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactNavigationService {

  contact!: Contact;
  
  constructor() { }
}
