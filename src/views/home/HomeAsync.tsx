import Loadable from 'react-loadable';
import AsyncLoader from '../components/AsyncLoader';
import {IProps} from './Home';

const loadableOptions: LoadableExport.OptionsWithoutRender<Partial<IProps>> = {
    loader: () => import(/* webpackChunkName: "Home" */ './Home'),
    loading: AsyncLoader,
};

export default Loadable(loadableOptions);
