import * as React from 'react';
import VehicleModel from '../../../stores/swapi/models/VehicleModel';

interface IState {}
interface IProps {
    readonly model: VehicleModel;
}

export default class VehicleDetails extends React.Component<IProps, IState> {

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
