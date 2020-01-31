/** @format */

// #region Imports NPM
import React, { useContext } from 'react';
import Head from 'next/head';
import { fade, Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Link from 'next/link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import uuidv4 from 'uuid/v4';
// #endregion
// #region Imports Local
import Page from '../../layouts/main';
import { Loading } from '../../components/loading';
import { includeDefaultNamespaces, nextI18next, I18nPage } from '../../lib/i18n-client';
import { ProfileContext } from '../../lib/context';
// #endregion

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    head: {
      padding: theme.spacing(2),
      backgroundColor: fade(theme.palette.secondary.main, 0.05),
    },
    table: {},
  }),
);

function createData(number: string, name: string, count: number) {
  return { number, name, count };
}

const rows = [
  createData('0024003440043', 'Монитор Samsung UE40', 1),
  createData('0024003440043', 'Монитор Samsung UE40', 1),
  createData('0024003440043', 'Монитор Samsung UE40', 1),
  createData('0024003440043', 'Монитор Samsung UE40', 1),
  createData('0024003440043', 'Монитор Samsung UE40', 1),
  createData('0024003440043', 'Монитор Samsung UE40', 1),
];

const ProfileEquipment: I18nPage = ({ t, ...rest }): React.ReactElement => {
  const classes = useStyles({});
  const profile = useContext(ProfileContext);

  return (
    <>
      <Head>
        <title>{t('profile:title')}</title>
      </Head>
      <Page {...rest}>
        <Box display="flex" flexDirection="column">
          {!(profile && profile.user) && <Loading noMargin type="linear" variant="indeterminate" />}
          <Box display="flex" flexDirection="column" p={2}>
            <Box display="flex">
              <Link href={{ pathname: '/profile' }} as="/profile" passHref>
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </Link>
            </Box>
            <Box display="flex" flexDirection="column">
              {profile && profile.user && (
                <div>
                  <Paper>
                    <Box className={classes.head}>
                      <Typography variant="h5">{t('profile:equipment:title')}</Typography>
                    </Box>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>{t('profile:equipment:number')}</TableCell>
                          <TableCell>{t('profile:equipment:name')}</TableCell>
                          <TableCell align="right">{t('profile:equipment:count')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={uuidv4()} hover>
                            <TableCell component="th" scope="row">
                              {row.number}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Page>
    </>
  );
};

ProfileEquipment.getInitialProps = () => ({
  namespacesRequired: includeDefaultNamespaces(['profile']),
});

export default nextI18next.withTranslation('profile')(ProfileEquipment);
