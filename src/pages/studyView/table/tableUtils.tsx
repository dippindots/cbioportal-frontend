import React from 'react';
import styles from 'pages/studyView/table/tables.module.scss';

export const GenericColumnHeader = class GenericColumnHeader extends React.Component<
    { margin: number; headerName: string },
    {}
> {
    render() {
        return (
            <div
                style={{ marginLeft: this.props.margin }}
                className={styles.displayFlex}
            >
                {this.props.headerName}
            </div>
        );
    }
};
