import React, { FC, MouseEvent } from 'react';
import { Box } from '@mantine/core';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  commonListItemStyles,
  commonMenuItemStyles,
} from './MRT_ColumnActionMenu';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  anchorEl: HTMLElement | null;
  handleEdit: (event: MouseEvent) => void;
  row: MRT_Row;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  table: MRT_TableInstance;
}

export const MRT_RowActionMenu: FC<Props> = ({
  anchorEl,
  handleEdit,
  row,
  setAnchorEl,
  table,
}) => {
  const {
    getState,
    options: {
      icons: { IconEdit },
      enableEditing,
      localization,
      renderRowActionMenuItems,
    },
  } = table;
  const { density } = getState();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: density === 'compact',
      }}
    >
      {enableEditing && (
        <MenuItem onClick={handleEdit} sx={commonMenuItemStyles}>
          <Box sx={commonListItemStyles}>
            <ListItemIcon>
              <IconEdit />
            </ListItemIcon>
            {localization.edit}
          </Box>
        </MenuItem>
      )}
      {renderRowActionMenuItems?.({
        row,
        table,
        closeMenu: () => setAnchorEl(null),
      })}
    </Menu>
  );
};