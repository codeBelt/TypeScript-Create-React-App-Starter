import * as React from 'react';
import ICategoryDisplayItem from '../../../selectors/home/models/ICategoryDisplayItem';

interface IState {}
interface IProps {
    readonly item: ICategoryDisplayItem;
}

export default class CategoryItem extends React.Component<IProps, IState> {

    public static defaultProps: Partial<IProps> = {
    };

    public state: IState = {
    };

    public render(): JSX.Element {
        const {item} = this.props;

        return (
            <div>
                <img src={item.imageUrl} alt={item.label} />
                <div>
                    {item.label}
                </div>
            </div>
        );
    }

}
