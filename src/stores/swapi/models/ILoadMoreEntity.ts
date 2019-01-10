import IEntityState from '../../../models/IEntityState';
import {SwapiModelUnion} from './CategoryResponseModel';

export default interface ILoadMoreEntity {
    readonly totalCount: number;
    readonly loadMoreUrl: string;
    readonly entity: IEntityState<SwapiModelUnion> ;
}
