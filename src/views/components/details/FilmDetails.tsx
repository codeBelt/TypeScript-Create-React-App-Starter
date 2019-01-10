import * as React from 'react';
import FilmModel from '../../../stores/swapi/models/FilmModel';

interface IState {}
interface IProps {
    readonly model: FilmModel;
}

export default class FilmDetails extends React.Component<IProps, IState> {

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
