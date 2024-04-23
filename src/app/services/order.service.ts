import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, doc, onSnapshot, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Order } from '../../models/order.class';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    order: Order = new Order();
    orderId: string | any;
    orders: any[] = [];
    unsubOrderList: any;
    unsubOrder: any;
 data: any;

    constructor(public firestore: Firestore) {
        this.unsubOrderList = this.orderList();
    }


    orderList() {
        return onSnapshot(this.orderRef(), (list) => {
            this.orders = [];
            list.forEach(element => {
                let orderId = element.id;
                const data = element.data() as Order;
                let order = { orderId, data };
                // console.log(product.id);
                this.orders.push(order);
            })
        })
    }

    orderRef() {
        return collection(this.firestore, 'orders')
    }

    async saveOrder(order: Order) {
        await addDoc(this.orderRef(), order.toJson());
    }

    async updateOrder(orderId: string, updatedOrder: Order) {
        let singleProductRef = doc(this.orderRef(), orderId);
        await updateDoc(singleProductRef, updatedOrder.toJson());
    }

    async deleteOrder(orderId: string) {
        try {
            await deleteDoc(doc(this.firestore, "orders", orderId));
            console.log("Order deleted successfully.");
        } catch (error) {
            console.error("Error deleting order:", error);
            throw error;
        }
    }


    singleOrderRef(colId: string, orderId: string) {
        return doc(collection(this.firestore, colId), orderId);
    }


    async loadOrder(orderId: string) {
        const singleProductRef = doc(this.orderRef(), orderId);
        const docSnap = await getDoc(singleProductRef);
        if (docSnap.exists()) {
            this.order = docSnap.data() as Order;
        }
    }

    ngOnDestroy() {
        this.unsubOrder;
        this.unsubOrderList;
    }
}