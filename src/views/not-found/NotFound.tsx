import React from 'react';
import {connect, DispatchProp} from 'react-redux';
import IAction from '../../stores/IAction';
import IStore from '../../stores/IStore';
import MetaAction from '../../stores/meta/MetaAction';

export interface IProps {}
interface IState {}
interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class NotFound extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {

    public componentDidMount(): void {
        this.props.dispatch(MetaAction.setMeta({title: '404 Page Not Found'}));
    }

    public render() {
        return (
            <div>
                {'404 Page Not Found'}
            </div>
        );
    }

}

export default connect(mapStateToProps)(NotFound);
