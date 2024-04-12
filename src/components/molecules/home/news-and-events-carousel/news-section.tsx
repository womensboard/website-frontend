'use client';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import clsx from 'clsx';
import SectionHeading from '@/components/atom/section-heading';
import { Editable } from '@/components/organism/Editable';
import useMedia, { BreakPointSizes } from 'hooks/use-media';
import { NewsForm, NewsData, NewsInput } from '@/components/organism';
import NewsCards from '../news-and-events-cards/news-cards';
import Modal from '@/components/organism/modal';
import { NewsService } from 'services/home/news-service';
import Link from 'next/link';
import { paths } from 'config/paths';

const ITEMS_ON_SCREEN: Record<BreakPointSizes, number> = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 2,
  xl: 3,
};

type NewsCarouselProps = {
  isAdmin: boolean;
};

type ModalNames = 'create' | 'update';
const NewsCardSection = (props: NewsCarouselProps) => {
  const { isAdmin = false } = props;
  const [news, setNews] = useState<NewsData[]>([]);

  useEffect(() => {
    async function retrieveNews() {
      const { data: newsData } = await NewsService.fetchNews();
      if (newsData) setNews(newsData);
    }
    retrieveNews();
  }, []);

  const [currentNews, setCurrentNews] = useState<NewsData | null>();
  const [showModal, setShowModal] = useState<ModalNames | null>(null);
  const { breakpoint } = useMedia();

  const closeModal = () => setShowModal(null);

  const handleSubmitNews = async (values: NewsInput) => {
    let res;
    if (showModal === 'create') {
      res = await NewsService.createNews(values);
      const newItem = res.data;
      if (newItem) setNews((items) => [...items, newItem]);
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

  const showEditNews = (newsData: NewsData) => {
    setCurrentNews(newsData);
    setShowModal('update');
  };

  const handleDelete = async (newsData: NewsData) => {
    const res = await NewsService.deleteNews(newsData.id);

    if (res.statusCode === 200) {
      setNews((items) => items.filter((item) => item.id !== newsData.id));
    }
  };
  const itemsOnScreen = isAdmin ? undefined : ITEMS_ON_SCREEN[breakpoint];

  let baseHref = isAdmin ? '/admin' : '';
  baseHref = `${baseHref}/news`;

  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <>
      <div
        className={clsx(
          'flex flex-col items-center py-6 px-[70px] bg-tertiary_color'
        )}
      >
        <SectionHeading heading="News" />

        <div className="flex gap-[20px] my-2">
          {news.length < 1 ? (
            <p className="italic mb-[40px]">No News</p>
          ) : (
            news.slice(0, itemsOnScreen).map((singleNews, index) => {
              const { imageURL, title, description, author } = singleNews;

              const singleNewsURL = `${baseHref}/${singleNews.id}`;

              return (
                <Editable
                  title="News"
                  key={index}
                  onEditBtnClick={() => showEditNews(singleNews)}
                  onDeleteBtnClick={() => handleDelete(singleNews)}
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
                  />
                </Editable>
              );
            })
          )}
          {breakpoint !== 'xs' && breakpoint !== 'sm' && (
            <Editable
              hideEditBtn
              title="News"
              onAddBtnClick={() => setShowModal('create')}
            >
              <div className="lg:w-[420px] w-[343px] h-[500px] hidden group-[.is-admin]:md:flex relative"></div>
            </Editable>
          )}
        </div>
        {news.length > 3 && (
          <Link
            href={baseHref}
            className="text-primary_CTA_Color font-mulish font-[700] text-[20px] text-center"
          >
            View More News
          </Link>
        )}
      </div>

      <Modal
        visible={showModal === 'create'}
        title="Add News"
        onClose={closeModal}
      >
        <NewsForm onSubmit={handleSubmitNews} onClose={closeModal} />
      </Modal>

      <Modal
        visible={showModal === 'update'}
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

export default NewsCardSection;
