const Trip=require('./models/trip');

async function seed(){
 await Trip.deleteMany({});
 await Trip.insertMany([
   {code:'BEACH01',name:'Beach Escape',length:'7 days',start:'Miami',resort:'Ocean View',perPerson:1200,description:'Beach vacation'},
   {code:'MTN01',name:'Mountain Adventure',length:'5 days',start:'Denver',resort:'Rocky Peaks',perPerson:900,description:'Mountain trip'}
 ]);
 console.log('Seed complete');
 process.exit();
}
seed();
