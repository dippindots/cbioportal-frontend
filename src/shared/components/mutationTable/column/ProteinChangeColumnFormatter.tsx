import * as React from 'react';
import {
    calcProteinChangeSortValue,
    getVariantAnnotation,
    RemoteData,
} from 'cbioportal-utils';
import { Mutation } from 'cbioportal-ts-api-client';
import { TruncatedText } from 'cbioportal-frontend-commons';
import MutationStatusColumnFormatter from './MutationStatusColumnFormatter';
import styles from './proteinChange.module.scss';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import { Revue } from 'react-mutation-mapper';
import _ from 'lodash';

export default class ProteinChangeColumnFormatter {
    public static getSortValue(d: Mutation[]): number | null {
        return calcProteinChangeSortValue(
            ProteinChangeColumnFormatter.getTextValue(d)
        );
    }

    public static getTextValue(data: Mutation[]): string {
        let textValue: string = '';
        const dataValue = ProteinChangeColumnFormatter.getData(data);

        if (dataValue) {
            textValue = dataValue.toString();
        }

        return textValue;
    }

    public static getFilterValue(
        data: Mutation[],
        filterString: string,
        filterStringUpper: string
    ): boolean {
        let filterValue = ProteinChangeColumnFormatter.getDisplayValue(data);
        const mutationStatus:
            | string
            | null = MutationStatusColumnFormatter.getData(data);

        if (
            mutationStatus &&
            mutationStatus.toLowerCase().includes('germline')
        ) {
            filterValue = `${filterValue}${mutationStatus}`;
        }

        return filterValue.toUpperCase().indexOf(filterStringUpper) > -1;
    }

    public static getDisplayValue(data: Mutation[]): string {
        // same as text value
        return ProteinChangeColumnFormatter.getTextValue(data);
    }

    public static getData(data: Mutation[]) {
        if (data.length > 0) {
            return data[0].proteinChange;
        } else {
            return null;
        }
    }

    public static renderWithMutationStatus(
        data: Mutation[],
        indexedVariantAnnotations?: RemoteData<
            { [genomicLocation: string]: VariantAnnotation } | undefined
        >
    ) {
        // use text as display value
        const text: string = ProteinChangeColumnFormatter.getDisplayValue(data);

        const mutationStatus:
            | string
            | null = MutationStatusColumnFormatter.getData(data);

        const vue =
            indexedVariantAnnotations &&
            indexedVariantAnnotations.result &&
            indexedVariantAnnotations.status === 'complete' &&
            !_.isEmpty(data)
                ? getVariantAnnotation(
                      data[0],
                      indexedVariantAnnotations.result
                  )?.annotation_summary.vues
                : undefined;

        const isGermlineMutation =
            mutationStatus &&
            mutationStatus.toLowerCase().indexOf('germline') > -1;

        let content = (
            <TruncatedText
                text={text}
                tooltip={<span>{text}</span>}
                className={styles.proteinChange}
                maxLength={40}
            />
        );

        content = (
            <span className={styles.proteinChangeCell}>
                {content}
                {isGermlineMutation && ( // add a germline indicator next to protein change if it is a germline mutation!
                    <span className={styles.germline}>Germline</span>
                )}
                {vue && (
                    <span className={styles.revueIcon}>
                        <Revue isVue={true} vue={vue} />
                    </span>
                )}
            </span>
        );

        return content;
    }
}
