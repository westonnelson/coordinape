import { useMemo, useState } from 'react';

import { Button, makeStyles } from '@material-ui/core';

import { StaticTable } from 'components';
import { InfoIcon } from 'icons';

import AllocateModal from './AllocateModal';
import DepositModal from './DepositModal';
import EditModal from './EditModal';
import WithdrawModal from './WithdrawModal';

import { IEpoch, ITableColumn, IVault, IVaultTransaction } from 'types';

const useStyles = makeStyles(theme => ({
  withVaults: {
    height: 434,
    display: 'grid',
    borderRadius: 8,
    background: theme.colors.ultraLightGray,
    alignItems: 'center',
    columnGap: theme.spacing(3),
    gridTemplateColumns: '1fr 1fr',
    padding: theme.spacing(0, 4),
    margin: theme.spacing(4, 0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2),
      gridTemplateColumns: '1fr',
    },
    '& > *': {
      alignSelf: 'center',
    },
    '& .MuiSkeleton-root': {
      marginLeft: theme.spacing(1.5),
    },
    '& .MuiSkeleton-rect': {
      borderRadius: 5,
    },
  },
  vaultsTitle: {
    color: theme.colors.text,
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    padding: 0,
    marginRight: '1em',
  },
  horizontalDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  depositWithdrawBtns: {
    margin: '0 0.25em 0 0.25em',
  },
  vaultsSecondaryh4: {
    color: theme.colors.lightBlue,
    fontSize: 15,
    fontWeight: 300,
    margin: 0,
    padding: theme.spacing(0, 0.5, 0),
  },
  noVaultsSubtitle: {
    color: theme.colors.mediumGray,
    fontSize: 15,
    fontWeight: 300,
  },
  infoIcon: {
    height: 20,
    width: 20,
    marginBottom: 0,
  },
  totalValue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  number: {
    color: theme.colors.black,
    fontSize: 24,
    margin: 0,
    fontWeight: 600,
    paddingRight: 8,
  },
  noVaultsTitle: {
    color: theme.colors.mediumGray,
    margin: 0,
    fontSize: 24,
    fontWeight: 600,
  },
  newTable: {
    flexGrow: 4,
    height: 288,
    marginTop: -80,
    paddingTop: 0,
  },
  tablePlaceholderTitle: {
    fontSize: 20,
    lineHeight: 1.2,
    color: theme.colors.text,
    opacity: 0.7,
  },
  noVaultsInterior: {
    height: 288,
    display: 'flex',
    borderRadius: 8,
    background: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gridTemplateColumns: '1fr',
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2),
      gridTemplateColumns: '1fr',
    },
    '& > *': {
      alignSelf: 'center',
    },
    '& .MuiSkeleton-root': {
      marginLeft: theme.spacing(1.5),
    },
    '& .MuiSkeleton-rect': {
      borderRadius: 5,
    },
  },
  oneLineCell: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 11,
    lineHeight: 1.5,
  },
  oneLineCellTitle: {
    fontWeight: 600,
    fontSize: 17,
    marginLeft: '1em',
  },
  oneLineCellSubtitle: {
    fontWeight: 400,
    marginLeft: '0.5em',
  },
  twoLineCell: {
    height: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 11,
    lineHeight: 1.5,
  },
  twoLineCellTitle: {
    fontWeight: 600,
  },
  twoLineCellSubtitle: {
    fontWeight: 400,
    fontSize: 9,
    color: theme.colors.mediumGray,
  },
  tableActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  allocateBtn: {
    padding: '12px',
    height: 'calc(32px * 16) * 1rem',
    marginRight: '2.5em',
  },
  errorColor: {
    color: theme.palette.error.main,
  },
  valueBtn: {
    width: '110.3px',
    color: theme.colors.secondary,
    fontWeight: 600,
  },
  smallP: {
    fontSize: 12,
    marginLeft: '0.4em',
    padding: 0,
    margin: 0,
  },
  editTxt: {
    color: theme.colors.lightBlue,
    textDecoration: 'underline',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
  editSpan: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
}));

type ModalLabel = '' | 'deposit' | 'withdraw' | 'allocate' | 'edit';

interface HasVaultsProps {
  epochs: any;
  vault: IVault;
}
export default function HasVaults({ epochs, vault }: HasVaultsProps) {
  const classes = useStyles();
  const [modal, setModal] = useState<ModalLabel>('');
  const closeModal = () => setModal('');

  return (
    <div className={classes.withVaults}>
      {modal === 'allocate' ? (
        <AllocateModal onClose={closeModal} />
      ) : modal === 'edit' ? (
        <EditModal onClose={closeModal} />
      ) : modal === 'withdraw' ? (
        <WithdrawModal onClose={closeModal} />
      ) : modal === 'deposit' ? (
        <DepositModal vault={vault} onClose={closeModal} />
      ) : null}
      <div>
        <div className={classes.horizontalDisplay}>
          <h2 className={classes.vaultsTitle}>
            {vault.type.toUpperCase()} Vault
          </h2>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.depositWithdrawBtns}
            onClick={() => setModal('deposit')}
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.depositWithdrawBtns}
            onClick={() => setModal('withdraw')}
          >
            Withdraw
          </Button>
        </div>
        <h4 className={classes.noVaultsSubtitle}>
          Upcoming and Recent Epochs <InfoIcon className={classes.infoIcon} />
        </h4>
      </div>
      <div>
        <div className={classes.totalValue}>
          <h2 className={classes.number}>0</h2>
          <h2 className={classes.noVaultsTitle}>USDC ...</h2>
        </div>
        <h4 className={classes.noVaultsSubtitle}>
          Recent Transactions <InfoIcon className={classes.infoIcon} />{' '}
        </h4>
      </div>
      <EpochsTable
        epochs={epochs}
        allocate={() => setModal('allocate')}
        edit={() => setModal('edit')}
      />

      <TransactionsTable
        deposit={() => setModal('deposit')}
        transactions={vault.transactions}
      />
    </div>
  );
}

