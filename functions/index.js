const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const stripe = require('stripe')('sk_test_6gI4cHhfYABTcxjAuDvHX6VS00VbwBPIJF');
const nodemailer=require('nodemailer');

const cors = require('cors')({
  origin: true,
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app-clone-42d4a.firebaseio.com"
});


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'testappclone123@gmail.com',
         pass: 'urbanclone'
     }
 });


const db=admin.firestore();



exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getPaymentIntent=functions.https.onRequest((req,res)=>{
  cors(req,res,async()=>{
    if (req.method === 'OPTIONS') {
      htmlRes = HttpResponse()
      htmlRes['Access-Control-Allow-Origin']='*' // or your not origin domain
      htmlRes['Access-Control-Allow-Methods']='*' // or POST, GET, PUT, DELETE
      htmlRes['Access-Control-Allow-Headers']='*' // Content-Type, X-REQUEST
    }
  
  if(req.method==="POST"){
    


    try {
      const {id,amount}=req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount:amount*100,
        currency: 'inr',
        payment_method:id,
        confirm:true
  
      });
      return res.send({client_secret:paymentIntent.client_secret});
  
      
    } catch (error) {
      return res.status(500).send(error);
    }

    
  }else{
    return res.status(500).send("Error on Post Request")
  }
})
});

