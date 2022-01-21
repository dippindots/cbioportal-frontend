import { Sample } from 'cbioportal-ts-api-client';
import React from 'react';

export enum GenericAssayFrequencyTableColumnKey {
    NAME = 'Name',
    NUMBER = '#',
    FREQ = 'Freq',
}

export enum GenericAssayFrequencyTableType {
    SAMPLE = 'SAMPLE_LEVEL_GENERIC_ASSAY',
    PATIENT = 'PATIENT_LEVEL_GENERIC_ASSAY',
}

export type SampleGenericAssayFrequencyRow = {
    stableId: string;
    freq: number;
    count: number;
    samples: Sample[];
};

export type PatientGenericAssayFrequencyRow = {
    stableId: string;
    freq: number;
    count: number;
};

export type GenericAssayFrequencyRow =
    | SampleGenericAssayFrequencyRow
    | PatientGenericAssayFrequencyRow;

export function genericAssayFrequencyUniqueKey(cell: GenericAssayFrequencyRow) {
    return cell.stableId;
}

export const GenericAssayFrequencyTableColumnCell = class GenericAssayFrequencyTableColumnCell extends React.Component<
    { row: GenericAssayFrequencyRow },
    {}
> {
    render() {
        return <div>{this.props.row.freq}</div>;
    }
};

export function filterGenericAssayFrequencyCell(
    cell: SampleGenericAssayFrequencyRow | PatientGenericAssayFrequencyRow,
    filter: string
): boolean {
    return cell.stableId.toUpperCase().includes(filter.toUpperCase());
}
