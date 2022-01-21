import * as React from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { computed, makeObservable } from 'mobx';
import styles from './styles.module.scss';
import {
    DataFilterValue,
    AndedPatientTreatmentFilters,
    AndedSampleTreatmentFilters,
    GeneFilterQuery,
    PatientTreatmentFilter,
    SampleTreatmentFilter,
} from 'cbioportal-ts-api-client';
import {
    DataType,
    FilterIconMessage,
    ChartType,
    getGenomicChartUniqueKey,
    getGenericAssayChartUniqueKey,
    getGenericAssayFrequencyChartUniqueKey,
} from 'pages/studyView/StudyViewUtils';
import {
    ChartMeta,
    geneFilterQueryToOql,
    getCNAColorByAlteration,
    getPatientIdentifiers,
    getSelectedGroupNames,
    getUniqueKeyFromMolecularProfileIds,
    intervalFiltersDisplayValue,
    StudyViewFilterWithSampleIdentifierFilters,
} from 'pages/studyView/StudyViewUtils';
import { PillTag } from '../../shared/components/PillTag/PillTag';
import { GroupLogic } from './filters/groupLogic/GroupLogic';
import classnames from 'classnames';
import { STUDY_VIEW_CONFIG, ChartTypeEnum } from './StudyViewConfig';
import { DEFAULT_NA_COLOR } from 'shared/lib/Colors';
import {
    caseCounts,
    getSampleIdentifiers,
    StudyViewComparisonGroup,
} from '../groupComparison/GroupComparisonUtils';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import {
    OredPatientTreatmentFilters,
    OredSampleTreatmentFilters,
} from 'cbioportal-ts-api-client';
import { ClinicalDataFilter } from 'cbioportal-ts-api-client/dist/generated/CBioPortalAPI';
import {
    STRUCTURAL_VARIANT_COLOR,
    MUT_COLOR_MISSENSE,
} from 'cbioportal-frontend-commons';

export interface IUserSelectionsProps {
    filter: StudyViewFilterWithSampleIdentifierFilters;
    customChartsFilter: ClinicalDataFilter[];
    numberOfSelectedSamplesInCustomSelection: number;
    comparisonGroupSelection: StudyViewComparisonGroup[];
    attributesMetaSet: { [id: string]: ChartMeta & { chartType: ChartType } };
    updateClinicalDataFilterByValues: (
        uniqueKey: string,
        values: DataFilterValue[]
    ) => void;
    updateCustomChartFilter: (uniqueKey: string, values: string[]) => void;
    removeGeneFilter: (uniqueKey: string, oql: string) => void;
    updateGenomicDataIntervalFilter: (
        uniqueKey: string,
        values: DataFilterValue[]
    ) => void;
    updateGenericAssayDataFilter: (
        uniqueKey: string,
        values: DataFilterValue[]
    ) => void;
    removeCustomSelectionFilter: () => void;
    removeComparisonGroupSelectionFilter: () => void;
    clearAllFilters: () => void;
    clinicalAttributeIdToDataType: { [key: string]: string };
    onBookmarkClick: () => void;
    molecularProfileNameSet: { [key: string]: string };
    caseListNameSet: { [key: string]: string };
    removeGenomicProfileFilter: (value: string) => void;
    removeCaseListsFilter: (value: string) => void;
    removeTreatmentsFilter: (
        andedIndex: number,
        oredIndex: number,
        metaKey: string
    ) => void;
}

@observer
export default class UserSelections extends React.Component<
    IUserSelectionsProps,
    {}
