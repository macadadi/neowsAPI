import {
    Box,
    Button,
    HStack,
    Skeleton,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import { QueryStatus } from '@tanstack/react-query';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import React, { useEffect } from 'react';
import { TError } from '../neows/data/types';


type TableProps<T> = {
    showRowSelector?: boolean;
    data?: unknown;
    isLoading: boolean;
    columns: ColumnDef<T>[];
    status: QueryStatus;
    tableData: Array<T> | undefined;
    error: TError | null
    setBarChartData: React.Dispatch<React.SetStateAction<T[]>>
};

export default function NasaTable<T>(props: TableProps<T>) {
    const tableData = React.useMemo(
        () => props?.tableData || [],
        [props?.tableData],
    );
    const columns = props.columns
    const setBarChartData = props.setBarChartData

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            sorting: [
                {
                    id: 'Time',
                    desc: true,
                },
            ],
        },
        debugColumns: true,
    });
    const rowTableData = table.getRowModel().rows
    useEffect(() => {
        setBarChartData(rowTableData.map(item => item?.original))
    }, [rowTableData,setBarChartData])
    return (
        <TableContainer
            borderBottomRadius='lg'
            bgColor='white'
            overflow='scroll'
            borderColor='hue-navy.50'
            borderWidth='1px'
            width={'100%'}
        >
            {(() => {
                switch (props?.status) {
                    case 'pending':
                        return <Stack h={'100%'} w={'100%'} minW={{ base: '50vw', md: '80vw' }}>
                            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
                            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
                            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
                            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
                            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
                            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
                            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
                        </Stack>;
                    case 'error':
                        if (props?.error?.http_error ===
                            "BAD_REQUEST") {
                            return (<Box pt={3} w={'78vw'} textAlign={'center'} height={'10vh'} >
                                <Text color={'red'}>Request failed, the allowed Feed date limit is only 7 Days</Text>
                            </Box>)
                        }
                        if (props?.error?.isNetworkError) {
                            return (<Box pt={3} w={'78vw'} textAlign={'center'} height={'10vh'} >
                                <Text color={'red'}>Request failed, Network error </Text>
                            </Box>)
                        }
                        return (
                            <Box pt={3} w={'78vw'} textAlign={'center'} height={'10vh'}>
                                <Text>An Error occured</Text>
                            </Box>
                        );
                    case 'success':
                        return (
                            <Table  variant='striped' colorScheme='gray' size={{ base: 'sm', md: 'md' }}>
                                <Thead>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <Tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => {
                                                return (
                                                    <Th
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        style={{
                                                            width: header.getSize(),
                                                        }}
                                                        _first={{ pr: 0 }}
                                                    >
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext(),
                                                            )}
                                                    </Th>
                                                );
                                            })}
                                        </Tr>
                                    ))}
                                </Thead>

                                <Tbody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map(row => (
                                            <Tr key={row.id} aria-selected={row.getIsSelected()}>
                                                {row.getVisibleCells().map(cell => (
                                                    <Td
                                                        key={cell.id}
                                                        width='fit-content'
                                                        role='cell'
                                                        _first={{ pr: 0 }}
                                                        overflow='hidden'
                                                        textOverflow='ellipsis'
                                                        whiteSpace='nowrap'
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </Td>
                                                ))}
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td
                                                colSpan={props.columns.length}
                                                className='h-24 text-center'
                                            >
                                                No results.
                                            </Td>
                                        </Tr>
                                    )}
                                </Tbody>
                                <TableCaption>
                                    <HStack justifyContent={'space-between'}>
                                        <Box display={'flex'}>
                                            <Button
                                                size={'xs'}
                                                onClick={() => table.previousPage()}
                                                isDisabled={!table.getCanPreviousPage()}
                                            >
                                                {'<'}
                                            </Button>
                                            <Button
                                                size={'xs'}
                                                mx='2'
                                                onClick={() => table.nextPage()}
                                                isDisabled={!table.getCanNextPage()}

                                            >
                                                {'>'}
                                            </Button>
                                            <Box display={'flex'}>
                                                <div>Page</div>
                                                <strong>
                                                    {table.getState().pagination.pageIndex + 1} of{' '}
                                                    {table.getPageCount().toLocaleString()}
                                                </strong>
                                            </Box>
                                        </Box>
                                        <Box>

                                            Showing   <strong> {table.getRowModel().rows.length.toLocaleString()}</strong> of{' '}
                                            <strong> {table.getRowCount().toLocaleString()}</strong> Rows
                                        </Box>
                                        <Box>
                                            <select
                                                value={table.getState().pagination.pageSize}
                                                onChange={e => {
                                                    table.setPageSize(Number(e.target.value))
                                                }}
                                            >
                                                {[10, 20, 30].map(pageSize => (
                                                    <option key={pageSize} value={pageSize}>
                                                        Per page {pageSize}
                                                    </option>
                                                ))}
                                            </select>
                                        </Box>
                                    </HStack>

                                </TableCaption>
                            </Table>
                        );
                    default:
                        return null;
                }
            })()}
        </TableContainer>
    );
}