exports.getService=functions.https.onRequest((req,res)=>{
  cors(req,res,async()=>{
    if(req.method==="POST"){
      if (req.method === 'OPTIONS') {
        htmlRes = HttpResponse()
        htmlRes['Access-Control-Allow-Origin']='*' // or your not origin domain
        htmlRes['Access-Control-Allow-Methods']='*' // or POST, GET, PUT, DELETE
        htmlRes['Access-Control-Allow-Headers']='*' // Content-Type, X-REQUEST
      }
      try{
        const data=req.body
        const doc=await db.collection("services").doc(data.name).get();
        //console.log(doc.data());
        res.send(doc.data());

      }
      catch(e){
           console.log("Error",e);
    }}else{
      
        res.status(500).send("Error on Get Request")
      
    }
  })
})
exports.workerassigned=functions.https.onRequest((req,res)=>{
  cors(req,res,async ()=>{
    if (req.method === 'OPTIONS') {
      htmlRes = HttpResponse()
      htmlRes['Access-Control-Allow-Origin']='*' // or your not origin domain
      htmlRes['Access-Control-Allow-Methods']='*' // or POST, GET, PUT, DELETE
      htmlRes['Access-Control-Allow-Headers']='*' // Content-Type, X-REQUEST
    }
    if(req.method==="POST"){
      try{
        const data=req.body;
        
          const resp=await db.collection("workers").where("service","==",data.name).get()
          const assignee={}
          const refer={}
          const haversine=(lat1,lon1,lat2,lon2)=>{
            const R = 6371e3; // metres
                const φ1 = lat1 * Math.PI/180; // φ, λ in radians
                const φ2 = lat2 * Math.PI/180;
                const Δφ = (lat2-lat1) * Math.PI/180;
                const Δλ = (lon2-lon1) * Math.PI/180;
    
                const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                          Math.cos(φ1) * Math.cos(φ2) *
                          Math.sin(Δλ/2) * Math.sin(Δλ/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
                const d = R * c; // in metres
                return d
          }
          resp.forEach(doc=>{
            if(doc.data().city===data.city){
              if(doc.data().booked===false){
  
                
                refer[doc.id]=doc.data()
              }
          }
          })
          let distance=5000;
          let index=0;
          const lat1=data.coords.lat,lon1=data.coords.lng;
          Object.keys(refer).forEach((key,i)=>{
            const wrkr=refer[key];
            let lat2=wrkr.coordinates.lat,lon2=wrkr.coordinates.lng;
            let dist=haversine(lat1,lon1,lat2,lon2);
            if(dist<distance){
              distance=dist;
            }
            
  
          })
          Object.keys(refer).forEach((key,i)=>{
            const wrkr=refer[key];
            let lat2=wrkr.coordinates.lat,lon2=wrkr.coordinates.lng;
            let dist=haversine(lat1,lon1,lat2,lon2);
            if(dist===distance){
              assignee[key]=refer[key]
            }
            
  
          })
          console.log("This is the assignee:",assignee);
          const keys=Object.keys(assignee)
          const len=keys.length
  
          const random=Math.floor(Math.random() * len)
          assignee[keys[random]].assigned.push({
            order:data.orders,
              date:data.startDate,
              time:data.time,
              user:data.usrId,
              coords:data.coords,
              address:data.address,
              total:data.total
          })
          
            const upd=await db.collection("workers").doc(keys[random]).update({
              ...assignee[keys[random]]
            })
          
            return res.send(upd);
  
        // return await db.collection("workers").doc(keys[random]).update({
        //   ...assignee[keys[random]]
        // })
            

         
          
        
      
      
    }
    catch(e){
      res.status(500).send("A problem occured")

    }
    
      // const body=req.body;
    }else{
      res.status(500).send("ERROR ON POST REQUEST")
    }

  })
})






exports.ordersuccess=functions.https.onRequest((req,res)=>{
  
  cors(req, res, async () => {
    // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    // let format = req.query.format;
    // // [END readQueryParam]
    // // Reading date format from request body query parameter
    // if (!format) {
    //   // [START readBodyParam]
    //   format = req.body.format;
    //   // [END readBodyParam]
   
    // }
    if (req.method === 'OPTIONS') {
      htmlRes = HttpResponse()
      htmlRes['Access-Control-Allow-Origin']='*' // or your not origin domain
      htmlRes['Access-Control-Allow-Methods']='*' // or POST, GET, PUT, DELETE
      htmlRes['Access-Control-Allow-Headers']='*' // Content-Type, X-REQUEST
    }
  if(req.method==="POST"){
    try{
      const data=req.body;

      
      
      try{
        const resp=await db.collection("workers").where("service","==",data.name).get()
        const assignee={}
        const refer={}
        const haversine=(lat1,lon1,lat2,lon2)=>{
          const R = 6371e3; // metres
              const φ1 = lat1 * Math.PI/180; // φ, λ in radians
              const φ2 = lat2 * Math.PI/180;
              const Δφ = (lat2-lat1) * Math.PI/180;
              const Δλ = (lon2-lon1) * Math.PI/180;
  
              const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
              const d = R * c; // in metres
              return d
        }
        resp.forEach(doc=>{
          if(doc.data().city===data.city){
            if(doc.data().booked===false){
              const date=data.startDate
              if(!(doc.data().assigned.find(ele=>{
                return ele.date===date
              }))){
                refer[doc.id]=doc.data()

              }

              
            }
        }
        })
        let distance=5000;
        let index=0;
        const lat1=data.coords.lat,lon1=data.coords.lng;
        Object.keys(refer).forEach((key,i)=>{
          const wrkr=refer[key];
          let lat2=wrkr.coordinates.lat,lon2=wrkr.coordinates.lng;
          let dist=haversine(lat1,lon1,lat2,lon2);
          if(dist<distance){
            distance=dist;
          }
          

        })
        Object.keys(refer).forEach((key,i)=>{
          const wrkr=refer[key];
          let lat2=wrkr.coordinates.lat,lon2=wrkr.coordinates.lng;
          let dist=haversine(lat1,lon1,lat2,lon2);
          if(dist===distance){
            assignee[key]=refer[key]
          }
          

        })
        console.log("This is the assignee:",assignee);
        const keys=Object.keys(assignee)
        const len=keys.length
        console.log(len)
        if(len>0){  
                  //           const dest = doc.data().email;
    
        //         const mailOptions = {
        //             from: 'Abc Def <testappclone123.com>', // Something like: Jane Doe <janedoe@gmail.com>
        //             to: dest,
        //             subject: 'Booking for Service!!!', // email subject
        //             html: `
        //             <h3>Hello Partner</h3>
        //             <p style="font-size: 25px;">You have been assigned to work for a service</p>
        //                 <br />
                    
    
                    
        //         ` // email content in HTML
        //             };
      
        //     // returning result
        //         return transporter.sendMail(mailOptions, (erro, info) => {
        //             if(erro){
        //                 return res.send(erro.toString());
        //             }
        //             return res.send('Sended');
        //         });
    
        //         }else{
        //           console.log("Problem")
        //         }
        //       });
     






        const newOrderRef=db.collection("orders").doc();
        const response=await newOrderRef.set({...data})
                                //If number of assignee is 0 that means no worker is found
        const random=Math.floor(Math.random() * len)
        assignee[keys[random]].assigned.push({
          order:data.orders,
            date:data.startDate,
            time:data.time,
            user:data.usrId,
            coords:data.coords,
            address:data.address,
            total:data.total
        })
        console.log("Assignee data",assignee[keys[random]])

        try{
          const upd=await db.collection("workers").doc(keys[random]).update({
            ...assignee[keys[random]]
          }).then(res=>{
                              const dest = assignee[keys[random]].email;
    
                const mailOptions = {
                    from: 'Abc Def <testappclone123.com>', // Something like: Jane Doe <janedoe@gmail.com>
                    to: dest,
                    subject: 'Booking for Service!!!', // email subject
                    html: `
                    <h3>Hello Partner</h3>
                    <p style="font-size: 25px;">You have been assigned to work for a service</p>
                        <br />
                    
    
                    
                ` // email content in HTML
                    };
      
            // returning result
                return transporter.sendMail(mailOptions, (erro, info) => {
                    if(erro){
                        return res.send(erro.toString());
                    }
                    return res.send('Sended');
                });
    
                
             
     
          })
        }catch(e){
          console.log("error",e)
        }
        try {
          const usrData=await db.collection("users").doc(data.usrId).get()
      
        const doc=usrData.data()
        if(!doc.orders){
          const orders=[
            {
              name:data.name,
              order:data.orders,
              date:data.startDate,
              time:data.time,
              total:data.total,
              city:data.city

            }
          ]
          db.collection("users").doc(data.usrId).set({
            ...doc,
            orders
          }).then(respon=>{
            const dest = doc.email;

      const mailOptions = {
          from: 'Abc Def <testappclone123.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: dest,
          subject: 'Service to be served!!!', // email subject
          html: `
          <h3>Hello ${doc.firstName} ${doc.lastName} </h3>
          <p style="font-size: 25px;">Your service request ${data.name} is sucessfully booked</p>
              <br />
              

              
          ` // email content in HTML
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sended');
      });
            // console.log("Successfulll user",respon);
          }).catch(err=>{
            console.log(err)
          })

        }
        else{
          doc.orders.push({
            name:data.name,
            order:data.orders,
            date:data.startDate,
            time:data.time,
            total:data.total,
            city:data.city
          })
          db.collection("users").doc(data.usrId).update({
            ...doc
          }).then(respon=>{
            const dest = doc.email;

      const mailOptions = {
          from: 'Abc Def <testappclone123.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: dest,
          subject: 'Service to be served!!!', // email subject
          html: `
          <h3>Hello ${doc.firstName} ${doc.lastName} </h3>
          <p style="font-size: 25px;">Your service request ${data.name} is sucessfully booked</p>
              <br />
              

              
          ` // email content in HTML
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sended');
      });
            // console.log("Successfulll user",resp);
          }).catch(err=>{
            console.log(err)
          })

        }
        
    
        
          
      } catch (error) {
          console.log("Unknown error",error)
      }
      res.send(response);
      














        
      }
      else{
        res.send("Unsucessfull");
      }

        
        // return await db.collection("workers").doc(keys[random]).update({
        //   ...assignee[keys[random]]
        // })


        // try {
        //     resp.forEach(doc => {
        //         // console.log(doc.id, '=>', doc.data());
        //         if(doc.data().city===data.city){
        //           const dest = doc.data().email;
    
        //         const mailOptions = {
        //             from: 'Abc Def <testappclone123.com>', // Something like: Jane Doe <janedoe@gmail.com>
        //             to: dest,
        //             subject: 'Booking for Service!!!', // email subject
        //             html: `
        //             <h3>Hello Partner</h3>
        //             <p style="font-size: 25px;">You have been assigned to work for a service</p>
        //                 <br />
                    
    
                    
        //         ` // email content in HTML
        //             };
      
        //     // returning result
        //         return transporter.sendMail(mailOptions, (erro, info) => {
        //             if(erro){
        //                 return res.send(erro.toString());
        //             }
        //             return res.send('Sended');
        //         });
    
        //         }else{
        //           console.log("Problem")
        //         }
        //       });
            
        // } catch (error) {
        //     console.log("Error on getting workers")
        // }
        // .then(resp=>{

        // }).catch(err=>{
        //   console.log(err);
        // })

          


      }catch(e){
          console.log(e)
      }
    //   .then(response=>{

    //     })
    //     .catch(err=>{
    //       console.log("Error on get",err); 
    //     })    
          
      
    
    
  }
  catch(e){
    console.log("Error",e)
  }
  
    // const body=req.body;
  }else{
    res.status(500).send("Error on Post Request")
  }
})
})


