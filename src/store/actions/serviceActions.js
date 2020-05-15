import * as actiontypes from './actionTypes';
import axios from 'axios';

export const optionsHandler=()=>{
    return (dispatch,getState,{getFirestore,getFirebase})=>{
    const fireStore=getFirestore();
    fireStore.collection("cities").get()
    .then(res=>{
        const data=res

        dispatch({
            type:actiontypes.OPTIONS_HANDLER,
            data

        })
    })
}
}
export const optionSelectHandler=()=>{
    return (dispatch,getState,{getFirestore,getFirebase})=>{
    const fireStore=getFirestore();
    fireStore.collection("services").get()
    .then(res=>{
        const data=res

        dispatch({
            type:actiontypes.OPTIONSELECT_HANDLER,
            data

        })
    })
}
}
export const selectCity=(city)=>{

    return (dispatch,getState,{getFirestore,getFirebase})=>{
        const fireStore=getFirestore();
        fireStore.collection("cities").doc(city).get()
        .then(res=>{
            const data=res.data()
            dispatch({
                type:actiontypes.SELECT_CITY,
                service:data.service,
                city:city

            })
        })
       
        
    }
}
export const selectService=(serve)=>{

    return (dispatch,getState,{getFirestore,getFirebase})=>{
        const fireStore=getFirestore();
        fireStore.collection("services").doc(serve).get()
        .then(res=>{
            const data=res.data()
            dispatch({
                type:actiontypes.SELECT_SERVICE,
                service:data.service,
                serve

            })
        })
       
        
    }
}


export const createService=(service)=>{
    return (dispatch,getState,{getFirestore,getFirebase})=>{

        const fireStore=getFirestore();
        const newService={...service}
        newService.tag=service.tag.split(",");
        fireStore.collection("services").doc(service.name).set({
            ...newService,
        }).then(()=>{
            dispatch({
                type:actiontypes.CREATE_SERVICE,
                service:newService
            })
        }).catch((err)=>{
            dispatch({
                type:actiontypes.CREATE_SERVICE_ERROR,err
            })
        });
        
    }
}
export const updateService=(service,doc)=>{
    return (dispatch,getState,{getFirestore,getFirebase})=>{

        const fireStore=getFirestore();
        const newService={...service}
        
        fireStore.collection("services").doc(doc).update({
            ...newService,
        }).then(()=>{
            dispatch({
                type:actiontypes.UPDATE_SERVICE,
                service:newService
            })
        }).catch((err)=>{
            dispatch({
                type:actiontypes.UPDATE_SERVICE_ERROR,err
            })
        });
        
    }
}

export const getServices=(services)=>{
    return{
        type:actiontypes.GET_SERVICES,
        services:services
    }
}

export const getServicesInit=()=>{
    return dispatch=>{
        
            

        }
    
}

export const deleteService=(id)=>{
    return (dispatch,getState,{getFirestore,getFirebase})=>{

        const fireStore=getFirestore();
        // const newService={...service}
        // newService.tag=service.tag.split(" , "||","||", "||" ,");
        // fireStore.collection("cities").doc(id).delete()
        // .then((response)=>{
        //     console.log(response);
        //     dispatch({
        //         type:actiontypes.DELETE_SERVICE_SUCCESS,
        //     })
        // }).catch((err)=>{
        //     dispatch({
        //         type:actiontypes.DELETE_SERVICE_ERROR,err
        //     })
        // });

        fireStore.collection("services").doc(id).delete()
        .then((response)=>{
            console.log(response);
            dispatch({
                type:actiontypes.DELETE_SERVICE_SUCCESS,
            })
        }).catch((err)=>{
            dispatch({
                type:actiontypes.DELETE_SERVICE_ERROR,err
            })
        });
        
    }
}


export const serviceSpecify=(service)=>{
    return (dispatch,getState,{getFirestore,getFirebase})=>{

        const fireStore=getFirestore();
        const newService={...service}
        newService.tag=service.tag.split(",");
        fireStore.collection("services").add({
            ...newService,
        }).then(()=>{
            dispatch({
                type:actiontypes.CREATE_SERVICE,
                service:newService
            })
        }).catch((err)=>{
            dispatch({
                type:actiontypes.CREATE_SERVICE_ERROR,err
            })
        });
        
    }
}


export const addToCart=(name,subtype)=>{
    return{
        type:actiontypes.ADD_TO_CART,
        name,
        subtype
    }
}
export const addOrder=(name,subtype)=>{
    return{
        type:actiontypes.ADD_ORDER,
        name,
        subtype
    }
}
export const subOrder=(name,subtype)=>{
    return{
        type:actiontypes.SUB_ORDER,
        name,
        subtype
    }
}
export const resetOrder=(name,subtype)=>{
    return{
        type:actiontypes.RESET_ORDER,
        
    }
}

export const addService=(service)=>{
    return (dispatch)=>{
        return axios.post("https://us-central1-app-clone-42d4a.cloudfunctions.net/addservice",{
            tag:service.tag.split(","),
            name:service.name,
            cities:service.cities
        })
        .then(data=>{
            dispatch({
                type:actiontypes.ADD_SERVICE,
                data
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const orderSuccess=(details)=>{
    return (dispatch)=>{
        return axios.post("http://localhost:5000/app-clone-42d4a/us-central1/ordersuccess",{
            ...details
        })
        .then(data=>{
            
            
                dispatch({
                    type:actiontypes.ORDER_SUCCESS,
                    data
                })
            //     
            
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type:actiontypes.ORDER_SUCCESS,
                err
            })
        })
    }
}