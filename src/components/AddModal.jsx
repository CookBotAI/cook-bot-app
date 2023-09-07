import React from 'react';
import {Modal, Button, Form, ListGroup} from 'react-bootstrap'

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      ingredients: [''],
    };
  }

  handleAddIngredient = () => {
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, ''],
    }));
  };

  handleIngredientChange = (index, value) => {
    const updatedIngredients = [... this.state.ingredients];
    updatedIngredients[index] = value;
    this.setState({ingredients :updatedIngredients});
  };

  handleSubmit = () => {
    console.log('Submitted recipe', this.state.ingredients)
    this.props.addRecipe(this.state.ingredients);
  }

    render() {
      return (
        <Modal 
        show={this.props.showAddModal} 
        onHide={this.props.toggleAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <ListGroup>
              {this.state.ingredients.map((ingredient, index) => (
                <ListGroup.Item key={index}>
                  <Form.Control
                    type="text"
                    placeholder="Enter ingredient"
                    value={ingredient}
                    onChange={(e) =>
                      this.handleIngredientChange(index, e.target.value)
                    }
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button variant="primary" onClick={this.handleAddIngredient}>
              Add Ingredient
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.toggleAddModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Submit Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default AddModal; 
