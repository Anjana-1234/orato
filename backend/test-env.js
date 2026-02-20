import dotenv from 'dotenv';
dotenv.config();
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('All keys:', Object.keys(process.env).filter(k => k.match(/PORT|MONGO|EMAIL/)));
