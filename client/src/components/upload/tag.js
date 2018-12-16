import React, { Component } from 'react';
// import { render } from 'react-dom';
// import {COUNTRIES} from './countries';
import './uploadCss/tag.css';
import { WithContext as ReactTags } from 'react-tag-input';

// const suggestions = COUNTRIES.map((country) => {
//   return {
//     id: country,
//     text: country
//   }
// })

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);

  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    }, () => {
      this.props.action(this.state.tags);
    });


  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }), () => {
      this.props.action(this.state.tags);
    });
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
          autofocus={false}
        />
      </div>
    );
  }
}
// render(<App />, document.getElementById('root'));
export default Tag;