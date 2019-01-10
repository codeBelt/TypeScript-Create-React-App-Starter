import React from 'react';
import {connect, DispatchProp} from 'react-redux';
import IStore from '../../stores/IStore';
import IAction from '../../stores/IAction';

interface IProps {}
interface IState {}
interface IStateToProps {
    readonly currentModal: JSX.Element;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    currentModal: state.modalReducer.currentModal,
});

class ModalHub extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {

    public render(): JSX.Element {
        return this.props.currentModal;
    }

}

export default connect(mapStateToProps)(ModalHub);
