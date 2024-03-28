import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, doc, onSnapshot, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Product } from '../../models/product.class';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    product: Product = new Product();
    products: any[] = [];
    unsubProductList: any;
    unsubProduct: any;


    constructor(public firestore: Firestore) {
        this.unsubProductList = this.productList();
    }

  
    productList() {
        return onSnapshot(this.productRef(), (list) => {
            this.products = [];
            list.forEach(element => {
                let id = element.id;
                const data = element.data() as Product;
                let product = { id, data };
               console.log(product);
                this.products.push(product);
            })
        })
    }

    productRef() {
        return collection(this.firestore, 'products')
    }

    async saveProduct(product: Product) {
        await addDoc(this.productRef(), product.toJson());
    }

    async updateProduct(productId: string, updatedProduct: Product) {
        let singleProductRef = doc(this.productRef(), productId);
        await updateDoc(singleProductRef, updatedProduct.toJson());
    }


    async deleteProduct(productId: string) {
        try {
            await deleteDoc(doc(this.firestore, 'products', productId));
            console.log("Product deleted successfully.");
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
    

    singleProductRef(colId: string, productId: string) {
        return doc(collection(this.firestore, colId), productId);
    }


    async loadProduct(productId: string) {
        const singleProductRef = doc(this.productRef(), productId);
        const docSnap = await getDoc(singleProductRef);
        if (docSnap.exists()) {
            this.product = docSnap.data() as Product;
        }
    }

    ngOnDestroy() {
        this.unsubProduct;
        this.unsubProductList;
    }
}