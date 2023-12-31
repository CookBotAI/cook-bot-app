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
      showEditModal: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    // grab a token
    const res = await this.props.auth0.getIdTokenClaims();
    const token = res.__raw;
    // this.toggleLoading();
    this.setState({ token }, () => {
      this.fetchRecipes();
      // this.toggleLoading();
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
        this.setState(
          { recipes: [...this.state.recipes, response.data] },
          () => {
            this.toggleLoading();
          }
        );
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
        this.setState({ recipes: updatedRecipes }, () => {
          this.toggleLoading();
        });
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

  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          /* Loading screen/Div with className loader is from https://webdeasy.de/en/css-loading-animations/ - Author John Heiner */
          <div className="loader">
            <div className="tall-stack">
              <div className="butter falling-element"></div>
              <div className="pancake falling-element"></div>
              <div className="pancake falling-element"></div>
              <div className="pancake falling-element"></div>
              <div className="pancake falling-element"></div>
              <div className="pancake falling-element"></div>
              <div className="pancake falling-element"></div>
              <div className="plate">
                <div className="plate-bottom"></div>
                <div className="shadow"></div>
              </div>
            </div>
          </div>
        ) : (
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
              toggleLoading={this.toggleLoading}
            />
            <EditModal
              show={this.state.showEditModal}
              onHide={this.handleCloseEditModal}
              editRecipe={this.state.editRecipe}
              updateRecipe={this.updateRecipe}
              toggleLoading={this.toggleLoading}
            />
            {this.state.recipes.length > 0 ? (
              <Carousel className="custom-carousel">
                {this.state.recipes.map((recipe, idx) => (
                  <Carousel.Item key={idx} interval={2500}>
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
                        variant="success"
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
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : null}
          </div>
        )}
      </>
    );
  }
}

const AuthRecipe = withAuth0(Recipe);

export default AuthRecipe;
