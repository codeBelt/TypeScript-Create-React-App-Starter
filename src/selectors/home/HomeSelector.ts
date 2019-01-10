import createCachedSelector, {ParametricSelector} from 're-reselect';
import IStore from '../../stores/IStore';
import ICategoriesResponse from '../../stores/swapi/models/ICategoriesResponse';
import ICategoryMenu from './models/ICategoryMenu';
import StringUtility from '../../utilities/StringUtility';
import CategoryEnum from '../../constants/CategoryEnum';
import {SwapiModelUnion} from '../../stores/swapi/models/CategoryResponseModel';
import ICategoryDisplayItem from './models/ICategoryDisplayItem';
import ILoadMoreEntity from '../../stores/swapi/models/ILoadMoreEntity';
import ICategoryViewData from './models/ICategoryViewData';

export class HomeSelector {

    public static getCategoryMenu(currentCategory: string, categories: ICategoriesResponse | null): ICategoryMenu[] {
        if (categories === null) {
            return [];
        }

        return Object
            .keys(categories)
            .map((key: string) => {
                return {
                    isActive: key === currentCategory,
                    label: StringUtility.toTitleCase(key),
                    category: key as CategoryEnum,
                    apiEndpoint: categories[key],
                };
            });
    }

    public static getCategoryDisplayList(
        currentCategory: CategoryEnum,
        films: ILoadMoreEntity,
        people: ILoadMoreEntity,
        planets: ILoadMoreEntity,
        species: ILoadMoreEntity,
        starships: ILoadMoreEntity,
        vehicles: ILoadMoreEntity,
    ): ICategoryViewData {
        const categoryEntityMap: {[categoryEnum: string]: ILoadMoreEntity} = {
            films,
            people,
            planets,
            species,
            starships,
            vehicles,
        };
        const model: ILoadMoreEntity = categoryEntityMap[currentCategory];

        if (!model) {
            return null;
        }

        return {
            displayCount: `${model.entity.length} / ${model.totalCount}`,
            loadMoreUrl: model.loadMoreUrl,
            category: currentCategory,
            items: model.entity.ids.map((id: string | number): ICategoryDisplayItem => {
                const item: SwapiModelUnion = model.entity.entities[id];

                return {
                    id: item.id,
                    label: item.name,
                    category: item.category,
                    imageUrl: item.imageUrl,
                }
            }),
        }
    }
}

export const getCategoryMenu: ParametricSelector<IStore, CategoryEnum, ICategoryMenu[]> = createCachedSelector(
    (state: IStore, category: CategoryEnum) => category,
    (state: IStore, category: CategoryEnum) => state.swapiReducer.categories,
    HomeSelector.getCategoryMenu,
)(
    (state: IStore, cacheKey: CategoryEnum) => cacheKey || ''
);

export const getCategoryDisplayList: ParametricSelector<IStore, CategoryEnum, ICategoryViewData> = createCachedSelector(
    (state: IStore, category: CategoryEnum) => category,
    (state: IStore, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Films],
    (state: IStore, category: CategoryEnum) => state.swapiReducer[CategoryEnum.People],
    (state: IStore, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Planets],
    (state: IStore, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Species],
    (state: IStore, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Starships],
    (state: IStore, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Vehicles],
    HomeSelector.getCategoryDisplayList,
)(
    (state: IStore, cacheKey: CategoryEnum) => cacheKey
);

