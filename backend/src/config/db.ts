import { color } from '@chakra-ui/react';
import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const connectionMessage = `MONGO_DB_CONNECTED: ${conn.connection.host}`;
    console.log(colors.bold.green.underline(connectionMessage));
  } catch (error) {
    console.error(
      colors.bold.red.underline(`Connection Failed: ${error.message}`)
    );
    process.exit(1);
  }
};

export { connectDb };
