export const required = (value) => {
    return value ? '' : 'Required';
};

export const isNumber = (value) => {
    return isNaN(value)
        ? 'Must be number'
        : '';
};