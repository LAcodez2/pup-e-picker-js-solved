import { Requests } from "./api";

const messAround = async () => {
  try {
    console.log("Fetching all dogs...");
    const dogs = await Requests.getAllDogs();
    console.log("Dogs from API:", dogs);
  } catch (error) {
    console.error("Error fetching dogs:", error);
  }
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>
      <button onClick={messAround}>
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};