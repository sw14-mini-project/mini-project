import { child, get } from "firebase/database";

export const getStackData = (context, dbRef) => {
    get(child(dbRef, `stack`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.toJSON());
            context.stack = snapshot.toJSON()
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export const getUserInform = (context, dbRef, uid) => {
    console.log(`users/${uid}/`)
    get(child(dbRef, `users/`)).then((snapshot) => {
        console.log(snapshot)
        if (snapshot.exists()) {
            console.log(snapshot.toJSON());
            return snapshot.toJSON()
        } else {
            console.log("No data available");
            return null
        }
    }).catch((error) => {
        console.error(error);
        return null
    });
}