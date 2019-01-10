import React from 'react';
import {SwapiModelUnion} from '../stores/swapi/models/CategoryResponseModel';
import CategoryEnum from '../constants/CategoryEnum';
import PersonDetails from '../views/components/details/PersonDetails';
import PersonModel from '../stores/swapi/models/PersonModel';
import VehicleDetails from '../views/components/details/VehicleDetails';
import VehicleModel from '../stores/swapi/models/VehicleModel';
import StarshipDetails from '../views/components/details/StarshipDetails';
import StarshipModel from '../stores/swapi/models/StarshipModel';
import SpeciesDetails from '../views/components/details/SpeciesDetails';
import SpeciesModel from '../stores/swapi/models/SpeciesModel';
import PlanetDetails from '../views/components/details/PlanetDetails';
import PlanetModel from '../stores/swapi/models/PlanetModel';
import FilmDetails from '../views/components/details/FilmDetails';
import FilmModel from '../stores/swapi/models/FilmModel';

export default class CategoryItemFactory {

    public static create(model: SwapiModelUnion): JSX.Element {
        const map: {[categoryEnum: string]: JSX.Element} = {
            [CategoryEnum.People]: <PersonDetails model={model as PersonModel} />,
            [CategoryEnum.Vehicles]: <VehicleDetails model={model as VehicleModel} />,
            [CategoryEnum.Starships]: <StarshipDetails model={model as StarshipModel} />,
            [CategoryEnum.Species]: <SpeciesDetails model={model as SpeciesModel} />,
            [CategoryEnum.Planets]: <PlanetDetails model={model as PlanetModel} />,
            [CategoryEnum.Films]: <FilmDetails model={model as FilmModel} />,
        };

        return map[model.category];
    }

}
