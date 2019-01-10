import CategoryEnum from '../../../constants/CategoryEnum';

export default interface ICategoryMenu {
    readonly isActive: boolean;
    readonly label: string;
    readonly category: CategoryEnum;
    readonly apiEndpoint: string;
}
