import { Component } from "react";
import { dogPictures } from "../dog-pictures";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component {
  state = {
    name: "",
    description: "",
    image: defaultSelectedImage,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, image } = this.state;
    const { onCreate } = this.props;

    if (!name.trim()) return;

    await onCreate({
      name,
      description,
      image,
    });

    this.setState({
      name: "",
      description: "",
      image: defaultSelectedImage,
    });
  };

  render() {
    const { isLoading } = this.props;
    const { name, description, image } = this.state;

    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>

        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={description}
          onChange={(e) => {
            this.setState({ description: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={image}
          onChange={(e) => {
            this.setState({ image: e.target.value });
          }}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
