import { Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { IndividualContactComponent } from './components/individual-component/individual-component.component';

export const routes: Routes = [
    {
        path: 'contacts',
        component: ContactsListComponent
    },
    {
        path: 'contacts/individual-contact',
        component: IndividualContactComponent
    }
];

