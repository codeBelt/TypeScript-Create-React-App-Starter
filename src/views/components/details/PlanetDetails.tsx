import * as React from 'react';
import PlanetModel from '../../../stores/swapi/models/PlanetModel';

interface IState {}
interface IProps {
    readonly model: PlanetModel;
}

export default class PlanetDetails extends React.Component<IProps, IState> {

    public static defaultProps: Partial<IProps> = {
    };

    public state: IState = {
    };

    public render(): JSX.Element {
        const {model} = this.props;

        return (
            <div>
                <p>{model.name}</p>
            </div>
        )
    }

}
