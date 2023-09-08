import React from 'react';
import './FullRecipeModal.css';
import {Modal, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';


class FullRecipeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal 
          show={this.props.show} 
          onHide={this.props.onHide} 
          fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="recipe-title">  Full Recipe for {this.props.currentRecipe ? this.props.currentRecipe.dishName : null}</h3>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="recipe-content">
                <img
                    className="img-fluid recipe-image"
                    src={this.props.currentRecipe ? this.props.currentRecipe.imageUrl : null}
                    alt="Recipe"
                    style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                />
                <div className="recipe-details">
                    <div className="recipe-ingredients">
                        <h4>
                            <strong>Ingredients:</strong>
                        </h4>
                        <ul>
                        {this.props.currentRecipe && this.props.currentRecipe.ingredients &&
                          this.props.currentRecipe.ingredients.map((ingredient, ingrIdx) => (
                              <li key={ingrIdx}>{ingredient}</li>
                          ))}
                        </ul>
                    </div>
                    <div className="recipe-steps">
                        <h4>
                            <strong>Cooking Steps</strong>
                        </h4>
                        <ul>
                            {this.props.currentRecipe && this.props.currentRecipe.cookingSteps &&
                            this.props.currentRecipe.cookingSteps.map((step, recipIdx) => (
                                <li key={recipIdx}>{step}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="recipe-notes">
                      <h4><strong>Notes</strong></h4>
                      {this.props.editMode ? (
                          <textarea 
                            value={this.props.notes}
                            onChange={e => console.log("Changing notes to:", e.target.value) && 
                              this.props.handleNoteChange(e.target.value)}
                            rows="4"
                            cols="50"
                          />
                      ) : (
                          <p>{this.props.notes || "No notes added yet."}</p>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      onClick={this.props.toggleEditMode}
                    >
                      {this.props.editMode ? "Save Notes" : "Edit Notes"}
                    </Button>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="danger" onClick={() => {
            console.log('Deleting recipe with _id:', this.props.currentRecipe._id);
              this.props.deleteRecipe(this.props.currentRecipe._id);
              this.props.onHide();
            }}>
            Delete Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

FullRecipeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  notes: PropTypes.string,
  toggleEditMode: PropTypes.func.isRequired,
  currentRecipe: PropTypes.shape({
    dishName: PropTypes.string,
    imageUrl: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }),
};

FullRecipeModal.defaultProps = {
  show: false,
  onHide: () => {},
  deleteRecipe: () => {},
  editRecipe: null,
  currentRecipe: {
    dishName: '',
    imageUrl: '',
    ingredients: [],  currentRecipe: {
      dishName: '',
      imageUrl: '',
      ingredients: [],
    },
  },
};

export default FullRecipeModal; 
