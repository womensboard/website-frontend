import { ContactDetailInput } from '@/components/organism/forms/contact/edit-contacts-form';
import { apiHTTPClient } from 'lib/http-requester';

export class ContactService {
  static async fetchContact() {
    const res = await apiHTTPClient.get<ContactDetailInput>('/contacts');

    return res;
  }
  static async updateContact(input: ContactDetailInput) {
    const res = await apiHTTPClient.put('/contacts', {
      officeAddress: input.officeAddress,
      emailAddress: input.emailAddress,
      twitter: input.twitter,
      facebook: input.facebook,
      instagram: input.instagram,
      linkedIn: input.linkedIn,
    });

    return res;
  }
}
