import styles from './CategoryItemGroup.module.scss';

import * as React from 'react';
import {SwapiModelUnion} from '../../../../stores/swapi/models/CategoryResponseModel';
import ICategoryItemsGroup from '../../../../selectors/details/models/ICategoryItemsGroup';

interface IState {}
interface IProps {
    readonly categoryGroup: ICategoryItemsGroup;
}

export default class CategoryItemGroup extends React.Component<IProps, IState> {

    public render(): JSX.Element {
        const {categoryGroup} = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.header}>{categoryGroup.label}</div>
                <ul>
                    {categoryGroup.items.map((item: SwapiModelUnion) =>
                        <li key={item.name}>
                            {item.name}
                        </li>
                    )}
                </ul>
            </div>
        )
    }

}
