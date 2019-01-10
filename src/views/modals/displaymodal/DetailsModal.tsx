import styles from './DetailsModal.module.scss';

import React from 'react';
import BaseModal from '../BaseModal';
import {connect, DispatchProp} from 'react-redux';
import IAction from '../../../stores/IAction';
import IStore from '../../../stores/IStore';
import ModalAction from '../../../stores/modal/ModalAction';
import CategoryEnum from '../../../constants/CategoryEnum';
import {SwapiModelUnion} from '../../../stores/swapi/models/CategoryResponseModel';
import CategoryItemFactory from '../../../utilities/CategoryItemFactory';
import {getRelatedItemsForDetails} from '../../../selectors/details/DetailsSelector';
import ICategoryItemsGroup from '../../../selectors/details/models/ICategoryItemsGroup';
import CategoryItemGroup from '../../components/details/categoryitemgroup/CategoryItemGroup';

export interface IProps {
    readonly itemId: string;
    readonly category: CategoryEnum;
}
interface IState {}
interface IStateToProps {
    readonly model: SwapiModelUnion;
    readonly categoryItemsGroup: ICategoryItemsGroup[];
    readonly isLoadingDetails: boolean;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    model: state.swapiReducer[ownProps.category].entity.entities[ownProps.itemId],
    categoryItemsGroup: getRelatedItemsForDetails(state, ownProps.itemId, ownProps.category),
    isLoadingDetails: state.swapiReducer.isLoadingDetails,

});

class DetailsModal extends React.PureComponent<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {

    public render(): JSX.Element {
        const {model, categoryItemsGroup, isLoadingDetails} = this.props;
        const detailsComponent: JSX.Element = CategoryItemFactory.create(model);

        return (
            <BaseModal isRequired={false}>
                <section className="modal-content">
                    <div className="modal-header">
                        {model.name}
                    </div>
                    <div className="modal-body">
                        <div>{detailsComponent}</div>
                        {isLoadingDetails && (
                            <div>Loading...</div>
                        )}
                        {!isLoadingDetails && (
                            <ul className={styles.categories}>
                                {categoryItemsGroup.map((categoryGroup: ICategoryItemsGroup) =>
                                    <li key={categoryGroup.category}>
                                        <CategoryItemGroup categoryGroup={categoryGroup} />
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={this._onClose}>Close</button>
                    </div>
                </section>
            </BaseModal>
        );
    }

    private _onClose = (): void => {
        this.props.dispatch(ModalAction.closeModal());
    }

}

export default connect(mapStateToProps)(DetailsModal);
