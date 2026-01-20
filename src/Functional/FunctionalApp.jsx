import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [dogs, setDogs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshDogs = async () => {
    const all = await Requests.getAllDogs();
    setDogs(all);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await refreshDogs();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onToggleTab = (tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const favoritesCount = useMemo(
    () => dogs.filter((d) => d.isFavorite).length,
    [dogs],
  );
  const unfavoritesCount = useMemo(
    () => dogs.filter((d) => !d.isFavorite).length,
    [dogs],
  );

  const visibleDogs = useMemo(() => {
    if (activeTab === "favorited") return dogs.filter((d) => d.isFavorite);
    if (activeTab === "unfavorited") return dogs.filter((d) => !d.isFavorite);
    return dogs;
  }, [dogs, activeTab]);

  const handleToggleFavorite = async (dog) => {
    setIsLoading(true);

    try {
      await Requests.updateDog({ id: dog.id, isFavorite: !dog.isFavorite });
      await refreshDogs();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDog = async (id) => {
    setIsLoading(true);
    try {
      await Requests.deleteDog(id);
      await refreshDogs();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDog = async (partialDog) => {
    setIsLoading(true);

    try {
      await Requests.postDog({ ...partialDog, isFavorite: false });
      toast.success("Dog Created");
      await refreshDogs();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>

      <FunctionalSection
        activeTab={activeTab}
        onToggleTab={onToggleTab}
        favoritesCount={favoritesCount}
        unfavoritesCount={unfavoritesCount}
      >
        {activeTab === "create" ? (
          <FunctionalCreateDogForm
            onCreate={handleCreateDog}
            isLoading={isLoading}
          />
        ) : (
          <FunctionalDogs
            dogs={visibleDogs}
            isLoading={isLoading}
            onTrash={handleDeleteDog}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
