'use client';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SectionHeading from '@/components/atom/section-heading';
import { Editable } from '@/components/organism/Editable';
import useMedia, { BreakPointSizes } from 'hooks/use-media';
import {
  EventData,
  EventForm,
  EventInput,
  NewsData,
  NewsForm,
  NewsInput,
} from '@/components/organism';
import EventCards from '../news-and-events-cards/event-cards';
import Modal from '@/components/organism/modal';
import { EventService } from 'services/home/event-services';
import Link from 'next/link';
import { NewsService } from 'services/home/news-service';
import NewsCards from '../news-and-events-cards/news-cards';
import { paths } from 'config/paths';

const ITEMS_ON_SCREEN: Record<BreakPointSizes, number> = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 2,
  xl: 2,
};

type EventCarouselProps = {
  isAdmin: boolean;
};

type ModalNames = 'createNews' | 'updateNews' | 'createEvent' | 'updateEvent';

const EventsCardSection = (props: EventCarouselProps) => {
  const { isAdmin = false } = props;
  const { breakpoint } = useMedia();

  const [currentEvents, setCurrentEvents] = useState<EventData | null>();
  const [currentNews, setCurrentNews] = useState<NewsData | null>();

  const [showModal, setShowModal] = useState<ModalNames | null>(null);

  const [events, setEvents] = useState<EventData[]>([]);
  const [news, setNews] = useState<NewsData[]>([]);

  const closeModal = () => setShowModal(null);

  useEffect(() => {
    async function retrieveEvents() {
      const { data: eventsData } = await EventService.fetchEvents();
      if (eventsData) {
        const sortedEvents = eventsData.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setEvents(sortedEvents);
      }
    }
    retrieveEvents();
  }, []);

  useEffect(() => {
    async function retrieveNews() {
      const { data: newsData } = await NewsService.fetchNews();
      if (newsData) setNews(newsData);
    }
    retrieveNews();
  }, []);

  const handleSubmitEvents = async (values: EventInput) => {
    let res;
    if (showModal === 'createEvent') {
      res = await EventService.createEvents(values);
      const newItem = res.data;
      if (newItem) {
        const updatedEvents = [newItem, ...events];
        const sortedEvents = updatedEvents.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setEvents(sortedEvents);
      }
    } else {
      res = await EventService.updateEvents(
        currentEvents?.id as string,
        values
      );

      const updatedItem = res.data;
      if (updatedItem) {
        const updatedEvents = events.map((item) => {
          if (item.id === updatedItem.id) return updatedItem;
          return item;
        });
        const sortedEvents = updatedEvents.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setEvents(sortedEvents);
      }
    }

    if (res.data) {
      closeModal();
    }

    return res;
  };

  const handleSubmitNews = async (values: NewsInput) => {
    let res;
    if (showModal === 'createNews') {
      res = await NewsService.createNews(values);
      const newItem = res.data;
      if (newItem) setNews((items) => [newItem, ...items]);
    } else {
      res = await NewsService.updateNews(currentNews?.id as string, values);

      const updatedItem = res.data;
      if (updatedItem)
        setNews((items) =>
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

  const showEditEvents = (eventData: EventData) => {
    setCurrentEvents(eventData);
    setShowModal('updateEvent');
  };

  const showEditNews = (newsData: NewsData) => {
    setCurrentNews(newsData);
    setShowModal('updateNews');
  };

  const handleDeleteEvent = async (eventData: EventData) => {
    const res = await EventService.deleteEvent(eventData.id);

    if (res.statusCode === 200) {
      setEvents((items) => items.filter((item) => item.id !== eventData.id));
    }
  };

  const handleDeleteNews = async (newsData: NewsData) => {
    const res = await NewsService.deleteNews(newsData.id);

    if (res.statusCode === 200) {
      setNews((items) => items.filter((item) => item.id !== newsData.id));
    }
  };

  const itemsOnScreen = isAdmin ? undefined : ITEMS_ON_SCREEN[breakpoint];

  let eventsBaseHref = isAdmin ? '/admin' : '';
  eventsBaseHref = `${eventsBaseHref}/events`;

  let newsBaseHref = isAdmin ? '/admin' : '';
  newsBaseHref = `${newsBaseHref}/news`;

  const newsAndEventArray = [...news, ...events];

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <>
      <div className="flex flex-col items-center py-[32px] px-[70px] bg-primary_color">
        <SectionHeading heading="News and Events" />

        <div className="flex flex-wrap items-center justify-center gap-[20px] my-2">
          {events.length < 1 ? (
            <p className="italic mb-[40px]">No Event</p>
          ) : (
            events.slice(0, itemsOnScreen).map((singleEvent, index) => {
              const {
                eventImage,
                title,
                body,
                buttonLabel,
                buttonURL,
                createdAt,
              } = singleEvent;

              const singleEventURL = `${eventsBaseHref}/${singleEvent.id}`;

              return (
                <Editable
                  title="Events"
                  key={index}
                  onEditBtnClick={() => showEditEvents(singleEvent)}
                  onDeleteBtnClick={() => handleDeleteEvent(singleEvent)}
                >
                  <EventCards
                    key={singleEvent.id}
                    eventImage={eventImage}
                    title={title}
                    body={body}
                    shareURL={`${paths.productionURL}/${singleEventURL}`}
                    buttonLabel={buttonLabel}
                    buttonURL={buttonURL}
                    cardPath={singleEventURL}
                    createdAt={createdAt}
                  />
                </Editable>
              );
            })
          )}
          {news.slice(0, itemsOnScreen).map((singleNews, index) => {
            const { imageURL, title, description, author, createdAt } =
              singleNews;

            const singleNewsURL = `${newsBaseHref}/${singleNews.id}`;
            return (
              <Editable
                title="News"
                key={index}
                onEditBtnClick={() => showEditNews(singleNews)}
                onDeleteBtnClick={() => handleDeleteNews(singleNews)}
                newsTitle={''}
              >
                <NewsCards
                  key={uuidv4()}
                  imageURL={imageURL}
                  title={title}
                  description={description}
                  author={author}
                  shareURL={`${paths.productionURL}/${singleNewsURL}`}
                  cardPath={singleNewsURL}
                  date={`${day}-${month + 1}-${year}`}
                  createdAt={createdAt}
                />
              </Editable>
            );
          })}
          {breakpoint !== 'xs' && breakpoint !== 'sm' && (
            <Editable
              hideEditBtn
              title="Events"
              onAddBtnClick={() => setShowModal('createEvent')}
              onAddNewsClick={() => setShowModal('createNews')}
              newsTitle="News"
            >
              <div className="lg:w-[420px] w-[343px] h-[500px] hidden group-[.is-admin]:md:flex relative"></div>
            </Editable>
          )}
        </div>
        {typeof itemsOnScreen !== 'undefined' &&
          newsAndEventArray.length > itemsOnScreen && (
            <Link
              href={eventsBaseHref}
              className="text-primary_CTA_Color font-mulish font-[700] text-[20px] mt-5 text-center"
            >
              View More News and Events
            </Link>
          )}
      </div>

      <Modal
        visible={showModal === 'createEvent'}
        title="Add Event"
        onClose={closeModal}
      >
        <EventForm onClose={closeModal} onSubmit={handleSubmitEvents} />
      </Modal>

      <Modal
        visible={showModal === 'updateEvent'}
        title="Edit Event"
        onClose={closeModal}
      >
        <EventForm
          onClose={closeModal}
          defaults={currentEvents as EventInput}
          onSubmit={handleSubmitEvents}
        />
      </Modal>

      <Modal
        visible={showModal === 'createNews'}
        title="Add News"
        onClose={closeModal}
      >
        <NewsForm onSubmit={handleSubmitNews} onClose={closeModal} />
      </Modal>

      <Modal
        visible={showModal === 'updateNews'}
        title="Update News"
        onClose={closeModal}
      >
        <NewsForm
          onSubmit={handleSubmitNews}
          defaults={currentNews as NewsInput}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};

export default EventsCardSection;
