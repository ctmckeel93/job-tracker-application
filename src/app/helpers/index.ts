export const arrayFromRows = (rows:any) => {

    const result = [];

    for (const row of rows) {
        result.push(row);
    }

    return result;
}

export const orderByCreatedAt = (a:{created_at: Date},b:{created_at: Date}) => {
    console.log(a)
    console.log(b)
    if (a.created_at > b.created_at) {
        return -1
    } else if (a.created_at == b.created_at) {
        return 0;
    } else {
        return 1;
    }
}