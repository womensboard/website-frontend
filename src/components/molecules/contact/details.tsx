import React from 'react';
import { BsBriefcase } from 'react-icons/bs';
import { RxEnvelopeClosed } from 'react-icons/rx';
import { SlSocialFacebook } from 'react-icons/sl';
import { SlSocialInstagram } from 'react-icons/sl';
import { CiLinkedin } from 'react-icons/ci';
import { ContactDetailInput } from '@/components/organism/forms/contact/edit-contacts-form';
import { Icon } from '@iconify/react';

type DetailsProps = {
  contactDetailsData: ContactDetailInput;
};

const Details = (props: DetailsProps) => {
  const { contactDetailsData } = props;
  const contactDetails = [
    {
      icon: <BsBriefcase size={30} />,
      text: contactDetailsData.officeAddress,
    },
    {
      icon: <RxEnvelopeClosed size={30} />,
      text: contactDetailsData.emailAddress,
    },
    {
      icon: (
        <Icon icon="ri:twitter-x-line" color="#FB0105" width="25" height="25" />
      ),
      text: contactDetailsData.twitter,
    },
    {
      icon: <SlSocialFacebook size={30} />,
      text: contactDetailsData.facebook,
    },
    {
      icon: <SlSocialInstagram size={30} />,
      text: contactDetailsData.instagram,
    },
    {
      icon: <CiLinkedin size={30} />,
      text: contactDetailsData.linkedIn,
    },
  ];
  return (
    <div className="xl:p-[36px_70px] p-[24px_16px] bg-tertiary_color ">
      <h1 className="text-primary_text_color xl:text-[60px] text-[28px] font-[600] text-center">
        Contact Us
      </h1>

      <div className="grid lg:grid-cols-3 grid-cols-2 gap-[40px] mt-[40px] xl:mt-[72px]">
        {contactDetails.map((detail, index) => (
          <div key={index} className="md:w-[300px] xl:mx-auto">
            <span className="text-primary_CTA_Color">{detail.icon}</span>
            <p className="mt-[10px] text-[12px] md:text-[20px]">
              {detail.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
