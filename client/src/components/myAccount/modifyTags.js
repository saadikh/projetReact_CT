import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
// import PropTypes from 'prop-types';
const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
class ModifyTag extends Component {
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
        this.props.deletePluginTag(i);
    }
    // handleDelete(i) {
    //     const { tags } = this.state;
    //     this.setState({
    //         tags: tags.filter((tag, index) => index !== i),
    //     }, () => {
    //         this.props.action(this.state.tags);
    //     });
    // }
    handleAddition(tag) {
        this.props.addPluginTag(tag);
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
        
        let TagList = () => {
            if (this.props.tag) {
                return (
                    <div>
                        <ReactTags
                            tags={this.props.tag}
                            suggestions={this.state.suggestions}
                            delimiters={delimiters}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            handleTagClick={this.handleTagClick}
                            autofocus={false}
                        />
                    </div>
                )
            } else {
                return (
                    <div>
                        <ReactTags
                            tags={this.state.tags}
                            suggestions={this.state.suggestions}
                            delimiters={delimiters}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            handleTagClick={this.handleTagClick}
                        />
                    </div>
                )
    
            }
        }
        return (
            <div>
                {/* {tagList} */}
                <TagList/>
            </div>

            // <div>
            //     <ReactTags
            //         tags={tags}
            //         suggestions={suggestions}
            //         delimiters={delimiters}
            //         handleDelete={this.handleDelete}
            //         handleAddition={this.handleAddition}
            //         handleDrag={this.handleDrag}
            //         handleTagClick={this.handleTagClick}
            //     />
            // </div>
        );
    }
    // render(){
    //     console.log(this.props.tags);
    //     let tagList;
    //     if(this.props.tags){
    //         tagList = this.props.tags.map((ele,index) => {
    //             return <span key={index}>{ele.text}</span>
    //         })
    //     }else{
    //         tagList="there is no tag"
    //     }


    //     return(
    //         <div>
    //             {tagList}
    //         </div>
    //     )
    // }
}

// ModifyTag.propTypes = {
//     tags: PropTypes.array.isRequired
// }
// const mapStateToProps = (state) => ({
//     tags: state.userData.pluginToModify.tag
// })
// export default connect(mapStateToProps,{})(ModifyTag);
export default ModifyTag;