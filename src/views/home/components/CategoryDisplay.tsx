import styles from './CategoryDisplay.module.scss';

import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import IAction from '../../../stores/IAction';
import IStore from '../../../stores/IStore';
import ICategoryDisplayItem from '../../../selectors/home/models/ICategoryDisplayItem';
import {getCategoryDisplayList} from '../../../selectors/home/HomeSelector';
import CategoryEnum from '../../../constants/CategoryEnum';
import SwapiAction from '../../../stores/swapi/SwapiAction';
import ICategoryViewData from '../../../selectors/home/models/ICategoryViewData';
import CategoryItem from './CategoryItem';
import ModalAction from '../../../stores/modal/ModalAction';
import DetailsModal from '../../modals/displaymodal/DetailsModal';

interface IState {}
interface IProps {}
interface IStateToProps {
    readonly categoryViewData: ICategoryViewData,
    readonly isLoadingCategory: boolean,
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    categoryViewData: getCategoryDisplayList(state, state.swapiReducer.currentCategory),
    isLoadingCategory: state.swapiReducer.isLoadingCategory,
});

class CategoryDisplay extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {

    public render(): JSX.Element {
        const {categoryViewData, isLoadingCategory} = this.props;

        return (
            <div>
                {categoryViewData && (
                    <>
                        <div>
                            {categoryViewData.displayCount}
                        </div>
                        <ul className={styles.container}>
                            {categoryViewData.items.map((item: ICategoryDisplayItem) =>
                                <li
                                    key={item.label}
                                    className={styles.item}
                                    onClick={this._onClickItem}
                                    data-category={item.category}
                                    data-item-id={item.id}
                                >
                                    <CategoryItem item={item} />
                                </li>
                            )}
                        </ul>
                        {categoryViewData.loadMoreUrl && (
                            <button
                                type="button"
                                data-load-more-endpoint={categoryViewData.loadMoreUrl}
                                data-category={categoryViewData.category}
                                onClick={this._onClickLoadMore}
                            >
                                Load More
                            </button>
                        )}
                    </>
                )}
                {isLoadingCategory && (
                    <div>
                        Loading...
                    </div>
                )}
            </div>
        );
    }

    private _onClickItem = (event: React.MouseEvent<HTMLLIElement>) => {
        const category: CategoryEnum = event.currentTarget.getAttribute('data-category') as CategoryEnum;
        const itemId: string = event.currentTarget.getAttribute('data-item-id');

        this.props.dispatch(SwapiAction.loadDetails(itemId, category));

        const modal: JSX.Element = (
            <DetailsModal
                category={category}
                itemId={itemId}
            />
        );

        this.props.dispatch(ModalAction.addModal(modal));
    }

    private _onClickLoadMore = (event: React.MouseEvent<HTMLButtonElement>) => {
        const category: CategoryEnum = event.currentTarget.getAttribute('data-category') as CategoryEnum;
        const apiEndpoint: string = event.currentTarget.getAttribute('data-load-more-endpoint');

        this.props.dispatch(SwapiAction.loadCategory({
            apiEndpoint,
            category,
        }));
    }

}

export default connect(mapStateToProps)(CategoryDisplay);
