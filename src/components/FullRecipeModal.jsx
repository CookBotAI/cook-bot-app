import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css';

class FullRecipeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Modal
          show={this.props.showFullRecipeModal}
          onHide={this.props.toggleFullRecipeModal}
          // dialogClassName="modal-90w"
          className="custom-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {this.props.editRecipe
                ? this.props.editRecipe.dishName.toUpperCase()
                : null}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              className="img-fluid recipe-placeholder mx-3"
              src={
                this.props.editRecipe ? this.props.editRecipe.imageUrl : null
              }
              alt="Recipe Image Placeholder"
            />
            <ul>
              <ul>
                {this.props.editRecipe &&
                  this.props.editRecipe.cookingSteps.map((step, recipIdx) => (
                    <li key={recipIdx}>{step}</li>
                  ))}
              </ul>
              <h4>
                <strong>Ingredients:</strong>
              </h4>
              <ul>
                {this.props.editRecipe &&
                  this.props.editRecipe.ingredients.map(
                    (ingredient, ingrIdx) => <li key={ingrIdx}>{ingredient}</li>
                  )}
              </ul>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.props.toggleFullRecipeModal()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default FullRecipeModal;
