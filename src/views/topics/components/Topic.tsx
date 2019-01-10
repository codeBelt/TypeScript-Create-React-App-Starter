import styles from './Topic.module.scss';

import React from 'react';
import {Link, Route, RouteComponentProps} from 'react-router-dom';
import Resource from './Resource';
import ITopic from '../../../stores/content/models/ITopic';
import MetaAction from '../../../stores/meta/MetaAction';
import IAction from '../../../stores/IAction';
import IStore from '../../../stores/IStore';
import {connect, DispatchProp} from 'react-redux';
import IResource from '../../../stores/content/models/IResource';
import {ITopicsRoutePramas} from '../Topics';

export interface ITopicRoutePramas {
    readonly subId: string;
}

interface IProps {}
interface IState {}
interface IStateToProps {
    readonly topics: ITopic[];
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    topics: state.contentReducer.topics,
});

class Topic extends React.Component<IProps & IStateToProps & RouteComponentProps<ITopicsRoutePramas> & DispatchProp<IAction<any>>, IState> {

    public componentDidMount(): void {
        this.props.dispatch(MetaAction.setMeta({title: 'Topic View'}));
    }

    public render(): JSX.Element {
        const {topics, match} = this.props;
        const topic: ITopic | undefined = topics.find((model: ITopic) => model.id === match.params.topicId);

        return (
            <>
                {topic && (
                    <div className={styles.wrapper}>
                        <h2>{topic.name}</h2>
                        <p>{topic.description}</p>

                        <ul className={styles.links}>
                            {topic.resources.map((model: IResource) => (
                                <li key={model.id}>
                                    <Link to={`${match.url}/${model.id}`}>{model.name}</Link>
                                </li>
                            ))}
                        </ul>

                        <Route
                            path={`${match.path}/:subId`}
                            component={Resource}
                        />
                    </div>
                )}
                {!topic && (
                    <span>Content not found</span>
                )}
            </>
        );
    }

}

export default connect(mapStateToProps)(Topic);
