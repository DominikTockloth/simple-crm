import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, doc, onSnapshot } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    user: User = new User();
    users: any[] = [];
    unsubUserList: any;
    unsubUser: any;


    constructor(private firestore: Firestore) {
        this.unsubUserList = this.userList()
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

    async saveUser(user: User) {
        await addDoc(this.userRef(), user.toJson());
    }

    userRef() {
        return collection(this.firestore, 'users')
    }

    async loadUser(userid: string): Promise<void> {
        const singleUserRef = doc(this.userRef(), userid);
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