> {
    constructor(props: IUserSelectionsProps) {
        super(props);
        makeObservable(this);
    }
    @computed
    get showFilters() {
        //return isFiltered(this.props.filter)
        return this.allComponents.length > 0;
    }

    @computed
    get allComponents() {
        let components = [] as JSX.Element[];

        // Show the filter for the custom selection
        if (this.props.numberOfSelectedSamplesInCustomSelection > 0) {
            components.push(
                <div className={styles.parentGroupLogic}>
                    <GroupLogic
                        components={[
                            <span className={styles.filterClinicalAttrName}>
                                Custom Selection
                            </span>,
                            <PillTag
                                content={`${
                                    this.props
                                        .numberOfSelectedSamplesInCustomSelection
                                } sample${
                                    this.props
                                        .numberOfSelectedSamplesInCustomSelection >
                                    1
                                        ? 's'
                                        : ''
                                }`}
                                backgroundColor={
                                    STUDY_VIEW_CONFIG.colors.theme
                                        .clinicalFilterContent
                                }
                                onDelete={() =>
                                    this.props.removeCustomSelectionFilter()
                                }
                            />,
                        ]}
                        operation={':'}
                        group={false}
                    />
                </div>
            );
        }

        // Show the filter for the comparison group selection
        if (this.props.comparisonGroupSelection.length > 0) {
            const numSamples = getSampleIdentifiers(
                this.props.comparisonGroupSelection
            ).length;
            const numPatients = getPatientIdentifiers(
                this.props.comparisonGroupSelection
            ).length;
            components.push(
                <div className={styles.parentGroupLogic}>
                    <GroupLogic
                        components={[
                            <span className={styles.filterClinicalAttrName}>
                                {getSelectedGroupNames(
                                    this.props.comparisonGroupSelection
                                )}
                            </span>,
                            <PillTag
                                content={caseCounts(numSamples, numPatients)}
                                backgroundColor={
                                    STUDY_VIEW_CONFIG.colors.theme
                                        .clinicalFilterContent
                                }
                                onDelete={() =>
                                    this.props.removeComparisonGroupSelectionFilter()
                                }
                            />,
                        ]}
                        operation={':'}
                        group={false}
                    />
                </div>
            );
        }

        this.renderClinicalDataFilters(
            this.props.filter.clinicalDataFilters,
            components,
            this.props.updateClinicalDataFilterByValues
        );

        this.renderClinicalDataFilters(
            this.props.filter.customDataFilters,
            components,
            (uniqueKey: string, values: DataFilterValue[]) => {
                this.props.updateCustomChartFilter(
                    uniqueKey,
                    values.map(datum => datum.value)
                );
            }
        );

        // Genomic Bar chart filters
        _.reduce(
            this.props.filter.genomicDataFilters || [],
            (acc, genomicDataIntervalFilter) => {
                const uniqueKey = getGenomicChartUniqueKey(
                    genomicDataIntervalFilter.hugoGeneSymbol,
                    genomicDataIntervalFilter.profileType
                );
                const chartMeta = this.props.attributesMetaSet[uniqueKey];
                if (chartMeta) {
                    acc.push(
                        <div className={styles.parentGroupLogic}>
                            <GroupLogic
                                components={[
                                    <span
                                        className={
                                            styles.filterClinicalAttrName
                                        }
                                    >
                                        {chartMeta.displayName}
                                    </span>,
                                    this.renderDataBinFilter(
                                        genomicDataIntervalFilter.values,
                                        this.props
                                            .updateGenomicDataIntervalFilter,
                                        chartMeta
                                    ),
                                ]}
                                operation={':'}
                                group={false}
                            />
                        </div>
                    );
                }
                return acc;
            },
            components
        );

        // Generic Assay chart filters
        let genericAssayFilterComponents: JSX.Element[] = [];
        if (this.props.filter.genericAssayDataFilters) {
            _.forEach(
                this.props.filter.genericAssayDataFilters,
                genericAssayDataFilter => {
                    const uniqueKey = getGenericAssayChartUniqueKey(
                        genericAssayDataFilter.stableId,
                        genericAssayDataFilter.profileType
                    );
                    const chartMeta = this.props.attributesMetaSet[uniqueKey];
                    if (chartMeta) {
                        genericAssayFilterComponents.push(
                            <div className={styles.parentGroupLogic}>
                                <GroupLogic
                                    components={[
                                        <span
                                            className={
                                                styles.filterClinicalAttrName
                                            }
                                        >
                                            {chartMeta.displayName}
                                        </span>,
                                        <PillTag
                                            content={intervalFiltersDisplayValue(
                                                genericAssayDataFilter.values
                                            )}
                                            backgroundColor={
                                                STUDY_VIEW_CONFIG.colors.theme
                                                    .clinicalFilterContent
                                            }
                                            onDelete={() =>
                                                this.props.updateGenericAssayDataFilter(
                                                    chartMeta.uniqueKey,
                                                    []
                                                )
                                            }
                                        />,
                                    ]}
                                    operation={':'}
                                    group={false}
                                />
                            </div>
                        );
                    }
                }
            );
        }

        // Generic Assay chart filters
        let genericAssayFrequencyFilterComponents: JSX.Element[] = [];
        if (this.props.filter.genericAssayFrequencyFilters) {
            _.forEach(
                this.props.filter.genericAssayFrequencyFilters,
                genericAssayFrequencyFilter => {
                    const uniqueKey = getGenericAssayFrequencyChartUniqueKey(
                        genericAssayFrequencyFilter.genericAssayType,
                        genericAssayFrequencyFilter.profileType
                    );
                    const chartMeta = this.props.attributesMetaSet[uniqueKey];
                    if (chartMeta) {
                        // TODO: need to update this components to show both entity id and values selected
                        genericAssayFrequencyFilterComponents.push(
                            <div className={styles.parentGroupLogic}>
                                {/* <GroupLogic
                                    components={[
                                        <span
                                            className={
                                                styles.filterClinicalAttrName
                                            }
                                        >
                                            {chartMeta.displayName}
                                        </span>,
                                        <PillTag
                                            content={genericAssayFrequencyFilter.values.map(value => value.entityId).join(',')}
                                            backgroundColor={
                                                STUDY_VIEW_CONFIG.colors.theme
                                                    .clinicalFilterContent
                                            }
                                            onDelete={() =>
                                                this.props.updateGenericAssayDataFilter(
                                                    chartMeta.uniqueKey,
                                                    []
                                                )
                                            }
                                        />,
                                    ]}
                                    operation={':'}
                                    group={false}
                                /> */}
                                <GroupLogic
                                    components={genericAssayFrequencyFilter.values.map(
                                        value => {
                                            console.log(
                                                genericAssayFrequencyFilter.values
                                            );

                                            return (
                                                <GroupLogic
                                                    components={[
                                                        <PillTag
                                                            content={
                                                                value.entityId
                                                            }
                                                            backgroundColor={
                                                                STUDY_VIEW_CONFIG
                                                                    .colors
                                                                    .theme
                                                                    .clinicalFilterContent
                                                            }
                                                            onDelete={() =>
                                                                this.props.updateGenericAssayDataFilter(
                                                                    chartMeta.uniqueKey,
                                                                    []
                                                                )
                                                            }
                                                        />,
                                                    ]}
                                                    operation="or"
                                                    group={false}
                                                />
                                            );
                                        }
                                    )}
                                    operation={'and'}
                                    group={false}
                                />
                            </div>
                        );
                    }
                }
            );
        }

        // All custom data charts
        this.renderClinicalDataFilters(
            this.props.customChartsFilter,
            components,
            (uniqueKey: string, values: DataFilterValue[]) => {
                this.props.updateCustomChartFilter(
                    uniqueKey,
                    values.map(datum => datum.value)
                );
            }
        );

        _.reduce(
            this.props.filter.geneFilters || [],
            (acc, geneFilter) => {
                const uniqueKey = getUniqueKeyFromMolecularProfileIds(
                    geneFilter.molecularProfileIds
                );
                const chartMeta = this.props.attributesMetaSet[uniqueKey];
                if (chartMeta) {
                    acc.push(
                        <div className={styles.parentGroupLogic}>
                            <GroupLogic
                                components={geneFilter.geneQueries.map(
                                    queries => {
                                        return (
                                            <GroupLogic
                                                components={this.groupedGeneQueries(
                                                    queries,
                                                    chartMeta
                                                )}
                                                operation="or"
                                                group={queries.length > 1}
                                            />
                                        );
                                    }
                                )}
                                operation={'and'}
                                group={false}
                            />
                        </div>
                    );
                }
                return acc;
            },
            components
        );

        if (!_.isEmpty(this.props.filter.genomicProfiles)) {
            components.push(
                <div className={styles.parentGroupLogic}>
                    <GroupLogic
                        components={this.props.filter.genomicProfiles.map(
                            genomicProfiles => {
                                return (
                                    <GroupLogic
                                        components={this.groupedGenomicProfiles(
                                            genomicProfiles
                                        )}
                                        operation="or"
                                        group={genomicProfiles.length > 1}
                                    />
                                );
                            }
                        )}
                        operation={'and'}
                        group={false}
                    />
                </div>
            );
        }

        if (!_.isEmpty(this.props.filter.caseLists)) {
            components.push(
                <div className={styles.parentGroupLogic}>
                    <GroupLogic
                        components={this.props.filter.caseLists.map(
                            caseLists => {
                                return (
                                    <GroupLogic
                                        components={this.groupedCaseLists(
                                            caseLists
                                        )}
                                        operation="or"
                                        group={caseLists.length > 1}
                                    />
                                );
                            }
                        )}
                        operation={'and'}
                        group={false}
                    />
                </div>
            );
        }

        // push to components
        if (genericAssayFilterComponents) {
            components.push(...genericAssayFilterComponents);
        }

        if (genericAssayFrequencyFilterComponents) {
            components.push(...genericAssayFrequencyFilterComponents);
        }

        if (
            this.props.filter.sampleTreatmentFilters &&
            this.props.filter.sampleTreatmentFilters.filters.length > 0
        ) {
            const f = this.renderTreatmentFilter(
                this.props.filter.sampleTreatmentFilters,
                'SAMPLE_TREATMENTS'
            );
            components.push(f);
        }

        if (
            this.props.filter.patientTreatmentFilters &&
            this.props.filter.patientTreatmentFilters.filters.length > 0
        ) {
            const f = this.renderTreatmentFilter(
                this.props.filter.patientTreatmentFilters,
                'PATIENT_TREATMENTS'
            );
            components.push(f);
        }

        if (
            this.props.filter.sampleTreatmentGroupFilters &&
            this.props.filter.sampleTreatmentGroupFilters.filters.length > 0
        ) {
            const f = this.renderTreatmentFilter(
                this.props.filter.sampleTreatmentGroupFilters,
                'SAMPLE_TREATMENT_GROUPS'
            );
            components.push(f);
        }

        if (
            this.props.filter.patientTreatmentGroupFilters &&
            this.props.filter.patientTreatmentGroupFilters.filters.length > 0
        ) {
            const f = this.renderTreatmentFilter(
                this.props.filter.patientTreatmentGroupFilters,
                'PATIENT_TREATMENT_GROUPS'
            );
            components.push(f);
        }
        return components;
    }

    private renderClinicalDataFilters(
        filters: ClinicalDataFilter[],
        components: JSX.Element[],
        onDelete: (chartUniqueKey: string, values: DataFilterValue[]) => void
    ) {
        return _.reduce(
            filters || [],
            (acc, clinicalDataFilter) => {
                const chartMeta = this.props.attributesMetaSet[
                    clinicalDataFilter.attributeId
                ];
                if (chartMeta) {
                    const dataType = this.props.clinicalAttributeIdToDataType[
                        clinicalDataFilter.attributeId
                    ];
                    let dataFilterComponent =
                        dataType === DataType.STRING
                            ? this.renderCategoricalDataFilter(
                                  clinicalDataFilter,
                                  onDelete,
                                  chartMeta
                              )
                            : this.renderDataBinFilter(
                                  clinicalDataFilter.values,
                                  onDelete,
                                  chartMeta
                              );

                    acc.push(
                        <div className={styles.parentGroupLogic}>
                            <GroupLogic
                                components={[
                                    <span
                                        className={
                                            styles.filterClinicalAttrName
                                        }
                                    >
                                        {chartMeta.displayName}
                                    </span>,
                                    dataFilterComponent,
                                ]}
                                operation={':'}
                                group={false}
                            />
                        </div>
                    );
                }
                return acc;
            },
            components
        );
    }

    // Bar chart filter
    private renderDataBinFilter(
        values: DataFilterValue[],
        onDelete: (chartUniqueKey: string, values: DataFilterValue[]) => void,
        chartMeta: ChartMeta
    ): JSX.Element {
        return (
            <PillTag
                content={intervalFiltersDisplayValue(values)}
                backgroundColor={
                    STUDY_VIEW_CONFIG.colors.theme.clinicalFilterContent
                }
                onDelete={() => onDelete(chartMeta.uniqueKey, [])}
            />
        );
    }

    // Pie chart filter
    private renderCategoricalDataFilter(
        clinicalDataFilter: ClinicalDataFilter,
        onDelete: (chartUniqueKey: string, values: DataFilterValue[]) => void,
        chartMeta: ChartMeta & { chartType: ChartType }
    ): JSX.Element {
        return (
            <GroupLogic
                components={clinicalDataFilter.values.map(
                    clinicalDataFilterValue => {
                        return (
                            <PillTag
                                content={clinicalDataFilterValue.value}
                                backgroundColor={
                                    STUDY_VIEW_CONFIG.colors.theme
                                        .clinicalFilterContent
                                }
                                onDelete={() =>
                                    onDelete(
                                        chartMeta.uniqueKey,
                                        _.remove(
                                            clinicalDataFilter.values,
                                            value =>
                                                value.value !==
                                                clinicalDataFilterValue.value
                                        )
                                    )
                                }
                            />
                        );
                    }
                )}
                operation={'or'}
                group={false}
            />
        );
    }

    private renderTreatmentFilter(
        f: AndedPatientTreatmentFilters | AndedSampleTreatmentFilters,
        metaKey: string
    ): JSX.Element {
        type OuterFilter =
            | OredPatientTreatmentFilters
            | OredSampleTreatmentFilters;
        type InnerFilter = PatientTreatmentFilter | SampleTreatmentFilter;

        // the gross "as any" casting shouldn't be necessary for a type of
        // OredSampleTreatmentFilters[] | OredPatientTreatmentFilters[],
        // but the compiler complains if I remove it
        const filters = (f.filters as any).map(
            (oFilter: OuterFilter, oIndex: number) => {
                const pills = (oFilter.filters as any).map(
                    (iFilter: InnerFilter, iIndex: number) => {
                        const str = iFilter.hasOwnProperty('time')
                            ? (iFilter as SampleTreatmentFilter).time
                            : '';
                        return (
                            <PillTag
                                content={iFilter.treatment + ' ' + str}
                                backgroundColor={
                                    STUDY_VIEW_CONFIG.colors.theme
                                        .clinicalFilterContent
                                }
                                onDelete={() => {
                                    this.props.removeTreatmentsFilter(
                                        oIndex,
                                        iIndex,
                                        metaKey
                                    );
                                }}
                            />
                        );
                    }
                );

                return (
                    <GroupLogic
                        components={pills}
                        operation={'or'}
                        group={true}
                    />
                );
            }
        );

        return (
            <GroupLogic components={filters} operation={'and'} group={false} />
        );
    }

    private groupedGeneQueries(
        geneQueries: GeneFilterQuery[],
        chartMeta: ChartMeta & { chartType: ChartType }
    ): JSX.Element[] {
        return geneQueries.map(geneQuery => {
            let color = DEFAULT_NA_COLOR;
            let displayGeneSymbol = geneQuery.hugoGeneSymbol;
            switch (chartMeta.chartType) {
                case ChartTypeEnum.MUTATED_GENES_TABLE:
                    color = MUT_COLOR_MISSENSE;
                    break;
                case ChartTypeEnum.STRUCTURAL_VARIANT_GENES_TABLE:
                    color = STRUCTURAL_VARIANT_COLOR;
                    break;
                case ChartTypeEnum.CNA_GENES_TABLE: {
                    if (geneQuery.alterations.length === 1) {
                        let tagColor = getCNAColorByAlteration(
                            geneQuery.alterations[0]
                        );
                        if (tagColor) {
                            color = tagColor;
                        }
                    }
                    break;
                }
            }
            return (
                <PillTag
                    content={displayGeneSymbol}
                    backgroundColor={color}
                    infoSection={
                        <FilterIconMessage
                            chartType={chartMeta.chartType}
                            geneFilterQuery={geneQuery}
                        />
                    }
                    onDelete={() =>
                        this.props.removeGeneFilter(
                            chartMeta.uniqueKey,
                            geneFilterQueryToOql(geneQuery)
                        )
                    }
                />
            );
        });
    }

    private groupedGenomicProfiles(genomicProfiles: string[]): JSX.Element[] {
        return genomicProfiles.map(profile => {
            return (
                <PillTag
                    content={
                        this.props.molecularProfileNameSet[profile] || profile
                    }
                    backgroundColor={
                        STUDY_VIEW_CONFIG.colors.theme.clinicalFilterContent
                    }
                    onDelete={() =>
                        this.props.removeGenomicProfileFilter(profile)
                    }
                />
            );
        });
    }

    private groupedCaseLists(caseLists: string[]): JSX.Element[] {
        return caseLists.map(caseList => {
            return (
                <PillTag
                    content={this.props.caseListNameSet[caseList] || caseList}
                    backgroundColor={
                        STUDY_VIEW_CONFIG.colors.theme.clinicalFilterContent
                    }
                    onDelete={() => this.props.removeCaseListsFilter(caseList)}
                />
            );
        });
    }

    render() {
        if (this.showFilters) {
            return (
                <div
                    className={classnames(
                        styles.userSelections,
                        'userSelections'
                    )}
                >
                    {this.allComponents}
                    <button
                        data-test="clear-all-filters"
                        className={classnames(
                            'btn btn-default btn-sm',
                            styles.summaryClearAllBtn
                        )}
                        onClick={this.props.clearAllFilters}
                    >
                        Clear All Filters
                    </button>

                    <DefaultTooltip
                        placement={'topLeft'}
                        overlay={<div>Get bookmark link for this filter</div>}
                    >
                        <a
                            onClick={this.props.onBookmarkClick}
                            className={styles.bookmarkButton}
                        >
                            <span className="fa-stack fa-4x">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-link fa-stack-1x"></i>
                            </span>
                        </a>
                    </DefaultTooltip>
                </div>
            );
        } else {
            return null;
        }
    }
}
