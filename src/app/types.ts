export interface IGame {
    id: number,
    uuid: string,
    name: string,
    gambar: string,
    video: string,
    developer: string,
    harga: number,
    deskripsi: string,
    total_dibeli: number,
    genre: string,
    tahun_rilis: string,
    download_link: string,
    createdAt: string,
    updatedAt: string
}

export interface ICartGameItem {
    id: number
    uuid?: string
    name: string
    price: number
    genre: string
    picture: string
    description: string
    quantity: number
}