import { Component } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component {
  render() {
    const {
      children,
      activeTab,
      onToggleTab,
      favoritesCount,
      unfavoritesCount,
    } = this.props;

    const tabClass = (tab) => `selector ${activeTab === tab ? "active" : ""}`;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <div
              className={tabClass("favorited")}
              onClick={() => {
                onToggleTab("favorited");
              }}
            >
              favorited ( {favoritesCount} )
            </div>

            <div
              className={tabClass("unfavorited")}
              onClick={() => {
                onToggleTab("unfavorited");
              }}
            >
              unfavorited ( {unfavoritesCount} )
            </div>

            <div
              className={tabClass("create")}
              onClick={() => {
                onToggleTab("create");
              }}
            >
              create dog
            </div>
          </div>
        </div>

        <div className="content-container">{children}</div>
      </section>
    );
  }
}
