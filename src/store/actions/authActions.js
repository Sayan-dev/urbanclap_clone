import * as actiontypes from "./actionTypes";

export const logIn=(data)=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            data.email,
            data.password
        ).then(()=>{
            dispatch({
                type:actiontypes.LOGIN_SUCCESS
            })
        }).catch((err)=>{
            dispatch({
                type:actiontypes.LOGIN_FAIL,
                err:err
            });
        })
    }
}

export const logOut=()=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signOut()
        .then(()=>{
            dispatch({
                type:actiontypes.LOGOUT,
            })
        })


    }
}

export const createUsr=(newUsr)=>{
    return (dispatch,getState,{getFirestore,getFirebase})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUsr.email, 
            newUsr.password
            ).then((response)=>{
                // dispatch({
                //     type:actiontypes.CREATE_USER,
                //     response:response
                // })
                var user = firebase.auth().currentUser;

                user.sendEmailVerification().then(function() {

                // Email sent.
                    console.log("Email verified")
                }).catch((error)=> {
                // An error happened.
                console.log(error)

                });
                return firestore.collection("users").doc(response.user.uid).set({
                    firstName:newUsr.firstName,
                    lastName:newUsr.lastName,
                    email:newUsr.email,
                    initials:newUsr.firstName[0]+newUsr.lastName[0],
                    isAdmin:false
                }
                    ).then(()=>{
                        dispatch({
                            type:actiontypes.CREATE_USER_SUCCESS,
                        })
                        
                    }).catch(err=>{
                        dispatch({
                            type:actiontypes.CREATE_USER_ERROR,
                            err
                        })
                    })
                
                
            }).catch(err=>{
                dispatch({
                    type:actiontypes.CREATE_USER_ERROR,
                    err:err
                })
            })

    
    }
}
export const createWorker=(newWrkr)=>{
    return (dispatch,getState,{getFirestore,getFirebase})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newWrkr.email, 
            newWrkr.password
            ).then((response)=>{
                // dispatch({
                //     type:actiontypes.CREATE_USER,
                //     response:response
                // })
                var user = firebase.auth().currentUser;

                user.sendEmailVerification().then(function() {

                // Email sent.
                    console.log("Email verified")
                }).catch((error)=> {
                // An error happened.
                console.log(error)

                });
                return firestore.collection("workers").doc(response.user.uid).set({
                    firstName:newWrkr.firstName,
                    lastName:newWrkr.lastName,
                    initials:newWrkr.firstName[0]+newWrkr.lastName[0],
                    booked:false,
                    city:newWrkr.city,
                    coordinates:newWrkr.coordinates,
                    contact:parseInt(newWrkr.contact),
                    service:newWrkr.service,
                    email:newWrkr.email,
                    isAdmin:false

                }
                    ).then(()=>{
                        dispatch({
                            type:actiontypes.CREATE_WORKER_SUCCESS,
                        })
                        
                    }).catch(err=>{
                        dispatch({
                            type:actiontypes.CREATE_WORKER_ERROR,
                            err
                        })
                    })

            }).catch(err=>{
                dispatch({
                    type:actiontypes.CREATE_USER_ERROR,
                    err:err
                })
            })

    
    }
}

