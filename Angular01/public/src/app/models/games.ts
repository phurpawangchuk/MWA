
export type Publisher = {
    name: string,
    country: string,
    establish: string
    location: {
        coordinates: [
            lng: string,
            lat: string
        ]
    }
}
export type Reviews = {
    title: string,
    rating: number,
    review: string,
    postDate: Date
}

export type Game = {
    title: string,
    year: string,
    rate: string,
    price: number,
    minPlayer?: number,
    maxPlayer: number,
    publisher: Publisher,
    reviews: Reviews[],
    minAge: number,
    designers?: string[]
}

