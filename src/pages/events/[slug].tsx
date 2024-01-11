import CardDetails from '@/components/molecules/home/news-and-events-cards/card-details';
import { EventData } from '@/components/organism';
import { paths } from 'config/paths';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { EventService } from 'services/home/event-services';

type EventCarouselProps = {
  isAdmin: boolean;
};

const EventDetails = (props: EventCarouselProps) => {
  const { isAdmin } = props;

  const router = useRouter();
  const eventId = router.query.slug;

  const [event, setEvent] = useState({} as EventData);

  useEffect(() => {
    async function setupPage() {
      if (typeof eventId === 'string') {
        const { data: eventData } = await EventService.getEventById(eventId);
        if (eventData) setEvent(eventData);
      }
    }
    setupPage();
  }, [eventId]);

  const { eventImage, title, body, buttonLabel, buttonURL } = event;

  let baseHref = isAdmin ? '/admin' : '';
  baseHref = `${baseHref}/news`;

  const singleEventURL = `${baseHref}/${eventId}`;

  return (
    <CardDetails
      imageURL={eventImage}
      title={title}
      description={body}
      shareURL={`${paths.productionURL}/${singleEventURL}`}
      buttonLabel={buttonLabel}
      buttonURL={buttonURL}
    />
  );
};

export default EventDetails;
