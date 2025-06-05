export function runSimulation(goldPerDay: number, days: number): number []{
    const result: number[] = [];
    let total = 0;
    for (let i = 1; i<= days; i++){
        total += goldPerDay;
        result.push(total);
    }
    return result;
}