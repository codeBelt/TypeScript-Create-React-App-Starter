import CategoryEnum from '../../../constants/CategoryEnum';

export default interface ICategoryRequest {
    readonly apiEndpoint: string;
    readonly category: CategoryEnum;
}
