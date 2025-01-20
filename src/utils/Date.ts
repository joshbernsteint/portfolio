
const months : string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function getMonthYear(timestamp: number) : string{
    const d = new Date(timestamp);
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
}