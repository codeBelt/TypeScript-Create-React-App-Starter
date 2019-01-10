import React from 'react';
import MetaAction from '../../stores/meta/MetaAction';
import IAction from '../../stores/IAction';
import IStore from '../../stores/IStore';
import {connect, DispatchProp} from 'react-redux';
import SwapiAction from '../../stores/swapi/SwapiAction';
import CategoryMenu from './components/CategoryMenu';
import CategoryDisplay from './components/CategoryDisplay';

export interface IProps {}
interface IState {}
interface IStateToProps {
    readonly currentCategory: string,
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    currentCategory: state.swapiReducer.currentCategory,
});

class Home extends React.PureComponent<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {

    public componentDidMount(): void {
        this.props.dispatch(MetaAction.setMeta({title: 'Home View'}));
        this.props.dispatch(SwapiAction.loadCategories());
    }

    public render(): JSX.Element {
        return (
            <div className="homeLayout">
                <article className="homeLayout-content">
                    {!this.props.currentCategory && (
                        <div>Select a category</div>
                    )}
                    {this.props.currentCategory && (
                        <CategoryDisplay/>
                    )}
                </article>
                <aside className="homeLayout-links">
                    <CategoryMenu />
                </aside>
                <aside className="homeLayout-info">
                    Ads
                </aside>
                <footer className="homeLayout-footer">
                    Footer
                </footer>
            </div>
        );
    }

}

export default connect(mapStateToProps)(Home);
