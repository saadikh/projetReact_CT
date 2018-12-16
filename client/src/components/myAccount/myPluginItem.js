import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class MyPluginItem extends Component {
    redirectToItemDetails = () => {
        return (
            <Link
                to={{
                    pathname: '/plugin/' + this.props.plugin._id,
                    data: this.props.plugin
                }}>
                <img className="plugin-screenshot" src={this.props.plugin.imageUrl} alt=''></img>
            </Link>
        )
    }
    onClickHandler = (e) => {
        e.preventDefault();
        this.props.deletePlugin(this.props.userId,this.props.plugin._id);
    }
    render() {
        console.log(this.props.plugin);
        
        let modifyPath = '/myPlugins/'+this.props.plugin._id;
        if (this.props.isEmpty === "false") {
            let plugin = this.props.plugin;
            
            let image = this.redirectToItemDetails();
            return (
                <div className="store-item whiteframe">
                    {image}
                    {/* <button className="my-plugin-button modify">Modify</button> */}
                    <Link to={modifyPath} className="my-plugin-button modify">Modify</Link>
                    <button className="my-plugin-button delete" onClick={this.onClickHandler}>Delete</button>
                    <div className="divider"></div>
                    <div className="plugin-info-container">
                        <Link to="#" className="store-creator">{plugin.creator}</Link>
                        <Link to="#" className="brand">{plugin.sellerName}</Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="plugin-item empty">
                </div>
            )
        }
    }
}
export default MyPluginItem;