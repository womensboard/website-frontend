'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import Details from '@/components/molecules/contact/details';
import Footer from '@/components/molecules/footer';
import clsx from 'clsx';
import { Editable } from '@/components/organism/Editable';
import Modal from '@/components/organism/modal';
import {
  ContactDetailInput,
  EditContactsForm,
  defaultValues,
} from '@/components/organism/forms/contact/edit-contacts-form';
import { ContactService } from 'services/contact-services';
import { LoadingSpiner } from '@/components/atom/loading-spinner';
import Button from '@/components/atom/button';

type ContactProps = {
  isAdmin: boolean;
};

type ModalName = 'update';

const Contact = (props: ContactProps) => {
  const { isAdmin = false } = props;

  const [showModal, setShowModal] = useState<ModalName | null>(null);

  const [contactDetails, setContactDetails] =
    useState<ContactDetailInput>(defaultValues);

  const [loading, setLoading] = useState(true);

  const closeModal = () => setShowModal(null);

  useEffect(() => {
    async function handleContactPage() {
      const { data: contactData } = await ContactService.fetchContact();
      if (contactData) setContactDetails(contactData as ContactDetailInput);

      setLoading(false);
    }

    handleContactPage();
  }, []);

  const handleSubmit = async (values: ContactDetailInput) => {
    const res = await ContactService.updateContact(values);

    const newData = res.data;

    if (newData) {
      setContactDetails({ ...newData });
      closeModal();
    }

    return res;
  };

  const showContactDetails = (contactData: ContactDetailInput) => {
    setContactDetails(contactData);
    setShowModal('update');
  };

  const contactFormURL =
    process.env.NEXT_PUBLIC_MAILCHIMP_CONTACT_FORM_URL || '';

  return (
    <div className={clsx(isAdmin && 'group is-admin', 'font-mulish')}>
      <Navbar isAdmin={isAdmin} />
      <Editable
        title="Contacts"
        onEditBtnClick={() =>
          showContactDetails(contactDetails as ContactDetailInput)
        }
      >
        {loading && (
          <div>
            Loading Contact Details <LoadingSpiner />
          </div>
        )}
        {!loading && <Details contactDetailsData={contactDetails} />}
      </Editable>

      <div className="flex flex-col items-center justify-center lg:my-[104px] my-[40px]">
        <h3 className="text-primary_CTA_Color text-center md:mb-[64px] font-[600] text-[14px] md:text-[24px]">
          or send a direct message via this form below
        </h3>
        <div className="flex justify-center">
          <Button
            href={contactFormURL}
            type="cta"
            size="md"
            disabled={loading}
            loading={loading}
            rounded
          >
            Click Here
          </Button>
        </div>
      </div>

      <Footer isAdmin={isAdmin} />

      <Modal
        visible={showModal === 'update'}
        title={'Edit Contacts'}
        onClose={closeModal}
      >
        <EditContactsForm
          defaults={contactDetails as ContactDetailInput}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Contact;
