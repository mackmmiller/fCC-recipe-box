import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import './App.css';

class EditRecipeModal extends Component {
    constructor(props) {
    super(props);
    this.state = {
      modal: false,
      hits: null,
      recipe: this.props.recipe,
      ingredients: this.props.ingredients
    };
    this.toggle = this.toggle.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.update.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  update(e) {
    /*e.preventDefault();
    let value = document.getElementById(this.props.i).value;
    localStorage.setItem(this.props.recipe, value);
    {this.toggle()};*/
  }

  delete(e) {
    console.log("ckic");
    /*e.preventDefault();
    console.log("clicked");
    localStorage.removeItem(this.props.recipe);*/
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} color="info"><FontAwesome name="cog"></FontAwesome></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="editModal">
          <Form>
          <ModalHeader id={this.props.recipe} toggle={this.toggle}>Edit {this.props.recipe}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="ingredientList">Ingredients</Label>
              <Input type="textarea" name="text" id={this.props.i} defaultValue={this.props.ingredients} cols="40" rows="5" />
            </FormGroup> 
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="success" onClick={() => {localStorage.setItem(this.props.recipe, document.getElementById(this.props.i).value)}}>Save</Button>{' '}
            <Button type="submit" color="danger" onClick={() => {localStorage.removeItem(this.props.recipe)}}>Delete</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

class AddRecipeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      hits: null
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  save(e) {
    let title = document.getElementById("recipeName").value;
    let ingredients = document.getElementById("ingredientList").value;
    localStorage.setItem(title, ingredients);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Add recipe</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Form>
          <ModalHeader toggle={this.toggle}>Add a Recipe</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="recipeName">Recipe Title</Label>
              <Input type="text" name="recipeTitle" id="recipeName" placeholder="Recipe Title" />
            </FormGroup>
            <FormGroup>
              <Label for="ingredientList">Ingredients</Label>
              <Input type="textarea" name="text" id="ingredientList" placeholder="Ingredients" cols="40" rows="5" />
            </FormGroup> 
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="success" onClick={this.save}>Save</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      ingredients: [],
    }
  }

  componentDidMount() {
    let currentRecipes = Object.keys(window.localStorage);
    let currentIngredients = Object.values(window.localStorage);
    this.setState({
      recipes: currentRecipes,
      ingredients: currentIngredients,
    })
    console.log(this.state.recipes);
  }

  render() {
    const { recipes } = this.state;
    const { ingredients } = this.state;
    let i=0;
    return (
      <div className="App container-fluid">
        <div className="container" id="recipe-box">
          {recipes.map(recipe=>
            <div className="recipe container align-content-center" key={recipe}>
              <h5 className="recipeName">{recipe}</h5>
              <p className="recipeIngredients">{ingredients[recipes.indexOf(recipe)]}</p>
              <div className="editButton">
                <EditRecipeModal className={recipe} i={i++} recipe={recipe} ingredients={ingredients[recipes.indexOf(recipe)]}/>
              </div>
            </div>)}
        </div>
        <AddRecipeModal />
      </div>
    );
  }
}

export default App;