interface EpochsTableProps {
  epochs: IEpoch[];
  allocate: () => void;
  edit: () => void;
}
const EpochsTable = ({ epochs, allocate, edit }: EpochsTableProps) => {
  const classes = useStyles();

  const RenderEpochDetails = (e: IEpoch) => (
    <div className={classes.twoLineCell}>
      <span className={classes.twoLineCellTitle}>
        {e.circle_id}(CID): E{e.number}
      </span>
    </div>
  );

  const RenderEpochDates = (e: IEpoch) => (
    <div className={classes.twoLineCell}>
      <span className={classes.twoLineCellTitle}>
        {e.uniqueUsers} {e.labelActivity} {e.totalTokens} GIVE
      </span>
      <span className={classes.twoLineCellSubtitle}>
        {e.ended
          ? `Epoch ended ${e.endDate.month} ${e.endDate.day}`
          : `Epoch starts ${e.startDate.monthLong} and ends ${e.endDate.day}`}
      </span>
    </div>
  );

  const RenderRecentEpochActions = (e: IEpoch) =>
    e.ended ? (
      <>
        <Button variant="contained" color="primary" size="small">
          Allocate Funds
        </Button>
      </>
    ) : e.totalTokens > 0 ? (
      <span className={classes.editSpan}>
        <Button variant="contained" className={classes.valueBtn} size="small">
          {e.totalTokens} <p className={classes.smallP}>usdc</p>
        </Button>
        <button className={classes.editTxt} onClick={edit}>
          Edit
        </button>
      </span>
    ) : (
      <div className={classes.tableActions}>
        <span className={classes.editSpan}>
          <Button
            className={classes.allocateBtn}
            variant="contained"
            color="primary"
            size="small"
            onClick={allocate}
          >
            Allocate Funds
          </Button>
        </span>
      </div>
    );

  const epochColumns = useMemo(
    () =>
      [
        {
          label: 'Circle:Epoch',
          render: RenderEpochDetails,
          leftAlign: true,
          narrow: true,
        },
        {
          label: 'Details',
          render: RenderEpochDates,
          leftAlign: true,
        },
        {
          label: 'Allowances',
          render: RenderRecentEpochActions,
          narrow: true,
        },
      ] as ITableColumn[],
    []
  );

  return (
    <StaticTable
      className={classes.newTable}
      columns={epochColumns}
      data={epochs}
      perPage={6}
      placeholder={
        <>
          <h2 className={classes.tablePlaceholderTitle}>
            You don’t have any recent epochs
          </h2>
        </>
      }
    />
  );
};

interface TransactionsTableProps {
  transactions: IVaultTransaction[];
  deposit: () => void;
}
const TransactionsTable = ({
  transactions,
  deposit,
}: TransactionsTableProps) => {
  const classes = useStyles();

  //TODO: Need to make an interface for transaction data
  const RenderTransactionDetails = (e: any) => {
    return e.posNeg === '-' ? (
      <div className={classes.twoLineCell}>
        <span
          className={classes.twoLineCellTitle}
          style={{ textAlign: 'left' }}
        >
          {e.vaultName}: {e.number} distibuted to {e.activeUsers} participants
        </span>
        <span
          className={classes.twoLineCellSubtitle}
          style={{ textAlign: 'left' }}
        >
          {e.dateType} {e.date}. See TX on Etherscan
        </span>
      </div>
    ) : (
      <div className={classes.twoLineCell}>
        <span
          className={classes.twoLineCellTitle}
          style={{ textAlign: 'left' }}
        >
          {e.name} made a deposit
        </span>
        <span
          className={classes.twoLineCellSubtitle}
          style={{ textAlign: 'left' }}
        >
          {e.dateType} {e.date} See TX on Etherscan
        </span>
      </div>
    );
  };

  const RenderTransactionAmount = (e: any) => (
    <div className={classes.oneLineCell}>
      <p className={classes.oneLineCellTitle}>
        {' '}
        {e.posNeg}
        {e.value}
      </p>
      <p className={classes.oneLineCellSubtitle}>usdc</p>
    </div>
  );

  const transactionColumns = useMemo(
    () =>
      [
        {
          label: 'Details',
          render: RenderTransactionDetails,
          wide: true,
        },
        {
          label: 'Amount',
          render: RenderTransactionAmount,
          wide: true,
        },
      ] as ITableColumn[],
    []
  );

  return (
    <StaticTable
      className={classes.newTable}
      columns={transactionColumns}
      data={transactions}
      perPage={6}
      placeholder={
        <div className={classes.noVaultsInterior}>
          <h2 className={classes.noVaultsTitle}>
            There are no transactions to show yet.
          </h2>
          <h3 className={classes.noVaultsSubtitle}>
            To get started, fund your vault
          </h3>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={deposit}
          >
            Fund This Vault
          </Button>
        </div>
      }
    />
  );
};
