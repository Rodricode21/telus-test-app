import axios from "axios";

export const getUser = async (number: number) => {
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error("Number must be a positive integer");
  }

  try {
    const response = await axios
      .get(`https://jsonplaceholder.typicode.com/users/${number}`)
      .then((res) => res);

    return response.data;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
};
