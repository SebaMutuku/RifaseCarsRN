import Firebase from "../utils/Firebase";
import {User} from "../utils/AppInterfaces";


export function queryFromFirestoreWithCondition(collection: string, queryParam: any) {
    return Firebase.firestore().collection(collection).where(queryParam, "==", queryParam).get();
}

export function loginWithUserNameAndPassword(username: string, password: string) {
    return Firebase.firestore().collection("users").where("username", "==", username).where("password", "==", password).get();
}

export function getAllWithCondition(collection: string, orderBy: any) {
    return Firebase.firestore().collection(collection).orderBy(orderBy).get();
}

export function getAll(collection: string) {
    return Firebase.firestore().collection(collection).get();
}

export function insert(collection: string, document: string, data: User) {
    return Firebase.firestore().collection(collection).add(data);
}

export function update(collection: string, document: string) {
    return Firebase.firestore().collection(collection).doc(document).update({});
}
