// NAVIGATION
var NavBar = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-full navbar-light bg-inverse app">
                <a href="/"><img src="img/logo-b.svg" /></a>
                <ul className="nav navbar-nav pull-sm-right">
                    <li className="nav-item active">
                        <a className="nav-link" id="hdl" href="#" ref="headerLoc">{this.props.location}</a>
                    </li>
                </ul>
            </nav>
        );
    }
});

var SearchBar = React.createClass({
    render: function(){
        return (
            <div className="row" id="app-main">
                <div className="col-sm-6 col-sm-offset-3 text-sm-center">
                    <input type="text" id="search" className="sinput" placeholder="Введите запрос в это поле" />
                </div>
            </div>
        );
    }
});

var AppContentHeader = React.createClass({
    render: function(){
        return (
            <div className="col-sm-12" id="app-content-header">
                <h2 id="app-content-h" className="text-sm-center" ref="appLoc">{this.props.header}</h2>
            </div>
        );
    }
});

var AppContentMenu = React.createClass({
    render: function(){
        return (
            <div className="col-sm-1 text-sm-center" id="app-content-menu">
                <a href="#"><img className="ico" src="img/ico/edit.svg" /></a>
            </div>
        );
    }
});
var AppContentMenuEdit = React.createClass({
    render: function(){
        return (
            <div className="col-sm-1 text-sm-center" id="app-content-menu">
                <a href="#"><img className="ico" src="img/ico/save.svg" /></a>
            </div>
        );
    }
});