exports.addservice=functions.https.onRequest((req,res)=>{
  
  cors(req, res, async () => {
    // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    // let format = req.query.format;
    // // [END readQueryParam]
    // // Reading date format from request body query parameter
    // if (!format) {
    //   // [START readBodyParam]
    //   format = req.body.format;
    //   // [END readBodyParam]
   
    // }
    if (req.method === 'OPTIONS') {
      htmlRes = HttpResponse()
      htmlRes['Access-Control-Allow-Origin']='*' // or your not origin domain
      htmlRes['Access-Control-Allow-Methods']='*' // or POST, GET, PUT, DELETE
      htmlRes['Access-Control-Allow-Headers']='*' // Content-Type, X-REQUEST
    }
  if(req.method==="POST"){
    try{
      const data=req.body;
    const doc=data.cities.split(",");
    const newTag=data.tag;
    console.log(newTag)
    doc.forEach(ele=>{
      const ref=admin.firestore().collection("cities").doc(ele);
      ref.get()
      .then(response=>{
        if(response.exists){
          
          console.log(response.data())
          const doc=response.data();
          const newService=doc.service
          if(!newService.find(ele=>ele.name===data.name)){
            newService.push({name:data.name,tag:newTag})
          
          return ref.update(
            
          {
              
            service:newService
            
          })
          
          

          }else{
            return res.send("Exists");

          }
          
        }else{
          ref.set({
            service:[{
              name:data.name,
            tag:data.tag
          }]})
        }
        return res.send("Success");
          
      }).catch(error=>{
        return res.send(error)
      })
    })
    
  }
  catch(e){
    console.log("Error",e)
  }
  
    // const body=req.body;
  }else{
    res.status(500).send("Error on Post Request")
  }
})
})