import { Injectable } from "@angular/core";
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, fetchSignInMethodsForEmail, signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth";



@Injectable({
    providedIn: 'root'
})

export class AuthService {
    displayName: string = '';

    constructor(private auth: Auth) { }


    async saveUser(name: string): Promise<void> {
        const user_auth: any = this.auth.currentUser;
        if (user_auth) {
            try {
                await updateProfile(user_auth, { displayName: name });
                this.displayName = user_auth.displayName;
            } catch (error) {
                console.error('Fehler bei updateDoc', error);
            }
        } else {
            console.error('Benutzer ist nicht authentifiziert');
        }
    }


    async getName() {
        const user_auth: any = this.auth.currentUser;
        if (user_auth) {
            try {
                this.displayName = user_auth.displayName;
            } catch (error) {
                console.error('Fehler bei aktualisieren des displayName', error);
            }
        }
    }

    async registerUser(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    loginUser(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    async checkEmailExistence(name: string, email: string) {
        return fetchSignInMethodsForEmail(this.auth, email);
    }

    guestLogin() {
        return signInAnonymously(this.auth);
    }

    logout() {
        return signOut(this.auth);
    }

    checkAuth() {
        return new Promise<boolean>(async (resolve, reject) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    checkAuthLoggedInAsGuest() {
        return new Promise<boolean>((resolve, reject) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    // Überprüfen Sie, ob der Benutzer anonym angemeldet ist
                    const isAnonymous = user.isAnonymous;
                    resolve(isAnonymous);
                } else {
                    resolve(false);
                }
            });
        });
    }
}