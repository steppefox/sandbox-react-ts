import * as React from 'react';
import styled from 'styled-components';
import { TextButton } from '../styles/basicElements';
import { colors, fontSize } from '../styles/variables';
import charactersImage from '../assets/characters.png';

const characterSpriteCoords = [
    '0 0',
    '-165px 0',
    '-315px 0',
    '-575px 0',
    '10px -300px',
    '-175px -300px',
    '-360px -300px',
    '-530px -300px',
    '-10px -590px',
    '-210px -590px',
    '-380px -590px',
    '-570px -590px'
];

export interface IProps {
    className?: string
}
export interface IState {
    name: string,
    editNameMode: boolean,
    characterType: number
}
export class Character extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: 'Ragnar Lothbrok',
            editNameMode: false,
            characterType: 0
        };
    }

    private _inputNameRef: HTMLInputElement;

    getName() {
        return this.state.name || 'Empty Name';
    }

    onVisibleNameClick = () => {
        this.setState({
            editNameMode: true
        }, () => {
            this._inputNameRef.focus();
        });
    }

    disableEditMode = () => {
        this.setState({
            editNameMode: false
        });
    }

    onInputBlur = () => {
        this.disableEditMode();
    }

    onInputFocus = (e:React.FocusEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const temp_value = target.value;
        target.value = '';
        target.value = temp_value;
    }

    onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const vl = e.currentTarget.value;

        this.setState({
            name: vl
        });
    }

    onFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.disableEditMode();
    }

    onPictureClick = () => {
        const currentType = this.state.characterType;
        this.setState({
            characterType: currentType >= (characterSpriteCoords.length - 1) ? 0 : currentType + 1
        });
    }

    render() {
        const { editNameMode, characterType } = this.state;

        return <div className={this.props.className}>
            <NameContainer>
                <NameForm visible={editNameMode} onSubmit={this.onFormSubmit}>
                    <input ref={(ref) => this._inputNameRef = ref}
                        value={this.state.name}
                        onChange={this.onInputChange}
                        onBlur={this.onInputBlur}
                        onFocus={this.onInputFocus}
                    />
                </NameForm>

                <div>
                    <VisibleName type="button" onClick={this.onVisibleNameClick}>
                        {this.getName()}
                    </VisibleName>
                    <Hint>Click to change your Name</Hint>
                </div>

            </NameContainer>

            <Picture type={characterType} onClick={this.onPictureClick} />
        </div>;
    }
}

const NameContainer = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
`;
const VisibleName = TextButton.extend``;
const NameForm = styled.form`
    display: ${(props: { visible: boolean }) => props.visible ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 0;

    input {
        display: block;
        width: 100%;
    }
`;

const Hint = styled.div`
    font-size: ${fontSize.small};
    color: ${colors.hint};
    margin-top: 0.5rem;
`;

const Picture = styled.div`
    background-color: #5f5854;
    background-image: url(${charactersImage});
    width: 17.5rem;
    height: 30rem;
    border-radius: 1rem;
    background-position: ${(props:{ type: number }) => {
        return characterSpriteCoords[props.type] || characterSpriteCoords[0];
    }}
`;

export default styled(Character)`
    flex: 0 0 auto;
    margin-right: 5rem;
`;
