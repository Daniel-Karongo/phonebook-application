import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Contact } from '../../models/contact.interface';
import { environments } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrl = environments.contactsApiBaseUrl;
  
  constructor(
    private http: HttpClient
  ) { 
    console.log("contacts service")
  }

  getContacts(): Observable<Contact[]> {
    const url = `${this.baseUrl}/api/contacts`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true,
    });

    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => {
          return event.body as Contact[]
      })
    );
  }

  getFavoriteContacts(): Observable<Contact[]> {
    const url = `${this.baseUrl}/api/contacts/favorites`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true,
    });

    console.log(request);

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => {
          return event.body as Contact[]
      })
    );
  }

  getContactById(id: number): Observable<Contact> {
    const url = `${this.baseUrl}/api/contact/${id}`;
    const request = new HttpRequest('GET', url, {
      reportProgress: true,
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),  // Filter only the final response
      map((event: any) => {
          return event.body as Contact
      })
    );
    // return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contact) {
    const url = `${this.baseUrl}/api/contact`;

    // Construct the HTTP request
    const request = new HttpRequest('POST', url, contact, {
        reportProgress: true, // Enable progress reporting
        // withCredentials: true, // Optional, if you need to send credentials (cookies, headers)
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),
      map((event: any) => event.body as Contact)
  );
  }

  updateContact(updatedContact: Contact) {
    const url = `${this.baseUrl}/api/contact/${updatedContact.id}`;

    // Construct the HTTP request
    const request = new HttpRequest('PUT', url, updatedContact, {
        reportProgress: true, // Enable progress reporting
        // withCredentials: true, // Optional, if you need to send credentials (cookies, headers)
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),
      map((event: any) => event.body as Contact)
    );
  }

  addAsFavorite(id: number) {
    const url = `${this.baseUrl}/api/contacts/favorite/${id}`;

    // Construct the HTTP request
    const request = new HttpRequest('PUT', url, {
        reportProgress: true, // Enable progress reporting
        // withCredentials: true, // Optional, if you need to send credentials (cookies, headers)
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),
      map((event: any) => event.body as Contact)
    );
  }

  removeFromFavorites(id: number) {
    const url = `${this.baseUrl}/api/contacts/favorites/${id}`;

    const request = new HttpRequest('DELETE', url, {
        reportProgress: true,
        // withCredentials: true,
    });

    return this.http.request(request).pipe(
        filter(event => event.type === HttpEventType.Response),
        map((event: any) => event.body) // Response will typically just have a message
    );
  }
  
  deleteContact(id: number) {
    const url = `${this.baseUrl}/api/contact/${id}`;

    const request = new HttpRequest('DELETE', url, {
        reportProgress: true,
        // withCredentials: true,
    });

    return this.http.request(request).pipe(
        filter(event => event.type === HttpEventType.Response),
        map((event: any) => event.body) // Response will typically just have a message
    );
  }

  bulkDelete(ids: number[]) {
    const url = `${this.baseUrl}/api/contacts`;

    const request = new HttpRequest('DELETE', url, ids, {
        reportProgress: true,
        // withCredentials: true,
    });

    return this.http.request(request).pipe(
        filter(event => event.type === HttpEventType.Response),
        map((event: any) => {
          console.log(event);
          return event.body
        }) // Response will typically just have a message
    );
  }

  bulkRemoveFromFavorites(ids: number[]) {
    console.log(ids);
    const url = `${this.baseUrl}/api/contacts/favorites`;

    const request = new HttpRequest('DELETE', url, ids, {
        reportProgress: true,
        // withCredentials: true,
    });

    return this.http.request(request).pipe(
      filter(event => event.type === HttpEventType.Response),
      map((event: any) => {
        console.log(event);
        return event.body
      }) // Response will typically just have a message
  );
  }

  ngOnDestroy() {
    console.log("Destoying service");
  }
}
