const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sleepSort(arr) {
    const sorted = [];

    await Promise.all(
        arr.map(async (number) => {
            await sleep(number);
            sorted.push(number);
        })
    );

    return sorted;
}

const arr = [5, 3, 1, 3, 6, 9, 21, 9, 2, 1];

sleepSort(arr).then(console.log);

