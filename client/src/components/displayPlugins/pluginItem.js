import React, { Component } from 'react';
import { Link } from 'react-router-dom';

require('./css/index.css');
class PluginItem extends Component {
    // constructor(props) {
    //     super(props);
    // };
    inspiredBy = () => {
        let description = this.props.plugin.description;
        if (description.includes("classic")) {
            let inspiration;
            description = description.split("classic");
            for (let element of description) {
                let ele = element.substring(0, 40);
                if (ele.includes("(*)")) {
                    inspiration = ele.split("(*)")[0];
                    break;
                }
            }
            return inspiration;
        } else {
            return "";
        }
    }
    redirect = () => {
        return (
            <Link
                className="button"
                to={{
                    pathname: '/plugin/' + this.props.plugin._id,
                    data: this.props.plugin
                }}>
                DETAILS
            </Link>
        )
    }
    render() {
        
        if (this.props.isEmpty === "false") {
            let detailButton = this.redirect();
            return (
                <div className="plugin-item">
                    <div className="detail">
                        <span id="title">{this.props.plugin.creator}</span>
                        <img className="item-photo" src={this.props.plugin.imageUrl} alt=''></img>
                        <span className="sub-description">Inspired by <this.inspiredBy></this.inspiredBy></span>
                        {detailButton}
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
export default PluginItem;