const formatCurrency = (number) => {

    return Number(number || 0)
        .toLocaleString('vi-VN');
};

export default formatCurrency;