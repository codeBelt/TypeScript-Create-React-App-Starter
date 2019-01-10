import * as React from 'react';
import PersonModel from '../../../stores/swapi/models/PersonModel';

interface IState {}
interface IProps {
    readonly model: PersonModel;
}

export default class PersonDetails extends React.Component<IProps, IState> {

    public static defaultProps: Partial<IProps> = {
    };

    public state: IState = {
    };

    public render(): JSX.Element {
        const {model} = this.props;

        return (
            <ul>
                {/*<li><img src={model.imageUrl}/></li>*/}
                <li>{model.name}</li>
            </ul>
        )
    }

}
