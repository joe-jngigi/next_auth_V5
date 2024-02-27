import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // Get the current date and time
  const currentDate = new Date();
//   const expiryTime = new Date(new Date().getTime() + 3600 * 1000);

  // Add 1 hour to the current time
  const expiryTime = currentDate.setHours(currentDate.getHours() + 1);
};
