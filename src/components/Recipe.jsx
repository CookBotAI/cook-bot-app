import React from 'react';
import './Recipe.css';
import Carousel from 'react-bootstrap/Carousel';
import AddModal from './AddModal';
import FullRecipeModal from './FullRecipeModal';
import { Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import EditModal from './EditModal';


class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      showModal: false,
      showFullRecipeModal: false,
      currentRecipe: null,
      token: null,
      editRecipe: null,
      editMode: false,
      showEditModal: false,
      currentRecipeId: null,

    };
  }

  async componentDidMount() {
    // grab a token
    const res = await this.props.auth0.getIdTokenClaims();
    const token = res.__raw;
    this.setState({ token }, () => {
      this.fetchRecipes();
    });
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleShowEditModal = () => {
    this.setState({ showEditModal: true });
  };

  handleCloseEditModal = () => {
    this.setState({ showEditModal: false });
  };

  handleShowFullRecipeModal = (recipe) => {
    this.setState({
      showFullRecipeModal: true,
      currentRecipe: recipe,
    });
  };

  handleCloseFullRecipeModal = () => {
    this.setState({ showFullRecipeModal: false });
  };
  
  // Notes //
  handleNoteChange = (newNote) => {
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        notes: newNote
      }
    }));
  }

  toggleEditMode = () => {
    if (this.state.editMode) {
      this.saveNotes(); 
    }
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  }

  saveNotes = async () => {
    const currentRecipe = this.state.recipes.find(recipe => recipe._id === this.state.currentRecipeId);
    const updatedData = {
      ...currentRecipe,
    };
  
    try {
      await this.updateRecipe(currentRecipe._id, updatedData);
      const updatedRecipes = this.state.recipes.map((recipe) => {
        if (recipe._id === currentRecipe._id) {
          return updatedData;
        }
        return recipe;
      });
      this.setState({ recipes: updatedRecipes });
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  }


  deleteNote = async () => {
    const currentRecipe = this.state.recipes.find(recipe => recipe._id === this.state.currentRecipeId);

    try {
      await this.props.authRequest('DELETE', this.state.token, `${currentRecipe._id}/notes`);
      const updatedRecipes = this.state.recipes.map((recipe) => {
        if (recipe._id === currentRecipe._id) {
          return { ...recipe, notes: '' };
        }
        return recipe;
      });
      this.setState({ recipes: updatedRecipes, currentRecipe: '', editMode: false });
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  }

  //GET//
  fetchRecipes = async () => {
    this.props
      .authRequest('GET', this.state.token, null, null)
      .then((response) => {
        this.setState({ recipes: response.data });
        console.log(response.data);
      });
  };

  //POST//
  addRecipe = async (input) => {
    let ingredientsObj = { foodItems: input };
    this.props
      .authRequest('POST', this.state.token, null, ingredientsObj)
      .then((response) => {
        this.setState({ recipes: [...this.state.recipes, response.data] });
        console.log(response.data);
      });
  };

  //PUT//
  updateRecipe = async (id, updatedData) => {
    console.log(id + updatedData);
    this.props
      .authRequest('PUT', this.state.token, id, updatedData)
      .then((response) => {
        const updatedRecipes = this.state.recipes.map((recipe) => {
          if (recipe.id === id) {
            return response.data;
          }
          return recipe;
        });
        this.setState({ recipes: updatedRecipes });
        this.fetchRecipes();
        console.log(response.data);
      });
  };

  //DELETE//
  deleteRecipe = async (id) => {
    this.props
      .authRequest('DELETE', this.state.token, id, null)
      .then((response) => {
        const filteredRecipes = this.state.recipes.filter(
          (recipe) => recipe._id !== id
        );
        this.setState({ recipes: filteredRecipes });
        console.log(response.data);
      });
    console.log(this.state.editRecipe);
  };

  handleUpdateRecipe = (recipe) => {
    console.log(recipe);
    this.setState({
      editRecipe: recipe,
      showFullRecipeModal: false,
      showEditModal: true,
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: '1rem 5%',
        }}
      >
        <Button
          style={{ width: '10rem', margin: '0 auto' }}
          variant="success"
          onClick={this.handleShowModal}
        >
          Add New Recipe
        </Button>
        <AddModal
          show={this.state.showModal}
          onHide={this.handleCloseModal}
          addRecipe={this.addRecipe}
        />
        <EditModal
          show={this.state.showEditModal}
          onHide={this.handleCloseEditModal}
          editRecipe={this.state.editRecipe}
          updateRecipe={this.updateRecipe}
        />
        {this.state.recipes.length > 0 ? (
          <Carousel className="custom-carousel">
            {this.state.recipes.map((recipe, idx) => (
              <Carousel.Item key={idx} interval={25000}>
                <img
                  className="d-block w-100"
                  src={recipe.imageUrl}
                  alt="Recipe"
                  style={{
                    width: '400px',
                    height: '400px',
                    objectFit: 'cover',
                  }}
                />
                <div className="info-div">
                  <h3>{recipe.dishName}</h3>
                  <Button
                    variant="outline-success"
                    onClick={() => this.handleShowFullRecipeModal(recipe)}
                  >
                    Click Here For Full Recipe!
                  </Button>
                  <FullRecipeModal
                    show={this.state.showFullRecipeModal}
                    onHide={this.handleCloseFullRecipeModal}
                    currentRecipe={this.state.currentRecipe}
                    updateRecipe={this.updateRecipe}
                    handleUpdateRecipe={this.handleUpdateRecipe}
                    deleteRecipe={this.deleteRecipe}
                    handleNoteChange={this.handleNoteChange}
                    toggleEditMode={this.toggleEditMode}
                    deleteNote={this.deleteNote}
                    editMode={this.state.editMode}
                    notes={recipe.notes || ""}
                    currentRecipeId={recipe._id}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : null}
      </div>
    );
  }
}

const AuthRecipe = withAuth0(Recipe);

export default AuthRecipe;
