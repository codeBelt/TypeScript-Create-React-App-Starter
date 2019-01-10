import Loadable from 'react-loadable';
import AsyncLoader from '../components/AsyncLoader';
import {IProps} from './NotFound';

const loadableOptions: LoadableExport.OptionsWithoutRender<Partial<IProps>> = {
    loader: () => import(/* webpackChunkName: "NotFound" */ './NotFound'),
    loading: AsyncLoader,
};

export default Loadable(loadableOptions);
