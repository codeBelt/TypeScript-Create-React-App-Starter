/**
 * The Entity State is a predefined generic interface for a given entity collection
 *
 * ids: An array of all the primary ids in the collection
 * entities: A dictionary of entities in the collection indexed by the primary id
 * length: The total count of all items
 */
export default interface IEntityState <T> {
    ids: (string | number)[];
    entities: { [id: string]: T };
    length: number;
}
