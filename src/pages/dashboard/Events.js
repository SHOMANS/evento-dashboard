import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Table, TableRow, TableBody, TableCell, Container, Typography, TableContainer } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { approveEvent, getEvents, rejectEvent } from '../../redux/slices/product';
// utils
import { fDate } from '../../utils/formatTime';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { ProductMoreMenu, ProductListHead } from '../../sections/@dashboard/e-commerce/product-list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'المناسبة', alignRight: false },
  { id: 'createdAt', label: 'تاريخ المناسبة', alignRight: false },
  { id: 'type', label: 'نوع المناسبة', alignRight: false },
  { id: 'inventoryType', label: 'حالة المناسبة', alignRight: false },
  { id: 'price', label: 'الوصف', alignRight: true },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function Events() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.product);

  const [productList, setProductList] = useState([]);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (events.length) {
      setProductList(events);
    }
  }, [events]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = productList.map((n) => n.name);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  return (
    <Page title="Ecommerce: Product List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[{ name: 'لوحة التحكم', href: PATH_DASHBOARD.general.app }, { name: 'قائمة المناسبات' }]}
        />

        <Card sx={{ pt: 1 }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={productList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {events.map((row) => {
                    const { _id, name, image, date, status, type, description } = row;

                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Image
                            disabledEffect
                            alt={name}
                            src={image}
                            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                          />
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>{fDate(date)}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>{type}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              (status === 'rejected' && 'error') || (status === 'waiting' && 'warning') || 'success'
                            }
                          >
                            {status ? sentenceCase(status) : ''}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="right">
                          <ProductMoreMenu
                            onApprove={() => {
                              dispatch(approveEvent(_id));
                            }}
                            onReject={() => {
                              dispatch(rejectEvent(_id));
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
