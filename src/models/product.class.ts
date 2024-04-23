export class Product {
    productName: string;
    productPrice: string;
    typeOfOrder: string;
    id: string;
    data: any;


    constructor(obj?: any) {
        this.productName = obj ? obj.productName : '';
        this.productPrice = obj ? obj.productPrice : '';
        this.typeOfOrder = obj ? obj.typeOfOrder : '';
        this.id = obj ? obj.id : '';

    }

    public toJson() {
        return {
            productName: this.productName,
            productPrice: this.productPrice,
            typeOfOrder: this.typeOfOrder,
        }
    }


}