import * as React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import FixedHeaderTable, { IFixedHeaderTableProps } from '../FixedHeaderTable';
import { action, computed, observable, makeObservable } from 'mobx';
import autobind from 'autobind-decorator';
import {
    Column,
    SortDirection,
} from '../../../../shared/components/lazyMobXTable/LazyMobXTable';
import { correctColumnWidth } from 'pages/studyView/StudyViewUtils';
import LabeledCheckbox from 'shared/components/labeledCheckbox/LabeledCheckbox';
import styles from 'pages/studyView/table/tables.module.scss';
import MobxPromise from 'mobxpromise';
import { stringListToIndexSet } from 'cbioportal-frontend-commons';
import ifNotDefined from 'shared/lib/ifNotDefined';
import { AbstractMultiSelectionTable } from '../AbstractMultiSelectionTable';
import { MultiSelectionTableRow } from 'pages/studyView/table/MultiSelectionTable';
import {
    filterGenericAssayFrequencyCell,
    GenericAssayFrequencyTableColumnCell,
    GenericAssayFrequencyTableColumnKey,
    genericAssayFrequencyUniqueKey,
    GenericAssayFrequencyRow,
} from './GenericAssayFrequencyTableUtils';
import { GenericColumnHeader } from '../tableUtils';

export type GenericAssayFrequencyTableColumn = {
    columnKey: GenericAssayFrequencyTableColumnKey;
    columnWidthRatio?: number;
};

export type GenericAssayFrequencyTableProps = {
    tableType: string;
    promise: MobxPromise<GenericAssayFrequencyRow[]>;
    width: number;
    height: number;
    filters: string[][];
    onSubmitSelection: (value: string[][]) => void;
    onChangeSelectedRows: (rowsKeys: string[]) => void;
    extraButtons?: IFixedHeaderTableProps<
        MultiSelectionTableRow
    >['extraButtons'];
    selectedRowsKeys: string[];
    defaultSortBy: GenericAssayFrequencyTableColumnKey;
    columns: GenericAssayFrequencyTableColumn[];
};

const DEFAULT_COLUMN_WIDTH_RATIO: {
    [key in GenericAssayFrequencyTableColumnKey]: number;
} = {
    [GenericAssayFrequencyTableColumnKey.NAME]: 0.6,
    [GenericAssayFrequencyTableColumnKey.NUMBER]: 0.3,
    [GenericAssayFrequencyTableColumnKey.FREQ]: 0.2,
};

class MultiSelectionTableComponent extends FixedHeaderTable<
    GenericAssayFrequencyRow
> {}

@observer
export class GenericAssayFrequencyTable extends AbstractMultiSelectionTable<
    GenericAssayFrequencyTableProps
