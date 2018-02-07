import * as React from 'react';
import styled from 'styled-components';
import { IItemInterface, weapons, armors, calcChances } from '../models/items';
import { colors, fontSize } from '../styles/variables';
import { MouseEvent } from 'react';

export interface IProps {
    className?: string
}

export interface IState {
    selected: {
        weapons: IItemInterface | null,
        armors: IItemInterface | null
    }
}

const GOOD_CHANCE_LIMIT:number = 50;

type TItemsGroup = 'weapons' | 'armors' | null;

export class Items extends React.Component<IProps, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selected: {
                weapons: null,
                armors: null
            }
        }
    }

    onClickSelect(e: React.MouseEvent<HTMLButtonElement>, type: TItemsGroup, vl: IItemInterface) {
        vl = this.state.selected[type] === vl ? null : vl;

        this.setState({
            selected: {
                ...this.state.selected,
                [type]: vl
            }
        });
    }

    buildControls(type: TItemsGroup, list: Array<IItemInterface>): Array<JSX.Element> {
        const selected = this.state.selected[type];

        return list.map((item, itemIndex) => {
            return <div key={itemIndex}>
                <SItemButton selected={selected && selected.id === item.id}
                    type="button"
                    onClick={(e) => this.onClickSelect(e, type, item)}
                >
                    {item.icon && <img src={item.icon} />}
                    {item.title}
                </SItemButton>
            </div>
        });
    }

    collectMessages(surviveChances:number):Array<string> {
        if (surviveChances < GOOD_CHANCE_LIMIT) {
            const selectedItems = this.state.selected;
            return Object.keys(selectedItems).reduce((acc, key: TItemsGroup) => {
                const item = selectedItems[key];
                if (item && item.message) {
                    acc.push(item.message);
                }

                return acc;
            }, []);
        }

        return [];
    }

    render() {
        const surviveChances = calcChances(this.state.selected.weapons, this.state.selected.armors);

        return <div className={this.props.className}>
            <STitle good={surviveChances >= GOOD_CHANCE_LIMIT}>
                Your survival chances around: <span>{surviveChances} %</span>
                <STitleMessages>
                    {this.collectMessages(surviveChances).map((message, index) =>
                        <div key={index}>{message}</div>
                    )}
                </STitleMessages>
            </STitle>
            <SContainer>
                <div>
                    {this.buildControls('weapons', weapons)}
                </div>
                <div>
                    {this.buildControls('armors', armors)}
                </div>
            </SContainer>
        </div>;
    }
}

const SContainer = styled.div`
    display: flex;

    & > div {
        margin-right: 0.5rem;
    }
`;

const STitle = styled.div`
    height: 5.3rem;

    span {
        color: ${(props: { good: boolean }) => props.good ? 'green' : 'red'};
    }
`;

const STitleMessages = styled.div`
    font-size: ${fontSize.small};
    color: ${colors.hint};
`;

const SItemButton = styled.button`
    display: block;
    cursor: pointer;
    width: 100%;
    text-align: left;
    position: relative;
    height: 4.2rem;
    padding: 1rem 1rem 1rem 5rem;
    border: none;
    outline: none;
    background-color: ${(props: { selected: boolean }) => props.selected ? '#a7978e' : colors.background};
    margin-bottom: 0.5rem;
    transition: background-color .3s linear;

    &:focus {
        background-color: #a7978e;
    }

    img {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
    }

    &:active {
        background-color: #a7978e;
    }
`;

export default styled(Items)`
    flex: 1 1 auto;
`;
