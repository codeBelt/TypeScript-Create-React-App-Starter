import styles from './Header.module.scss';

import React from 'react';
import {connect, DispatchProp} from 'react-redux';
import IAction from '../../../stores/IAction';
import IStore from '../../../stores/IStore';
import {Link} from 'react-router-dom';
import RouteEnum from '../../../constants/RouteEnum';
import GenericModal from '../../modals/GenericModal';
import ModalAction from '../../../stores/modal/ModalAction';

interface IProps {}
interface IState {}
interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class Header extends React.PureComponent<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {

    public render(): JSX.Element {
        return (
            <>
                <div className={styles.header}>
                    <ul className={styles.menu}>
                        <li><Link to={RouteEnum.Home}>Home</Link></li>
                        <li><Link to={RouteEnum.Topics}>Topics</Link></li>
                    </ul>
                    <button className="btn" onClick={this._onClickAddModal}>Show Modal</button>
                </div>
                <hr />
            </>
        );
    }

    private _onClickAddModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const modal: JSX.Element = (
            <GenericModal
                isRequired={true}
                acceptLabel={'Delete'}
                rejectLabel={'Cancel'}
                message={'This is the modal message passed in.'}
            />
        );

        this.props.dispatch(ModalAction.addModal(modal));
    }

}

export default connect(mapStateToProps)(Header);
