
export const getSymbolByName = (name) => {
    const symbols = {
        'Add': '+',
        'Minus': '-',
        'Multiply': '*',
        'Divide': '/'
    };

    return symbols[name] || null;
};