var AppContentWindow = React.createClass({
    rndReq: function(req) {
        req.map(function(result) {
            return <tr key={result.id}><td>{result.type}</td><td>{result.desc}</td></tr>;
        });
    },
    render: function(){
        var that = this;
        return (
            <div className="col-sm-11" id="app-content-window">
                <div className="row">

                    <div className="col-sm-6">
                        <h4 className="text-sm-center">Область сертификации</h4>
                        <table className="table table-bordered">
                            {this.props.data.scope.map(function(result) {
                                return <tr key={result.id}><td>{result.document}</td></tr>;
                            })}
                        </table>
                    </div>
                    <div className="col-sm-6">
                        <h4 className="text-sm-center">Контакты</h4>
                        <table className="table table-bordered">
                            <tr className="bg-brand">
                                <td>Имя</td>
                                <td>Телефон</td>
                                <td>Электронная почта</td>
                            </tr>
                            {this.props.data.contacts.map(function(result) {
                                return <tr key={result.id}><td>{result.name}</td><td>{result.phone}</td><td>{result.email}</td></tr>;
                            })}
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-sm-center">Документы</h4>
                        <table className="table table-bordered">
                            <tr className="bg-brand">
                                <td>Документ</td>
                                <td>Сроки</td>
                                <td>Цены</td>
                                <td>Необходимые докуметы</td>
                            </tr>
                            {
                                this.props.data.docs.map(function(result) {
                                var x = that.rndReq(result.req);
                                return <tr key={result.id}><td>{result.name}</td><td>{result.time}</td><td>{result.price}</td><td>{x}</td></tr>;
                            })}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});
//---------------------- APP EDIT -----------------------------------------------------------------------

var AppContentWindowEdit = React.createClass({
    rndReqInputs: function(req) {
        req.map(function(result) {
            return (
                    <tr>
                        <td><input className="form-control" type="text" value={result.type}/></td>
                        <td><input className="form-control" type="text" value={result.desc}/></td>
                    </tr>
            );
        });
    },
    render: function(){
        var that = this;
        return (
            <div className="col-sm-11" id="app-content-window">
                <div className="row">
                    <div className="col-sm-6">
                        <h4 className="text-sm-center">Область сертификации</h4>
                        <table className="table table-bordered scopeEdit">
                            {this.props.data.scope.map(function(result) {
                                return <tr className="input-scope" key={result.id}><td><input data-id={result._id} className="form-control" type="text" value={result.document}/></td></tr>;
                            })}
                            <tr className="input-scope"><td><input id="scope-append-1" className="form-control" type="text" /></td></tr>
                            <tr className="input-scope"><td><input id="scope-append-2" className="form-control" type="text" /></td></tr>
                            <tr className="input-scope"><td><input id="scope-append-3" className="form-control" type="text" /></td></tr>
                            <tr className="input-scope"><td><input id="scope-append-4" className="form-control" type="text" /></td></tr>
                            <tr className="input-scope"><td><input id="scope-append-5" className="form-control" type="text" /></td></tr>
                        </table>
                    </div>
                    <div className="col-sm-6">
                        <h4 className="text-sm-center">Контакты</h4>
                        <table className="table table-bordered">
                            <tr className="bg-brand">
                                <td>Имя</td>
                                <td>Телефон</td>
                                <td>Электронная почта</td>
                            </tr>
                            {this.props.data.contacts.map(function(result) {
                                return <tr key={result.id} className="input-contact"><td><input data-id={result._id} className="form-control" type="text" value={result.name}/></td><td><input data-id={result._id} className="form-control" type="text" value={result.phone}/></td><td><input data-id={result._id} className="form-control" type="text" value={result.email}/></td></tr>;
                            })}
                            <tr className="input-contact">
                                <td><input id="contact-append-1-1" className="form-control" type="text" /></td>
                                <td><input id="contact-append-1-2" className="form-control" type="text" /></td>
                                <td><input id="contact-append-1-3" className="form-control" type="text" /></td>
                            </tr>
                            <tr className="input-contact">
                                <td><input id="contact-append-2-1" className="form-control" type="text" /></td>
                                <td><input id="contact-append-2-2" className="form-control" type="text" /></td>
                                <td><input id="contact-append-2-3" className="form-control" type="text" /></td>
                            </tr>
                            <tr className="input-contact">
                                <td><input id="contact-append-3-1" className="form-control" type="text" /></td>
                                <td><input id="contact-append-3-2" className="form-control" type="text" /></td>
                                <td><input id="contact-append-3-3" className="form-control" type="text" /></td>
                            </tr>
                            <tr className="input-contact">
                                <td><input id="contact-append-4-1" className="form-control" type="text" /></td>
                                <td><input id="contact-append-4-2" className="form-control" type="text" /></td>
                                <td><input id="contact-append-4-3" className="form-control" type="text" /></td>
                            </tr>
                            <tr className="input-contact">
                                <td><input id="contact-append-5-1" className="form-control" type="text" /></td>
                                <td><input id="contact-append-5-2" className="form-control" type="text" /></td>
                                <td><input id="contact-append-5-3" className="form-control" type="text" /></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-sm-center">Документы</h4>
                        <table className="table table-bordered">
                            <tr className="bg-brand">
                                <td>Документ</td>
                                <td>Сроки</td>
                                <td>Цены</td>
                                <td>Необходимые докуметы</td>
                            </tr>
                            {
                                this.props.data.docs.map(function(result) {
                                    var x = that.rndReqInputs(result.req);
                                    return (
                                        <tr key={result.id}>
                                            <td><input data-id={result._id} className="form-control" type="text" value={result.name}/></td>
                                            <td><input data-id={result._id} className="form-control" type="text" value={result.time}/></td>
                                            <td><input data-id={result._id} className="form-control" type="text" value={result.price}/></td>
                                            <td className="input-reqs">
                                                <table className="table table-bordered" key={result.id}>
                                                    <tr className="bg-brand">
                                                        <td>Документ</td>
                                                        <td>Описание</td>
                                                    </tr>
                                                    {x}
                                                    <tr>
                                                        <td><input className="form-control" type="text" /></td>
                                                        <td><input className="form-control" type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input className="form-control" type="text" /></td>
                                                        <td><input className="form-control" type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input className="form-control" type="text" /></td>
                                                        <td><input className="form-control" type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input className="form-control" type="text" /></td>
                                                        <td><input className="form-control" type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input className="form-control" type="text" /></td>
                                                        <td><input className="form-control" type="text" /></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    );
                                })}
                            <tr>
                                <td><input id="doc-append-1-1" className="form-control" type="text" /></td>
                                <td><input id="doc-append-1-2" className="form-control" type="text" /></td>
                                <td><input id="doc-append-1-3" className="form-control" type="text" /></td>
                                <td className="input-reqs">
                                    <table className="table table-bordered">
                                        <tr className="bg-brand">
                                            <td>Документ</td>
                                            <td>Описание</td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td><input id="doc-append-2-1" className="form-control" type="text" /></td>
                                <td><input id="doc-append-2-2" className="form-control" type="text" /></td>
                                <td><input id="doc-append-2-3" className="form-control" type="text" /></td>
                                <td className="input-reqs">
                                    <table className="table table-bordered">
                                        <tr className="bg-brand">
                                            <td>Документ</td>
                                            <td>Описание</td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td><input id="doc-append-3-1" className="form-control" type="text" /></td>
                                <td><input id="doc-append-3-2" className="form-control" type="text" /></td>
                                <td><input id="doc-append-3-3" className="form-control" type="text" /></td>
                                <td className="input-reqs">
                                    <table className="table table-bordered">
                                        <tr className="bg-brand">
                                            <td>Документ</td>
                                            <td>Описание</td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td><input id="doc-append-4-1" className="form-control" type="text" /></td>
                                <td><input id="doc-append-4-2" className="form-control" type="text" /></td>
                                <td><input id="doc-append-4-3" className="form-control" type="text" /></td>
                                <td className="input-reqs">
                                    <table className="table table-bordered">
                                        <tr className="bg-brand">
                                            <td>Документ</td>
                                            <td>Описание</td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td><input id="doc-append-5-1" className="form-control" type="text" /></td>
                                <td><input id="doc-append-5-2" className="form-control" type="text" /></td>
                                <td><input id="doc-append-5-3" className="form-control" type="text" /></td>
                                <td className="input-reqs">
                                    <table className="table table-bordered">
                                        <tr className="bg-brand">
                                            <td>Документ</td>
                                            <td>Описание</td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td><input className="form-control" type="text" /></td>
                                            <td><input className="form-control" type="text" /></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});
var AppContentWindowNew = React.createClass({
    submitNew: function(event) {

    },
    rawMarkup: function(val) {
        return { __html: val };
    },
    /*generateInputs: function(count, cls, idg) {
     var i = 0;
     var outHTML = "";
     for (i=0; i<count; i++) {
     outHTML += '<input type="text" id="'+ idg + i +'" class="'+ cls +'"/>';
     }
     return outHTML;
     },*/
    generateTable: function(cols,rows,cls,idg) {
        var i =0;
        var j= 0;
        var xHTML ="";
        for (i=0; i<rows; i++) {
            var pre = '<tr>';
            for (j=0; j<cols; j++) {
                pre += '<td>' + '<input type="text" id="'+ idg + i +'" class="'+ cls +'"/>'  + '</td>';
            }
            xHTML += pre + '</tr>';
        }
        return xHTML;
    },
    render: function(){
        return (
            <div className="col-sm-11" id="app-content-window">
                <div className="row">
                    <div className="col-sm-6">
                        <h4 className="text-sm-center">Область сертификации</h4>
                        <table className="table table-bordered" dangerouslySetInnerHTML={this.rawMarkup('' + this.generateTable(1,5,"form-control","cert-scope-"))}></table>
                    </div>
                    <div className="col-sm-6">
                        <h4 className="text-sm-center">Контакты</h4>
                        <table className="table table-bordered" dangerouslySetInnerHTML={this.rawMarkup('<tr class="bg-brand"><td>Имя</td><td>Телефон</td><td>Электронная почта</td></tr>' + this.generateTable(3,5,"form-control","cert-contacts-"))}></table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-sm-center">Документы</h4>
                        <table className="table table-bordered" dangerouslySetInnerHTML={this.rawMarkup('<tr class="bg-brand"><td>Документ</td><td>Сроки</td><td>Цены</td><td>Необходимые докуметы</td></tr>' + this.generateTable(4,5,"form-control","cert-docs-"))}></table>
                    </div>
                </div>
            </div>
        );
    }
});

// -------------------------- APP COMPONENT ---------------------------------------------------------------

var Application = React.createClass({
    render: function(){
        if (this.props.st == "view") {
            return (
                <div className="row" id="app-content">
                    <AppContentHeader header={this.props.location}/>
                    <AppContentMenu />
                    <AppContentWindow data={this.props.data}/>
                </div>
            );
        }
        if(this.props.st == "edit") {
            return (
                <div className="row" id="app-content">
                    <AppContentHeader header={this.props.location}/>
                    <AppContentMenuEdit />
                    <AppContentWindowEdit data={this.props.data}/>
                </div>
            );
        }
        if(this.props.st == "new") {
            return (
                <div className="row" id="app-content">
                    <AppContentHeader header={this.props.location}/>
                    <AppContentMenuEdit />
                    <AppContentWindowNew source={this.props.current}/>
                </div>
            );
        }
    }
});

// ---------------------------------------- RENDERING -----------------------------------------------------
//-- APP ---
/*
 ReactDOM.render(
 <Application current="http://afpub.cloudapp.net/agents/56bc8039e9ec2838f9abc6ab" location={window.loc} st="edit"/>,
 document.getElementById('application')
 );
 */
// -- BARS ------
/*
ReactDOM.render(
    <NavBar location={window.loc}/>,
    document.getElementById('navbar')
);
ReactDOM.render(
    <SearchBar />,
    document.getElementById('searchbar')
);
*/
//-------------------------------- ROUTES ------------------------------------------------------------------
window.spc = 'none';
var locBase = '';
routie({
    '/agent/:id': function(id) {
        var endPoint = 'http://afpub.cloudapp.net/agents/'+id;
        $.get(endPoint, function(data) {
            var agentName = data.id;
            var location = locBase + 'ПОСТАВЩИКИ/' + agentName;
            ReactDOM.render(
                <NavBar location={location}/>,
                document.getElementById('navbar')
            );
            ReactDOM.render(
                <SearchBar />,
                document.getElementById('searchbar')
            );
            ReactDOM.render(
                <Application data={data} location={location} st="view"/>,
                document.getElementById('application')
            );
        })
    },
    '/agents': function() {
        window.spc = 'list';
    },
    '/agent/:id/:operation': function(id, operation) {
        window.spc = 'agent/ '+id+ '/ ' + operation;
        var endPoint = 'http://afpub.cloudapp.net/agents/'+id;
        if (operation == "edit") {
            $.get(endPoint, function(data) {
                var agentName = data.id;
                var location = locBase + 'ПОСТАВЩИКИ/' + agentName;
                ReactDOM.render(
                    <NavBar location={location}/>,
                    document.getElementById('navbar')
                );
                ReactDOM.render(
                    <SearchBar />,
                    document.getElementById('searchbar')
                );
                ReactDOM.render(
                    <Application data={data} location={location} st={operation}/>,
                    document.getElementById('application')
                );
            })
        }
    },
    '/agent/new': function () {
        var endPoint = 'http://afpub.cloudapp.net/agents/';
        ReactDOM.render(
            <Application current={endPoint} location={window.loc} st="new"/>,
            document.getElementById('application')
        );
    }
});