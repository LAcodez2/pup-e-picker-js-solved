import { dogPictures } from "../dog-pictures";
import { useState } from "react";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({ onCreate, isLoading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(defaultSelectedImage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    await onCreate({
      name,
      description,
      image,
    });

    setName("");
    setDescription("");
    setImage(defaultSelectedImage);
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>

      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        value={description}
        cols={80}
        rows={10}
        disabled={isLoading}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={image}
        disabled={isLoading}
        onChange={(e) => setImage(e.target.value)}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
