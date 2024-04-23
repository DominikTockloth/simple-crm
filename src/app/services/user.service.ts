import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, doc, onSnapshot, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    user: User = new User();
    users: any[] = [];
    unsubUserList: any;
    unsubUser: any;


    constructor(public firestore: Firestore) {
        this.unsubUserList = this.userList();
    }

    userList() {
        return onSnapshot(this.userRef(), (list) => {
            this.users = [];
            list.forEach(element => {
                let id = element.id;
                let data = element.data();
                let user = { id, data };
                this.users.push(user);
            })
        })
    }

    userRef() {
        return collection(this.firestore, 'users')
    }

    async saveUser(user: User) {
        await addDoc(this.userRef(), user.toJson());
    }

    async updateUser(userId: string, updatedUser: User) {
        let singleUserRef = doc(this.userRef(), userId);
        await updateDoc(singleUserRef, updatedUser.toJson());
    }

    async deleteUser(userId: string) {
        try {
            await deleteDoc(doc(this.firestore, "users", userId));
            console.log("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    singleUserRef(colId: string, userId: string) {
        return doc(collection(this.firestore, colId), userId);
    }


    async loadUser(userId: string) {
        const singleUserRef = doc(this.userRef(), userId);
        const docSnap = await getDoc(singleUserRef);
        if (docSnap.exists()) {
            this.user = docSnap.data() as User;
        }
    }

    ngOnDestroy() {
        this.unsubUser;
        this.unsubUserList;
    }
}
