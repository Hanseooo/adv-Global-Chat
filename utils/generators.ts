

export const generateDate = (month: number | null | undefined, day: number | null | undefined, year: number | null | undefined) => {
    if (!month || !day || !year) {
        return
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[month - 1]} ${day}, ${year}`;
}

