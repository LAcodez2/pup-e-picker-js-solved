import { Component } from "react";
import toast from "react-hot-toast";
import { Requests } from "../api"; // adjust path if needed
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

export class ClassApp extends Component {
  state = {
    dogs: [],
    activeTab: null, // null = no tab active
    isLoading: false,
  };

  componentDidMount() {
    this.loadDogs();
  }

  loadDogs = async () => {
    this.setState({ isLoading: true });
    try {
      const all = await Requests.getAllDogs();
      this.setState({ dogs: all });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onToggleTab = (tab) => {
    this.setState((prev) => ({
      activeTab: prev.activeTab === tab ? null : tab,
    }));
  };

  handleToggleFavorite = async (dog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog({ id: dog.id, isFavorite: !dog.isFavorite });
      await this.loadDogs();
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleDeleteDog = async (id) => {
    this.setState({ isLoading: true });
    try {
      await Requests.deleteDog(id);
      await this.loadDogs();
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleCreateDog = async (partialDog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.postDog({ ...partialDog, isFavorite: false });
      toast.success("Dog Created");
      await this.loadDogs();
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { dogs, activeTab, isLoading } = this.state;

    const favoritesCount = dogs.filter((d) => d.isFavorite).length;
    const unfavoritesCount = dogs.filter((d) => !d.isFavorite).length;

    const visibleDogs =
      activeTab === "favorited"
        ? dogs.filter((d) => d.isFavorite)
        : activeTab === "unfavorited"
          ? dogs.filter((d) => !d.isFavorite)
          : dogs; // no tab active => all

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>

        <ClassSection
          activeTab={activeTab}
          onToggleTab={this.onToggleTab}
          favoritesCount={favoritesCount}
          unfavoritesCount={unfavoritesCount}
        >
          {activeTab === "create" ? (
            <ClassCreateDogForm
              onCreate={this.handleCreateDog}
              isLoading={isLoading}
            />
          ) : (
            <ClassDogs
              dogs={visibleDogs}
              isLoading={isLoading}
              onTrash={this.handleDeleteDog}
              onToggleFavorite={this.handleToggleFavorite}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
