import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { getDocs } from "firebase/firestore";
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
        this.unsubUserList = this. userList();
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

    async updateUser(userId: string) {
        let singleUserRef = doc(this.userRef(), userId);
        await updateDoc(singleUserRef, {})
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

/*
    getAllUsers() {
        return onSnapshot(this.userRef(), (list) => {
            this.users = [];
            list.forEach(element => {
                let userId = element.id;
                let userData = element.data();
                let user = { userId, userData }
                //console.log(user);
                this.users.push(user);
            })
        })
    }
*/