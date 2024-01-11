import CardDetails from '@/components/molecules/home/news-and-events-cards/card-details';
import { NewsData } from '@/components/organism/forms/home';
import { paths } from 'config/paths';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NewsService } from 'services/home/news-service';

type NewsCarouselProps = {
  isAdmin: boolean;
};

const NewsDetails = (props: NewsCarouselProps) => {
  const { isAdmin } = props;

  const router = useRouter();
  const newsID = router.query.slug;

  const [news, setNews] = useState({} as NewsData);

  useEffect(() => {
    async function setupPage() {
      if (typeof newsID === 'string') {
        const { data: newsData } = await NewsService.getNewsById(newsID);
        if (newsData) setNews(newsData);
      }
    }
    setupPage();
  }, [newsID]);

  let baseHref = isAdmin ? '/admin' : '';
  baseHref = `${baseHref}/news`;

  const singleNewsURL = `${baseHref}/${newsID}`;

  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <CardDetails
      imageURL={news?.imageURL}
      author={news?.author}
      title={news?.title}
      description={news?.description}
      shareURL={`${paths.productionURL}/${singleNewsURL}`}
      date={`${day}-${month + 1}-${year}`}
    />
  );
};

export default NewsDetails;
