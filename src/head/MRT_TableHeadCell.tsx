import React, { FC } from 'react';
import {
  TableCell as MuiTableCell,
  TableSortLabel,
  styled,
  Divider as MuiDivider,
  Collapse,
} from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_FilterTextfield } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

const TableCellContents = styled('div')({
  display: 'grid',
});

const TableCellText = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

const CellFlexItem = styled('span')({
  display: 'flex',
  flexWrap: 'nowrap',
});

const Divider = styled(MuiDivider)({
  borderRightWidth: '2px',
  borderRadius: '2px',
  maxHeight: '2rem',
});

interface Props {
  column: HeaderGroup;
}

export const MRT_TableHeadCell: FC<Props> = ({ column }) => {
  const {
    disableColumnActions,
    enableColumnResizing,
    disableFilters,
    showFiltersInColumnHead,
    muiTableHeadCellProps,
    tableInstance,
  } = useMaterialReactTable();

  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  const mTableHeadCellProps =
    muiTableHeadCellProps instanceof Function
      ? muiTableHeadCellProps(column)
      : muiTableHeadCellProps;

  const tableCellProps = {
    ...mTableHeadCellProps,
    ...column.getHeaderProps(),
    style: {
      ...column.getHeaderProps().style,
      ...(mTableHeadCellProps?.style ?? {}),
    },
  };

  return (
    <TableCell align={isParentHeader ? 'center' : 'left'} {...tableCellProps}>
      <TableCellContents>
        <TableCellText
          style={{ justifyContent: isParentHeader ? 'center' : undefined }}
        >
          <CellFlexItem {...column.getSortByToggleProps()}>
            {column.render('Header')}
            {!isParentHeader && column.canSort && (
              <TableSortLabel
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
                style={{ margin: 0 }}
              />
            )}
          </CellFlexItem>
          <CellFlexItem>
            {!disableColumnActions && !isParentHeader && (
              <MRT_ToggleColumnActionMenuButton column={column} />
            )}
            {enableColumnResizing && !isParentHeader && (
              <Divider
                flexItem
                orientation="vertical"
                onDoubleClick={() => tableInstance.resetResizing()}
                {...column.getResizerProps()}
              />
            )}
          </CellFlexItem>
        </TableCellText>
        {!disableFilters && column.canFilter && (
          <Collapse in={showFiltersInColumnHead}>
            <MRT_FilterTextfield column={column} />
          </Collapse>
        )}
      </TableCellContents>
    </TableCell>
  );
};
