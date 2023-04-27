import { child, get } from "firebase/database";

export const getStackData = async (context, dbRef) => {
    await get(child(dbRef, `stack`)).then((snapshot) => {
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