import { useEffect, useState, useCallback } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../components/skeleton';
// sections
import { BlogPostRecent } from '../../sections/@dashboard/blog';
import { API_URL } from '../../api';

// ----------------------------------------------------------------------

export default function Packages() {
  const { themeStretch } = useSettings();

  const [recentPosts] = useState([]);

  const [data, setData] = useState(null);

  const [error, setError] = useState(null);

  const getPackages = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}api/packages`);

      // if (isMountedRef.current) {
      setData(response.data.packages);
      console.log(response.data);
      // }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, []);

  // const getRecentPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}api/packages`, {});

  //     if (isMountedRef.current) {
  //       // setRecentPosts(response.data.recentPosts);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isMountedRef]);

  useEffect(() => {
    getPackages();
    // getRecentPosts();
  }, [getPackages]);

  return (
    <Page title="Packages: Post Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.app },
            // { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase('Packages') },
          ]}
        />

        {/* {data && (
          <Card>
            <BlogPostHero post={data} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {data.description}
              </Typography>

              <Markdown children={data.body} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={data} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({data.comments.length})
                </Typography>
              </Box>

              <BlogPostCommentList post={data} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <BlogPostCommentForm />
            </Box>
          </Card>
        )} */}

        {!data && !error && <SkeletonPost />}

        {error && <Typography variant="h6">404 {error}!</Typography>}

        <BlogPostRecent posts={recentPosts} />
      </Container>
    </Page>
  );
}

// {
//   "rating": {
//       "totalRate": 4.99,
//       "all": []
//   },
//   "_id": "63a715b00d6b0ee1f325d507",
//   "organizer": {
//       "rating": {
//           "totalRate": 4.99,
//           "all": []
//       },
//       "_id": "6399cd56bb273376032cb37c",
//       "name": "ايفينتو للتجهيزات",
//       "email": "organizer@organizer.com",
//       "password": "organizer123",
//       "isAdmin": false,
//       "isOrganizer": true,
//       "createdAt": "2022-12-14T13:19:18.144Z",
//       "updatedAt": "2022-12-17T14:47:50.873Z",
//       "__v": 0,
//       "phoneNumber": "+97000000000",
//       "address": "gaza",
//       "image": "https://evento-server.onrender.com/uploads/1.png"
//   },
//   "name": "كومبو عيد الميلاد الذهبي",
//   "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Birthday_candles.jpg/1200px-Birthday_candles.jpg",
//   "category": "birthday",
//   "description": "كومبو عيد الميلاد الذهبي بسعر مخفض ويحتوي على كل ما يلزمك لعيد ميلادك",
//   "reviewsNumber": 0,
//   "items": [
//       {
//           "item": {
//               "_id": "63a7136a0d6b0ee1f325d4c9",
//               "name": "كيك عيد الميلاد",
//               "description": "كيكة جميلة لعيد ميلادك",
//               "image": "https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/16714-birthday-cake-600x600.jpg?ext=.jpg",
//               "price": 50,
//               "tags": [
//                   "birthday"
//               ],
//               "__v": 0
//           },
//           "qty": 1,
//           "_id": "63a7167a16d9f86a4c77c8da"
//       },
//       {
//           "item": {
//               "_id": "63a713740d6b0ee1f325d4cb",
//               "name": "حلويات جانبية",
//               "description": "حلويات جانبية جميلة لعيد ميلادك",
//               "image": "https://www.sayidaty.net/sites/default/files/styles/900_scale/public/2021/01/27/7321306-1966866176.jpg",
//               "price": 100,
//               "tags": [
//                   "graduation",
//                   "birthday",
//                   "wedding",
//                   "shopOpening"
//               ],
//               "__v": 0
//           },
//           "qty": 1,
//           "_id": "63a7167a16d9f86a4c77c8db"
//       },
//       {
//           "item": {
//               "_id": "63a7137e0d6b0ee1f325d4cd",
//               "name": "زينة عيد الميلاد",
//               "description": "زينة كامل مع بلالين لعيد الميلاد",
//               "image": "https://img.ltwebstatic.com/images3_pi/2020/12/10/1607578729b824b30f58a296feb84db98ac1a0548e.webp",
//               "price": 250,
//               "tags": [
//                   "birthday"
//               ],
//               "__v": 0
//           },
//           "qty": 1,
//           "_id": "63a7167a16d9f86a4c77c8dc"
//       },
//       {
//           "item": {
//               "_id": "63a7138b0d6b0ee1f325d4cf",
//               "name": "صواريخ عيد الميلاد",
//               "description": "صواريخ عيد الميلاد",
//               "image": "https://ma.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/71/091474/1.jpg?9831",
//               "price": 20,
//               "tags": [
//                   "birthday"
//               ],
//               "__v": 0
//           },
//           "qty": 1,
//           "_id": "63a7167a16d9f86a4c77c8dd"
//       },
//       {
//           "item": {
//               "_id": "63a713950d6b0ee1f325d4d1",
//               "name": "سماعات",
//               "description": "سماعات لتشغيل الأغاني بوساطة بلوتوث",
//               "image": "https://beardan.com/wp-content/uploads/2018/01/yamaha-hs.jpg",
//               "price": 80,
//               "tags": [
//                   "graduation",
//                   "birthday",
//                   "wedding",
//                   "shopOpening"
//               ],
//               "__v": 0
//           },
//           "qty": 1,
//           "_id": "63a7167a16d9f86a4c77c8de"
//       },
//       {
//           "item": {
//               "_id": "63a713bb0d6b0ee1f325d4d9",
//               "name": "مشروبات باردة",
//               "description": "مشروبات باردة",
//               "image": "https://www.sawtbeirut.com/wp-content/uploads/2020/06/%D9%85%D8%B4%D8%B1%D9%88%D8%A8%D8%A7%D8%AA-%D8%BA%D8%A7%D8%B2%D9%8A%D8%A9-800x549.jpg",
//               "price": 2,
//               "tags": [
//                   "graduation",
//                   "birthday",
//                   "wedding",
//                   "shopOpening"
//               ],
//               "__v": 0
//           },
//           "qty": 10,
//           "_id": "63a7167a16d9f86a4c77c8df"
//       }
//   ],
//   "price": 499,
//   "reviews": [],
//   "createdAt": "2022-12-24T15:07:28.148Z",
//   "updatedAt": "2022-12-24T15:10:50.616Z",
//   "__v": 3
// }
