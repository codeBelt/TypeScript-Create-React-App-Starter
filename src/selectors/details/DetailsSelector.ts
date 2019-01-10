import createCachedSelector from 're-reselect';
import IStore from '../../stores/IStore';
import CategoryEnum from '../../constants/CategoryEnum';
import ILoadMoreEntity from '../../stores/swapi/models/ILoadMoreEntity';
import ICategoryItemsGroup from './models/ICategoryItemsGroup';
import {SwapiModelUnion} from '../../stores/swapi/models/CategoryResponseModel';
import get from 'lodash/get';
import StringUtility from '../../utilities/StringUtility';

export class DetailsSelector {

    public static getRelatedItemsForDetails(
        itemId: string,
        category: CategoryEnum,
        films: ILoadMoreEntity,
        people: ILoadMoreEntity,
        planets: ILoadMoreEntity,
        species: ILoadMoreEntity,
        starships: ILoadMoreEntity,
        vehicles: ILoadMoreEntity,
    ): ICategoryItemsGroup[] {
        const categoryEntityMap: {[categoryEnum: string]: ILoadMoreEntity} = {
            films,
            people,
            planets,
            species,
            starships,
            vehicles,
        };
        const model: SwapiModelUnion = categoryEntityMap[category].entity.entities[itemId];

        return Object
            .entries(model.neededCategoryIds)
            .map(([categoryEnum, ids]: [string, string[]]): ICategoryItemsGroup => {
                return {
                    label: StringUtility.toTitleCase(categoryEnum),
                    category: categoryEnum as CategoryEnum,
                    items: ids
                        .map((id: string): SwapiModelUnion => get(categoryEntityMap, `${categoryEnum}.entity.entities[${id}]`, null))
                        .filter(Boolean)
                };
            });
    }
}

export const getRelatedItemsForDetails = createCachedSelector(
    (state: IStore, itemId: string, category: CategoryEnum) => itemId,
    (state: IStore, itemId: string, category: CategoryEnum) => category,
    (state: IStore, itemId: string, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Films],
    (state: IStore, itemId: string, category: CategoryEnum) => state.swapiReducer[CategoryEnum.People],
    (state: IStore, itemId: string, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Planets],
    (state: IStore, itemId: string, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Species],
    (state: IStore, itemId: string, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Starships],
    (state: IStore, itemId: string, category: CategoryEnum) => state.swapiReducer[CategoryEnum.Vehicles],
    DetailsSelector.getRelatedItemsForDetails,
)(
    (state: IStore, itemId: string, category: CategoryEnum) => `${itemId}${category}`
);

