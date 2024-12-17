import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';  
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactService } from './contact.service';  
import { RouterModule } from '@angular/router'; // Import RouterModule to use router-outlet

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true,
  imports: [CommonModule, ContactListComponent, RouterModule] 

})
export class ContactsComponent implements OnInit {
  selectedContact: Contact | undefined;  

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;  
    });
  }
}
