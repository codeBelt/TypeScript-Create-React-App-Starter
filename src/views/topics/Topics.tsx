import styles from './Topics.module.scss';

import React from 'react';
import {Link, Route, RouteComponentProps} from 'react-router-dom';
import Topic from './components/Topic';
import ITopic from '../../stores/content/models/ITopic';
import MetaAction from '../../stores/meta/MetaAction';
import IAction from '../../stores/IAction';
import IStore from '../../stores/IStore';
import {connect, DispatchProp} from 'react-redux';

export interface ITopicsRoutePramas {
    readonly topicId: string;
}

export interface IProps {}
interface IState {}
interface IStateToProps {
    readonly topics: ITopic[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    topics: state.contentReducer.topics,
});

class Topics extends React.Component<IProps & IStateToProps & RouteComponentProps<void> & DispatchProp<IAction<any>>, IState> {

    public componentDidMount(): void {
        this.props.dispatch(MetaAction.setMeta({title: 'Topics View'}));
    }

    public render(): JSX.Element {
        const {topics, match} = this.props;

        return (
            <div className={styles.wrapper}>
                <h1>Topics</h1>
                <ul>
                    {topics.map((model: ITopic) => (
                        <li key={model.id}>
                            <Link to={`${match.url}/${model.id}`}>{model.name}</Link>
                        </li>
                    ))}
                </ul>

                <hr />

                <Route
                    path={`${match.path}/:topicId`}
                    component={Topic}
                />
            </div>
        );
    }

}

export default connect(mapStateToProps)(Topics);
