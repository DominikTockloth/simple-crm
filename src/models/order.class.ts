export class Order {
    dateOfOrder: Date;
    amount: number;
    product: string;
    price: string;
    orderId: string;
    userId: string;
  data: any;
    
    constructor(obj?: any) {
        this.dateOfOrder = obj ? obj.dateOfOrder : '';
        this.amount = obj ? obj.amount : '';
        this.product = obj ? obj.product : '';
        this.price = obj ? obj.price : '';
        this.orderId = obj ? obj.orderId : '';
        this.userId = obj ? obj.userId : '';
    }

    public toJson() {
        return {
            dateOfOrder: this.dateOfOrder,
            amount: this.amount,
            product: this.product,
            price: this.price,
            userId: this.userId
        }
    }
}