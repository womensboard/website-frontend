'use client';

import React, { useEffect, useState } from 'react';
import SectionHeading from '../atom/section-heading';
import Image from 'next/image';
import { Editable } from '../organism/Editable';
import Modal from '../organism/modal';
import EditActivitiesForm from '../organism/forms/home/edit-activities-form';
import { ActivitiesService } from 'services/home/activities';
import { FaPlus } from 'react-icons/fa';

export type Activities = {
  id: string;
  imageURL: string;
  description: string;
};

export type ActivitiesData = Activities & {
  id: string;
};

type ModalNames = 'createActivity' | 'updateActivity';

const AreasOfActivities = () => {
  const [showModal, setShowModal] = useState<ModalNames | null>(null);
  const [currentActivity, setCurrentActivity] =
    useState<ActivitiesData | null>();

  const [activities, setActivities] = useState<ActivitiesData[]>([]);

  useEffect(() => {
    async function setUpActivities() {
      const { data: activitiesData } =
        await ActivitiesService.fetchActivities();

      if (activitiesData) setActivities(activitiesData);
    }
    setUpActivities();
  }, []);

  const handleSubmitActivity = async (values: Activities) => {
    let res;
    if (showModal === 'createActivity') {
      res = await ActivitiesService.createActivity(values);
      const newItem = res.data;
      if (newItem) setActivities((items) => [...items, newItem]);
    } else {
      res = await ActivitiesService.updateActivity(
        currentActivity?.id as string,
        values
      );

      const updatedItem = res.data;
      if (updatedItem)
        setActivities((items) =>
          items.map((item) => {
            if (item.id === updatedItem.id) return updatedItem;
            return item;
          })
        );
    }

    if (res.data) {
      closeModal();
    }

    return res;
  };

  const showEditActivity = (activityData: ActivitiesData) => {
    setCurrentActivity(activityData);
    setShowModal('updateActivity');
  };

  const handleDeleteActivity = async (activityData: ActivitiesData) => {
    const res = await ActivitiesService.deleteActivity(activityData.id);

    if (res.statusCode === 200) {
      setActivities((items) =>
        items.filter((item) => item.id !== activityData.id)
      );
    }
  };

  const closeModal = () => setShowModal(null);

  return (
    <>
      <div className="flex flex-col items-center py-6 bg-secondary_color">
        <SectionHeading heading="Areas of Activities" />

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 place-content-between">
          {activities.map((activity, index) => {
            return (
              <Editable
                key={index}
                title="Areas of Activities"
                onEditBtnClick={() => showEditActivity(activity)}
                onDeleteBtnClick={() => handleDeleteActivity(activity)}
              >
                <div className="lg:w-[420px] max-w-[343px] relative">
                  <div className="relative lg:w-[420px]  max-w-[343px] lg:h-[320px] h-[240px]">
                    <Image
                      src={activity.imageURL}
                      alt="news-image"
                      className="object-cover rounded-[8px_8px_0_0]"
                      fill
                    />
                  </div>

                  <div className="p-[16px] font-mulish text-left rounded-[0px_0px_20px_20px] bg-white">
                    <h1 className="text-primary_text_color font-[600] text-center text-[24px]">
                      {activity.description}
                    </h1>
                  </div>
                </div>
              </Editable>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="bg-admin_overlay_bg_color text-admin_font_size hover:border-gray-300 text-white h-60 w-full hidden justify-center items-center  group-[.is-admin]:flex"
        onClick={() => setShowModal('createActivity')}
      >
        <div className="flex ">
          <FaPlus className="mr-5" />
          <span> Add Activity</span>
        </div>
      </button>

      <Modal
        visible={showModal === 'createActivity'}
        title="Add Activity"
        onClose={closeModal}
      >
        <EditActivitiesForm
          onSubmit={handleSubmitActivity}
          onClose={closeModal}
        />
      </Modal>

      <Modal
        visible={showModal === 'updateActivity'}
        title="Edit Activity"
        onClose={closeModal}
      >
        <EditActivitiesForm
          onSubmit={handleSubmitActivity}
          defaults={currentActivity as Activities}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};

export default AreasOfActivities;
