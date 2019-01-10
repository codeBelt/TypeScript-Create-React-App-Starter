import CategoryEnum from '../../../constants/CategoryEnum';

export default interface IDetailsRequest {
    readonly itemId: string;
    readonly category: CategoryEnum;
}
