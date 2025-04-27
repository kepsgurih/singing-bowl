export function rupiahFormat(amount: number): string {
    return `Rp${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}