import { validation } from './validation';

describe.only('utility functions', () => {
    it('shoud return true', () => {
        const validationRules = {
            isRequired: true,
            isEmail: true,
            minLength: true,
            maxLength: 32,
            shoudBeEqual: true,
        }
        expect(validation('test@mail.com', validationRules, 'test@mail.com')[0]).toBeTruthy();
    })

    it('shoud return false', () => {
        const validationRules = {
            isRequired: true,
            isEmail: true,
            minLength: true,
            maxLength: true,
            shoudBeEqual: true,
        }
        expect(validation('test@mail.com', validationRules, 'test1@mail.com')[0]).toBeFalsy();
    })
})