import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the contact based on the ID from the route parameters
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id'); // Extract the contact ID
          return id ? this.contactService.getContact(id) : of(undefined); // Return an observable
        })
      )
      .subscribe({
        next: (contact: Contact | undefined) => {
          this.contact = contact; // Assign the fetched contact
        },
        error: (err: any) => {
          console.error('Error fetching contact:', err);
        }
      });
  }

  onDelete(): void {
    if (this.contact) {
      this.contactService.deleteContactById(this.contact.id); // Delete contact using its ID
      this.router.navigate(['/contacts']); // Navigate back to the contacts list
    }
  }
}

