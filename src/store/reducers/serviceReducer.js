import * as actiontypes from '../actions/actionTypes';

const initialstate={
    services:[

    ],
    city:"Kolkata",
    serve:"",    
    orders:{},
    total:null,
    success:false,

    options:[

    ],
    optionSelect:[

    ]

    
    
}

const serviceReducer=(state=initialstate,action)=>{
    switch(action.type){
        case actiontypes.OPTIONS_HANDLER:
            const newOrders=state.options
            action.data.forEach(doc=>{
                newOrders.push({value:doc.id,label:doc.id})
            })
            return{
                ...state,
                options:newOrders
            }
        case actiontypes.OPTIONSELECT_HANDLER:
            const orders=state.optionSelect
            action.data.forEach(doc=>{
                orders.push({value:doc.id,label:doc.id})
            })
            return{
                ...state,
                optionSelect:orders
            }
        case actiontypes.SELECT_CITY:
            return{
                ...state,
                services:action.service,
                city:action.city
            }
        case actiontypes.SELECT_SERVICE:
            return{
                ...state,
                serve:action.serve
            }
            
        case actiontypes.CREATE_SERVICE:

            console.log("created proj",action.service);
            return{
                ...state,
                services:action.service
                
            }
        case actiontypes.CREATE_SERVICE_ERROR:
            console.log("Create service Error",action.err);
            break;
            case actiontypes.UPDATE_SERVICE:

                console.log("created proj",action.service);
                return{
                    ...state,
                    services:action.service
                    
                }
            case actiontypes.UPDATE_SERVICE_ERROR:
                console.log("Create service Error",action.err);
                break;
        case actiontypes.DELETE_SERVICE_SUCCESS:
            console.log("Deleted successfully");
            return {
                ...state,
                services:null
                
            };
        case actiontypes.DELETE_SERVICE_ERROR:
            console.log("DELETE ERROR",action.err);
            break;
        case actiontypes.GET_SERVICES_INIT:
            console.log("Init service");
            break;
        case actiontypes.GET_SERVICES:
            console.log("Services");
            break;
        case actiontypes.ADD_TO_CART:
            console.log(action.name)
            const newOrder={
                ...state.orders,
                [action.name]:1,
                success:false,
                
            }
            const newAddTotal=state.total+parseInt(action.subtype.price)
                return{
                ...state,
                orders:newOrder,
                total:newAddTotal

            }
        case actiontypes.ADD_ORDER:
            const add=state.orders[action.name]+1
            const addOrder={
                ...state.orders,
                [action.name]:add
            }
            const newAdd=state.total+parseInt(action.subtype.price)
            return{
                ...state,
                orders:addOrder,
                total:newAdd
            }
        case actiontypes.SUB_ORDER:
            const sub=state.orders[action.name]-1
            const subOrder={
                ...state.orders,
                [action.name]:sub
            }
            const newSub=state.total-parseInt(action.subtype.price)
            return{
                ...state,
                orders:subOrder,
                total:newSub
            }
        case actiontypes.RESET_ORDER:
            return{
                ...state,
                orders:{},
                total:null
            }
        case actiontypes.ADD_SERVICE:
            console.log("Added to cities",action.data);
            return{
                ...state,
                
            }
        case actiontypes.ORDER_SUCCESS:
            console.log("Added to Orders",action.data)
            return{
                ...state,
                success:true
            }
        case actiontypes.ORDER_UNSUCCESS:
            console.log("Added to Orders",action.data)
            return{
                ...state,
                success:false,
            }
            
        default:
            return state;
    }
}

export default serviceReducer;