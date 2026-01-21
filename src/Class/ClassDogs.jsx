import { Component } from "react";
import { DogCard } from "../Shared/DogCard";

export class ClassDogs extends Component {
  render() {
    const { dogs, onTrash, onToggleFavorite, isLoading } = this.props;

    if (!dogs?.length) {
      return <p style={{ padding: 20 }}>No dogs to display 🐶</p>;
    }

    return (
      <>
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isLoading={isLoading}
            onTrashIconClick={() => onTrash(dog.id)}
            onHeartClick={() => onToggleFavorite(dog)}
            onEmptyHeartClick={() => onToggleFavorite(dog)}
          />
        ))}
      </>
    );
  }
}