> {
    @observable protected sortBy: GenericAssayFrequencyTableColumnKey;

    public static defaultProps = {
        cancerGeneFilterEnabled: false,
    };

    constructor(props: GenericAssayFrequencyTableProps) {
        super(props);
        makeObservable(this);
        this.sortBy = this.props.defaultSortBy;
    }

    createNubmerColumnCell(
        row: GenericAssayFrequencyRow,
        cellMargin: number
    ): JSX.Element {
        return (
            <LabeledCheckbox
                checked={this.isChecked(genericAssayFrequencyUniqueKey(row))}
                disabled={this.isDisabled(genericAssayFrequencyUniqueKey(row))}
                onChange={_ =>
                    this.toggleSelectRow(genericAssayFrequencyUniqueKey(row))
                }
                labelProps={{
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginLeft: 0,
                        marginRight: cellMargin,
                    },
                }}
                inputProps={{
                    className: styles.autoMarginCheckbox,
                }}
            >
                <span>{row.count.toLocaleString()}</span>
            </LabeledCheckbox>
        );
    }

    getDefaultColumnDefinition = (
        columnKey: GenericAssayFrequencyTableColumnKey,
        columnWidth: number,
        cellMargin: number
    ) => {
        const defaults: {
            [key in GenericAssayFrequencyTableColumnKey]: Column<
                GenericAssayFrequencyRow
            >;
        } = {
            [GenericAssayFrequencyTableColumnKey.NAME]: {
                name: columnKey,
                headerRender: () => (
                    <GenericColumnHeader
                        margin={cellMargin}
                        headerName={columnKey}
                    />
                ),
                render: (data: GenericAssayFrequencyRow) => (
                    <div>{data.stableId}</div>
                ),
                sortBy: (data: GenericAssayFrequencyRow) => data.stableId,
                defaultSortDirection: 'asc' as 'asc',
                filter: filterGenericAssayFrequencyCell,
                width: columnWidth,
            },
            [GenericAssayFrequencyTableColumnKey.NUMBER]: {
                name: columnKey,
                headerRender: () => (
                    <GenericColumnHeader
                        margin={cellMargin}
                        headerName={columnKey}
                    />
                ),
                render: (data: GenericAssayFrequencyRow) =>
                    this.createNubmerColumnCell(data, 80),
                sortBy: (data: GenericAssayFrequencyRow) => data.count,
                defaultSortDirection: 'asc' as 'asc',
                filter: filterGenericAssayFrequencyCell,
                width: columnWidth,
            },
            [GenericAssayFrequencyTableColumnKey.FREQ]: {
                name: columnKey,
                headerRender: () => (
                    <GenericColumnHeader
                        margin={cellMargin}
                        headerName={columnKey}
                    />
                ),
                render: (data: GenericAssayFrequencyRow) => (
                    <GenericAssayFrequencyTableColumnCell row={data} />
                ),
                sortBy: (data: GenericAssayFrequencyRow) => data.freq,
                defaultSortDirection: 'desc' as 'desc',
                filter: filterGenericAssayFrequencyCell,
                width: columnWidth,
            },
        };
        return defaults[columnKey];
    };

    @computed
    get columnsWidth() {
        return _.reduce(
            this.props.columns,
            (acc, column) => {
                acc[column.columnKey] = correctColumnWidth(
                    (column.columnWidthRatio
                        ? column.columnWidthRatio
                        : DEFAULT_COLUMN_WIDTH_RATIO[column.columnKey]) *
                        this.props.width
                );
                return acc;
            },
            {} as { [key in GenericAssayFrequencyTableColumnKey]: number }
        );
    }

    @computed
    get cellMargin() {
        return _.reduce(
            this.props.columns,
            (acc, column) => {
                acc[column.columnKey] = 0;
                return acc;
            },
            {} as { [key in GenericAssayFrequencyTableColumnKey]: number }
        );
    }

    @computed get tableData(): GenericAssayFrequencyRow[] {
        return this.props.promise.result || [];
    }

    @computed get selectableTableData() {
        if (this.flattenedFilters.length === 0) {
            return this.tableData;
        }
        return _.filter(
            this.tableData,
            data =>
                !this.flattenedFilters.includes(
                    genericAssayFrequencyUniqueKey(data)
                )
        );
    }

    @computed
    get preSelectedRows() {
        if (this.flattenedFilters.length === 0) {
            return [];
        }
        const order = stringListToIndexSet(this.flattenedFilters);
        return _.chain(this.tableData)
            .filter(data =>
                this.flattenedFilters.includes(
                    genericAssayFrequencyUniqueKey(data)
                )
            )
            .sortBy<GenericAssayFrequencyRow>(data =>
                ifNotDefined(
                    order[genericAssayFrequencyUniqueKey(data)],
                    Number.POSITIVE_INFINITY
                )
            )
            .value();
    }

    @computed
    get preSelectedRowsKeys() {
        return this.preSelectedRows.map(row =>
            genericAssayFrequencyUniqueKey(row)
        );
    }

    @computed
    get tableColumns() {
        return this.props.columns.map(column =>
            this.getDefaultColumnDefinition(
                column.columnKey,
                this.columnsWidth[column.columnKey],
                this.cellMargin[column.columnKey]
            )
        );
    }

    @action.bound
    afterSorting(
        sortBy: GenericAssayFrequencyTableColumnKey,
        sortDirection: SortDirection
    ) {
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
    }

    @autobind
    isSelectedRow(data: GenericAssayFrequencyRow) {
        return this.isChecked(genericAssayFrequencyUniqueKey(data));
    }

    @autobind
    selectedRowClassName(data: GenericAssayFrequencyRow) {
        const index = this.filterKeyToIndexSet[
            genericAssayFrequencyUniqueKey(data)
        ];
        if (index === undefined) {
            return this.props.filters.length % 2 === 0
                ? styles.highlightedEvenRow
                : styles.highlightedOddRow;
        }
        return index % 2 === 0
            ? styles.highlightedEvenRow
            : styles.highlightedOddRow;
    }

    public render() {
        // TODO: Need to change this into a unique id
        const tableId = `${this.props.tableType}-table`;
        return (
            <div data-test={tableId} key={tableId}>
                {this.props.promise.isComplete && (
                    <MultiSelectionTableComponent
                        width={this.props.width}
                        height={this.props.height}
                        data={this.selectableTableData}
                        columns={this.tableColumns}
                        isSelectedRow={this.isSelectedRow}
                        afterSelectingRows={this.afterSelectingRows}
                        defaultSelectionOperator={this.selectionType}
                        toggleSelectionOperator={this.toggleSelectionOperator}
                        extraButtons={this.props.extraButtons}
                        sortBy={this.sortBy}
                        sortDirection={this.sortDirection}
                        afterSorting={this.afterSorting}
                        fixedTopRowsData={this.preSelectedRows}
                        highlightedRowClassName={this.selectedRowClassName}
                        numberOfSelectedRows={
                            this.props.selectedRowsKeys.length
                        }
                        showSetOperationsButton={true}
                    />
                )}
            </div>
        );
    }
}
