import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getPluginToModify,
    modifyPlugin,
    addPluginParametre,
    deletePluginParametre,
    addPluginTag,
    deletePluginTag,
    updateMyPlugin
} from '../../actions/userDataAction';
import PropTypes from 'prop-types';
import ModifyParametre from './modifyParametre';
import ModifyTag from './modifyTags';
import $ from 'jquery';
class ModifyMyPlugin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerName: '',
            siteSellerUrl: '',
            creator: '',
            image: '',
            description: '',
            tags: [],
            parametres: [],
            imageFile: ''
        }
    }
    componentWillMount() {
        this.props.getPluginToModify(this.props.match.params.id);
        console.log(this.props);     
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("sellerName", this.props.pluginToModify.sellerName);
        data.append("siteSellerUrl", this.props.pluginToModify.siteSellerUrl);
        data.append("creator", this.props.pluginToModify.creator);
        data.append("description", this.props.pluginToModify.description);
        data.append("tag", JSON.stringify(this.props.pluginToModify.tag));
        data.append("parametres", JSON.stringify(this.props.pluginToModify.parametres));
        data.append("imageFile", this.state.imageFile);

        updateMyPlugin(this.props.match.params.id,data);
    }
    handleInputChange = (e) => {
        e.preventDefault();
        this.props.modifyPlugin(e.target.name, e.target.value);
    }
    handleFileSelected = (event) => {
        event.preventDefault();
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        })
        $('#chooseFileLabel').html('Image selected').css('color', 'green');
        $('#imagePreview').addClass('shadow bg-white')
        this.setState({
            imageFile: event.target.files[0]
        })
    }
    render() {
        const labelStyle = {
            fontSize: '30px',
            fontWeight: '100'
        };

        const font_weight = {
            fontWeight: '100'
        };

        const divStyle = {
            width: '60%',
            heigh: 'auto',
            margin: '50px 20%',
        };

        const previewImage = {
            height: '44.18px',
            position: 'absolute',
            zIndex: '1000',
            marginRight: '30px',
        }
        const uploadImage = {
            width: '25%',
        }
        // let plugin = this.props.plugin.plugins;
        // console.log(this.props.pluginToModify);
        let pluginToModify;
        if (this.props.pluginToModify) {
            pluginToModify = this.props.pluginToModify
        } else {
            pluginToModify = this.state
        }
        console.log('render');
        return (

            <div style={divStyle}>
                <h1 className="font-weight-light">Please fill the form to modify your plugin</h1>
                <br />
                <form onSubmit={this.handleSubmit} className="md-form">
                    <label style={labelStyle} htmlFor="seller">Seller:</label>
                    <div className="form-row" id="seller">
                        <div className="form-group col-md-6">
                            <input style={font_weight} value={pluginToModify.sellerName} type="text" className="form-control" id="sellerName" name="sellerName" placeholder="Enter your name" onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <input onChange={this.handleInputChange} style={font_weight} type="text" className="form-control" value={pluginToModify.siteSellerUrl} id="siteSellerUrl" name="siteSellerUrl" placeholder="Enter the web site URL of your company" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label style={labelStyle} htmlFor="creator">Creator:</label>
                        <input value={pluginToModify.creator} onChange={this.handleInputChange} style={font_weight} id="creator" className="form-control" name="creator" placeholder="Creator's name" />
                    </div>
                    <div className="form-group">
                        <label style={labelStyle} htmlFor="description">Description:</label>
                        <textarea value={pluginToModify.description} onChange={this.handleInputChange} style={font_weight} name="description" className="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label style={labelStyle} htmlFor="addParametreButton">Parametres:</label>
                        <ModifyParametre
                            addPluginParametre={this.props.addPluginParametre}
                            deletePluginParametre={this.props.deletePluginParametre}
                            parametres={pluginToModify.parametres}
                            name="parametre"
                        />
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Tags:</label>
                        <ModifyTag addPluginTag={this.props.addPluginTag} deletePluginTag={this.props.deletePluginTag} tag={pluginToModify.tag}/>
                    </div>
                    <div style={uploadImage} className="form-group">
                        <label style={labelStyle} htmlFor="image">Plugin Image:</label>
                        <div className="custom-file" id="image">
                            <input accept="image/gif, image/jpeg, image/png" onChange={this.handleFileSelected} style={font_weight} type="file" className="custom-file-input" id="image" name="image" required />
                            <label id="chooseFileLabel" style={font_weight} className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                            <img id="imagePreview" style={previewImage} src={this.state.image} className="rounded float-right" alt='' />
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg" type="submit">Modification Complete</button>
                </form>
            </div>
        )
    }
}
ModifyMyPlugin.propTypes = {
    pluginToModify: PropTypes.object.isRequired,
    getPluginToModify: PropTypes.func.isRequired,
    modifyPlugin: PropTypes.func.isRequired,
    addPluginParametre: PropTypes.func.isRequired,
    deletePluginParametre: PropTypes.func.isRequired,
    addPluginTag: PropTypes.func.isRequired,
    deletePluginTag: PropTypes.func.isRequired
    // auth: PropTypes.object.isRequired
    // plugin: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    // auth: state.auth,
    // plugin: state.plugin,
    pluginToModify: state.userData.pluginToModify
})
export default connect(mapStateToProps, {
    getPluginToModify,
    modifyPlugin,
    addPluginParametre,
    deletePluginParametre,
    addPluginTag,
    deletePluginTag,
})(ModifyMyPlugin);