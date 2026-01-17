import { Component } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component {
  render() {
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <div className={`selector`} onClick={() => {}}>
              favorited ( 0 )
            </div>

            <div className={`selector`} onClick={() => {}}>
              unfavorited ( 0 )
            </div>

            <div className={`selector active`} onClick={() => {}}>
              create dog
            </div>
          </div>
        </div>

        <div className="content-container">
          {this.props.children}
        </div>
      </section>
    );
  }
}
