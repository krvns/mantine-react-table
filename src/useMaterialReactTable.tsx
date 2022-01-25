import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';
import {
  TableInstance,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { MaterialReactTableProps } from './MaterialReactTable';
import { UseMRTCalcs, useMRTCalcs } from './utils/useMRTCalcs';
import { showOverrideWarnings } from './utils/overrideWarnings';

export interface UseMaterialReactTable<D extends {}>
  extends MaterialReactTableProps<D>,
    UseMRTCalcs {
  tableInstance: TableInstance<D>;
}

const MaterialReactTableContext = (<D extends {}>() =>
  createContext<UseMaterialReactTable<D>>(
    {} as UseMaterialReactTable<D>,
  ) as Context<UseMaterialReactTable<D>>)();

export const MaterialReactTableProvider = <D extends {}>({
  children,
  columns,
  data,
  defaultColumn,
  getRowId,
  getSubRows,
  initialState,
  stateReducer,
  surpressOverrideWarnings,
  ...rest
}: PropsWithChildren<MaterialReactTableProps<D>>) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      getRowId,
      getSubRows,
      initialState,
      stateReducer,
    },
    useFlexLayout,
    useResizeColumns,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  );

  const mrtCalcs = useMRTCalcs({ tableInstance });

  if (process.env.NODE_ENV !== 'production' && !surpressOverrideWarnings) {
    showOverrideWarnings(rest);
  }

  return (
    <MaterialReactTableContext.Provider
      //@ts-ignore
      value={{
        tableInstance,
        ...mrtCalcs,
        ...rest,
      }}
    >
      {children}
    </MaterialReactTableContext.Provider>
  );
};

export const useMaterialReactTable = <
  D extends {},
>(): UseMaterialReactTable<D> =>
  //@ts-ignore
  useContext<UseMaterialReactTable<D>>(MaterialReactTableContext);