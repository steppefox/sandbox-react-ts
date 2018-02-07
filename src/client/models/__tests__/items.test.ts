import { calcChances, weapons, armors } from '../items';

describe('calcChances', () => {
    it('Should return 0 for empty input', () => {
        expect(calcChances()).toBe(0);
    });

    it('Should return 0 for bad items', () => {
        const armor = armors.find((item) => item.id === 'heavy');
        const weapon = weapons.find((item) => item.id === 'book');
        expect(calcChances(armor, weapon)).toBe(0);
    });

    it('Should return 95 for some normal items', () => {
        const armor = armors.find((item) => item.id === 'leather');
        const weapon = weapons.find((item) => item.id === 'bow');
        expect(calcChances(armor, weapon)).toBe(95);
    })
});
