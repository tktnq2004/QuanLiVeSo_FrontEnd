
const getWeekRange = () => {
    const today = new Date();
    const day = today.getDay();

    const diffStart = day === 0 ? -6 : 1 - day;
    const start = new Date(today);
    start.setDate(today.getDate() + diffStart);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return {
        tuNgay: start.toISOString().split('T')[0],
        denNgay: end.toISOString().split('T')[0],
    };
};
export default getWeekRange;