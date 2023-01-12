import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { sentenceCase } from 'change-case';

// @mui
// redux
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from '../../redux/store';
import { approveEvent, getEvent, rejectEvent } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Image from '../../components/Image';
import Label from '../../components/Label';
// sections
import { ProductListHead, ProductMoreMenu } from '../../sections/@dashboard/e-commerce/product-list';
import { fDate } from '../../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'العنصر', alignRight: false },
  { id: 'createdAt', label: 'الكمية', alignRight: false },
  { id: 'type', label: 'الوصف', alignRight: false },
];

// ----------------------------------------------------------------------

export default function SingleEvent() {
  const { id } = useParams();
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { event, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getEvent(id));
  }, [dispatch, id]);

  return (
    <Page title="Ecommerce: Product List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading=""
          links={[
            { name: 'لوحة التحكم', href: PATH_DASHBOARD.general.app },
            { name: 'قائمة المناسبات', href: PATH_DASHBOARD.general.events },
            { name: 'عرض المناسبة' },
          ]}
        />

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h2" component={'h2'} marginBottom={4}>
              اسم المناسبة: {event?.name}
            </Typography>
            <Typography variant="body" component={'h2'} marginBottom={4}>
              وصف المناسبة: {event?.description}
            </Typography>
            <Card sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                <Typography variant="body">تاريخ المناسبة: {event?.date && fDate(event?.date)}</Typography>
                <Typography variant="body">
                  حالة المناسبة:{' '}
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={
                      (event?.status === 'rejected' && 'error') ||
                      (event?.status === 'waiting' && 'warning') ||
                      'success'
                    }
                  >
                    {event?.status ? sentenceCase(event?.status) : ''}
                  </Label>
                </Typography>
                <ProductMoreMenu
                  onApprove={() => {
                    dispatch(approveEvent(id));
                  }}
                  onReject={() => {
                    dispatch(rejectEvent(id));
                  }}
                />
              </Box>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <ProductListHead headLabel={TABLE_HEAD} />
                    {isLoading || (
                      <TableBody>
                        {event?.items?.map((row) => {
                          const {
                            _id,
                            qty,
                            item: { image, name, description },
                          } = row;

                          return (
                            <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                              <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                <Image
                                  disabledEffect
                                  alt={name}
                                  src={
                                    (image &&
                                      image === 'imageSrc' &&
                                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEYwZCi2lIDKGVbMKqndPXuTLfPjeSsrDnpA&usqp=CAU') ||
                                    image
                                  }
                                  sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                                />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">{qty}</TableCell>
                              <TableCell align="left">{description}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </>
        )}
      </Container>
    </Page>
  );
}
