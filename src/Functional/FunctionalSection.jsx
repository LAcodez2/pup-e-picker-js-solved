import { Link } from "react-router-dom";

export const FunctionalSection = ({
  children,
  activeTab,
  onToggleTab,
  favoritesCount,
  unfavoritesCount,
}) => {
  const tabClass = (tab) => `selector ${activeTab === tab ? "active" : ""}`;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>

        <Link to={"/class"} className="btn">
          Change to Class
        </Link>

        <div className="selectors">
          {/* Favorited */}
          <div
            className={tabClass("favorited")}
            onClick={() => onToggleTab("favorited")}
          >
            favorited ( {favoritesCount} )
          </div>

          {/* Unfavorited */}
          <div
            className={tabClass("unfavorited")}
            onClick={() => onToggleTab("unfavorited")}
          >
            unfavorited ( {unfavoritesCount} )
          </div>

          {/* Create */}
          <div
            className={tabClass("create")}
            onClick={() => onToggleTab("create")}
          >
            create dog
          </div>
        </div>
      </div>

      <div className="content-container">{children}</div>
    </section>
  );
};
