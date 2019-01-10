import IEntityState from '../models/IEntityState';

export default class EntityUtility {

    private static _defaultEntityState: IEntityState<any> = {
        ids: [],
        entities: {},
        length: 0,
    };

    public static add<T>(list: T[], propertyName: string, existingEntity: IEntityState<T> = null): IEntityState<T> {
        let entityState: IEntityState<T> = existingEntity || EntityUtility._defaultEntityState;

        entityState = {
            ids: [...entityState.ids],
            entities: {...entityState.entities},
            length: entityState.length,
        };

        return list.reduce((entity: IEntityState<T>, currentItem: T) => {
            const propertyValueForId: string | number = currentItem[propertyName];

            entity.ids = entity.ids.includes(propertyValueForId) ? entity.ids : [...entity.ids, propertyValueForId];
            entity.entities[propertyValueForId] = currentItem;
            entity.length = entity.ids.length;

            return entity;
        }, entityState);
    }

}
