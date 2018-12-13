import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
require('./css/pluginDetail.css');

class PluginDetail extends Component {
    // constructor(props){
    //     super(props);
    // }
    // searchByTag = (tag,e) => {
        
    //     axios
    //     .get('/api/plugin/tag/'+tag)
    //     .then((res) => {
    //         let count = 0;
    //         count++;
    //         console.log(res);
    //         console.log(count);
            
    //     })
    // }
    getPluginCookie = () => {
        try {
            console.log(this.props);
            const plugin = JSON
                .parse(Array(localStorage.getItem('state')))
                .find(plugin => plugin._id === this.props.match.params.id);
            if (plugin === null) {
                return undefined;
            }
            return plugin;
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const plugin = this.getPluginCookie();
        let tags = plugin.tag.map((element, index) => {
            return <Link to="#" key={index} className="tag">{element.text}</Link>
        })
        let parametres = plugin.parametres.map((element, index) => {
            return (
                <tr key={index} className="parametre-row">
                    <td>{element.controler}</td>
                    <td>{element.default}</td>
                    <td>{element.min}</td>
                    <td>{element.max}</td>
                </tr>
            )

        })
        return (
            <div className="detail-body">
                <div className="main-box flex-column">
                    <div className="venteur flex-column">
                        <span className="font-weight-7 sellor">{plugin.sellerName}</span>
                        <span>{plugin.siteSellerUrl}</span>
                    </div>
                    <h2 className="font-weight-7 creator">{plugin.creator}</h2>
                    <img className="plugin-image" src={plugin.imageUrl} alt=''></img>
                    <div className="tags-container">{tags}</div>
                    <p className="desc">{plugin.description}</p>
                    <table className="parametre-table">
                        <thead>
                            <tr>
                                <th>Control</th>
                                <th>Default</th>
                                <th>Min</th>
                                <th>Max</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parametres}
                        </tbody>
                    </table>
                </div>
            </div>


        );
    }
}
export default PluginDetail;