
export type Publisher = {
    _id: string,
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
    _id: string,
    title: string,
    rating: number,
    review: string,
    postDate: Date
}

export type Game = {
    _id: string,
    title: string,
    year: string,
    rate: number,
    price: number,
    minPlayers?: number,
    maxPlayers: number,
    publisher: Publisher,
    reviews: Reviews[],
    minAge: number,
    designers?: string[]
}