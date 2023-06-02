// // import lib/mongo_connect.js
// // import Mongo from "/lib/mongo_connect.js"

// export default async function Dan() {
    
//     const mongo = await Mongo;
//     const data = await mongo.connect().then((db) => {
//         return db.collection("test").find({}).toArray();
//     });

//     return (
//     <div className="flex w-full justify-center items-center md:py-20">
//         <div className="grid grid-cols-1 w-full md:w-1/2 bg-gray-500 rounded-2xl p-8">
//             <h1 className="text-xl text-white font-bold">Welcome to my world, beep bop</h1>
            
//             <p className="text-white mt-4">This is a test page to see if I can connect to a MongoDB database.</p>

//             <p className="text-white mt-4">Here is some data from the database:</p>
//             <ul className="text-white mt-4">
//                 <li>{data[0].name}</li>
//                 <li>{data[0].age}</li>
//                 <li>{data[0].location}</li>
//             </ul>
                        
//         </div>
//     </div>
//   );
// }
