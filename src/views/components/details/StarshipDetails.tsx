import * as React from 'react';
import StarshipModel from '../../../stores/swapi/models/StarshipModel';

interface IState {}
interface IProps {
    readonly model: StarshipModel;
}

export default class StarshipDetails extends React.Component<IProps, IState> {

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
