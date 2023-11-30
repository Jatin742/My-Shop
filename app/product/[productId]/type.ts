export interface CartProductType {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number,
}

export interface SelectedImgType {
    color: string;
    colorCode: string;
    image: string;
}