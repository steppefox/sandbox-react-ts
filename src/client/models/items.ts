export interface IItemInterface {
    id: string,
    title: string,
    points: number,
    icon: string,
    message?: string,
    hint?: string
};

const MAX_POINTS = 20;

export const weapons: Array<IItemInterface> = [
    {
        id: 'axe',
        title: 'Axe',
        icon: require('../assets/weapons/axe.png').default,
        points: 6,
        message: ''
    },
    {
        id: 'book',
        title: 'Book',
        icon: require('../assets/weapons/book.png').default,
        points: 0,
        message: 'Zombies can\'t read'
    },
    {
        id: 'bow',
        title: 'Bow',
        icon: require('../assets/weapons/bow.png').default,
        points: 10,
        hint: 'Daryl Dixon\'s style'
    },
    {
        id: 'gun',
        title: 'Gun',
        icon: require('../assets/weapons/gun.png').default,
        points: 8,
        hint: 'Loud but deadly'
    },
    {
        id: 'knife',
        title: 'Knife',
        icon: require('../assets/weapons/knife.png').default,
        points: 5,
        message: 'The knife is nice to slice a loaf of bread, but won\'t work against  real problems'
    },
    {
        id: 'knuckles',
        title: 'Knuckles',
        icon: require('../assets/weapons/knuckles.png').default,
        points: 3,
        message: 'Close combat is the best way to be eaten faster'
    },
    {
        id: 'spear',
        title: 'Spear',
        icon: require('../assets/weapons/spear.png').default,
        points: 7,
        message: ''
    },
    {
        id: 'torch',
        title: 'Torch',
        icon: require('../assets/weapons/torch.png').default,
        points: 1,
        message: 'The torch helps zombies to see you clearly'
    }
];

export const armors: Array<IItemInterface> = [
    {
        id: 'airmax',
        title: 'Only cool AirMax sneakers',
        icon: require('../assets/armors/airmax.png').default,
        points: 1,
        message: 'You can\'t run forever'
    },
    {
        id: 'cloth',
        title: 'Fancy t-shirt and brand new jeans',
        icon: require('../assets/armors/cloth.png').default,
        points: 1,
        message: 'Zombies were pleasured to eat so nicely decorated food'
    },
    {
        id: 'handcrafted',
        title: 'Handcrafted armor from paper and sport wear',
        icon: require('../assets/armors/handcrafted.png').default,
        points: 7,
    },
    {
        id: 'heavy',
        title: 'Heavy armor',
        icon: require('../assets/armors/heavy.png').default,
        points: 0,
        message: 'Canned food'
    },
    {
        id: 'leather',
        title: 'Leather and light bulletproof west',
        icon: require('../assets/armors/leather.png').default,
        points: 9
    }
];

export function calcChances(...args: Array<IItemInterface>): number {
    const summ = args.reduce((acc, item) => item ? acc + item.points : acc, 0);
    return Math.ceil(summ / MAX_POINTS * 100);
}
