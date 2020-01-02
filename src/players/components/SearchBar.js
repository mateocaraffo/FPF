import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect } from "react-redux"
import { filterPlayers } from "../actions"

class SearchBar extends Component {
  renderInput = form => {
    return (
      <div className="field">
        <label>{form.label}</label>
        <input {...form.input} autoComplete="off" className="name" />
        {this.renderError(form.meta)}
      </div>
    );
  };

  renderSelect = form => {
    return (
      <div className="field">
        <label>{form.label}</label>
        <select {...form.input} className="ui dropdown">
          <option value="">Show all</option>
          {form.options.map(option => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  renderRange = form => {
    return (
      <div className="field">
        <label>{form.label}</label>
        <span className="ui label">{form.input.value}</span>
        <input
          {...form.input}
          type="range" 
          min={form.min}
          max={form.max}
          step={form.step}
        />
        {this.renderError(form.meta)}
      </div>
    );
  };

  renderError({ error }) {
    if (error) {
      return {error}  
    }
  }

  onSubmit = formValues => {
    this.props.filterPlayers(formValues)
  };

  render() {
    const { positionOptions, ageMin, ageMax } = data.fieldsAttributes;

    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="inline fields">
          <Field label="Name" name="name" component={this.renderInput} />

          <Field
            label="Position"
            name="position"
            component={this.renderSelect}
            options={positionOptions}
          />

          <Field
            label="Max. Age"
            name="age"
            component={this.renderRange}
            step="1"
            min={ageMin}
            max={ageMax}
          />

          <div
            className="ui button submit"
            onClick={this.props.handleSubmit(this.onSubmit)}
          >
            <div className="visible content">
              <i className="search icon" />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const data = {
  initialValues: {
    name: "",
    position: "", 
    age: 50
  },
  fieldsAttributes: {
    ageMin: 18,
    ageMax: 50,
    positionOptions: [
      "Attacking Midfield","Central Midfield","Centre-Back","Centre-Forward","Defensive Midfield","Keeper","Left Midfield","Left Wing","Left-Back","Right-Back"]
  }
};

SearchBar = connect(
  null,
  { filterPlayers }
)(SearchBar);

export default reduxForm({
  form: "searchFilters",
  initialValues: data.initialValues
})(SearchBar);