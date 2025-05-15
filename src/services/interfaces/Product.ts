export interface Product {
    name: string,
    description: string,
    photo: string,
    category: string[],
    subcategory: { [key: string]: string[] },
    price: number,
    quantity: number,
}