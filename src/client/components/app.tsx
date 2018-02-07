import * as React from 'react';
import styled from 'styled-components';
import Character from './character';
import Items from './items';

export interface IProps {
    className?: string
}
export interface IState {}
export class App extends React.Component<IProps, IState> {
    render() {
        return <div className={this.props.className}>
            <h1>Zombie Apocalypse Survival Chance Calculator</h1>
            <Container>
                <Character />
                <Items />
            </Container>
        </div>;
    }
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default styled(App)`
    width: 128rem;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
`;
