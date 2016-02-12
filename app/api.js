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
    getInitialState: function() {
        return {
            documents: '',
            scope: '',
            requirements: '',
            deadlines: '',
            pricing: ''
        };
    },
    componentDidMount: function() {
        this.serverRequest = $.get(this.props.source, function (result) {
            var res = result;
            //var documents = res.documents;
            var docs = res.docs;
            var scope = res.scope;
            //var req = res.requirements;
            //var dl = res.deadlines;
            //var price = res.pricing;
            var contacts = res.contacts;
            window.loc = res.id;
            //var docHTML = "";
            var docsHTML = '<tr class="bg-brand"><td>Документ</td><td>Сроки</td><td>Цены</td><td>Необходимые докуметы</td></tr>';
            var scopeHTML ="";
            //var reqHTML = '<tr class="bg-brand"><td>Для</td><td>Перечень</td></tr>';
            //var dlHTML = '<tr class="bg-brand"><td>Документ</td><td>Сроки</td></tr>';
            //var priceHTML ='<tr class="bg-brand"><td>Документ</td><td>Стоимость</td></tr>';
            var contactsHTML = '<tr class="bg-brand"><td>Имя</td><td>Телефон</td><td>Электронная почта</td></tr>';
            var i = 0;
            var j = 0;
            /*for (i=0; i<documents.length; i++) {
                docHTML += '<tr><td>'+ documents[i].type+'</td></tr>';
            }*/
            for (i=0; i<docs.length; i++) {
                var reqsHTML ="";
                for (j=0; j<docs[i].req.length; j++) {
                    reqsHTML += '<tr><td>' + docs[i].req[j].type +  '</td><td>' + docs[i].req[j].desc + '</td></tr>';
                }
                docsHTML += '<tr><td>' + docs[i].name + '</td><td>' + docs[i].time + '</td><td>' + docs[i].price + '</td><td>' + reqsHTML + '</td></tr>';

            }
            for (i=0; i<scope.length; i++) {
                scopeHTML += '<tr><td>'+ scope[i].document + '</td></tr>';
            }
            /*for (i=0; i<req.length; i++) {
                reqHTML += '<tr><td>' + req[i].type + '</td><td>' + req[i].desc + '</td></tr>';
            }
            for (i=0; i<dl.length; i++) {
                dlHTML += '<tr><td>'+ dl[i].doc + '</td><td>' + dl[i].deadline + '</td></tr>';
            }
            for (i=0; i<price.length; i++) {
                priceHTML += '<tr><td>' + price[i].doc + '</td><td>' + price[i].price + '</td></tr>';
            }*/
            for (i=0; i<contacts.length; i++) {
                contactsHTML += '<tr><td>' + contacts[i].name + '</td><td>' + contacts[i].phone + '</td><td>' + contacts[i].email + '</td></tr>';
            }
            this.setState({
                docs: docsHTML,
                scope: scopeHTML,
                /*requirements: reqHTML,
                deadlines: dlHTML,
                pricing: priceHTML,*/
                contacts: contactsHTML
            });
        }.bind(this));
    },
    rawMarkup: function(val) {
        return { __html: val };
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function(){
            return (
                <div className="col-sm-11" id="app-content-window">
                <div className="row">

                    <div className="col-sm-6">
                        <h4 className="text-sm-center">Область сертификации</h4>
                        <table className="table table-bordered" dangerouslySetInnerHTML={this.rawMarkup(this.state.scope)}></table>
                    </div>
                    <div className="col-sm-6">
                        <h4 className="text-sm-center">Контакты</h4>
                        <table className="table table-bordered" dangerouslySetInnerHTML={this.rawMarkup(this.state.contacts)}></table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-sm-center">Документы</h4>
                        <table className="table table-bordered" dangerouslySetInnerHTML={this.rawMarkup(this.state.docs)}></table>
                    </div>
                </div>
            </div>
            );
    }
});
//---------------------- APP EDIT -----------------------------------------------------------------------

var AppContentWindowEdit = React.createClass({
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
                    <AppContentWindow source={this.props.current}/>
                </div>
            );
        }
        if(this.props.st == "edit") {
            return (
                <div className="row" id="app-content">
                    <AppContentHeader header={this.props.location}/>
                    <AppContentMenuEdit />
                    <AppContentWindowEdit source={this.props.current}/>
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
ReactDOM.render(
    <NavBar location={window.loc}/>,
    document.getElementById('navbar')
);
ReactDOM.render(
    <SearchBar />,
    document.getElementById('searchbar')
);

//-------------------------------- ROUTES ------------------------------------------------------------------
window.spc = 'none';
routie({
    '/agent/:id': function(id) {
        window.spc = 'agent'+id;
        var endPoint = 'http://afpub.cloudapp.net/agents/'+id;
        ReactDOM.render(
            <Application current={endPoint} location={window.loc} st="view"/>,
            document.getElementById('application')
        );
    },
    '/agents': function() {
        window.spc = 'list';
    },
    '/agent/:id/:operation': function(id, operation) {
        window.spc = 'agent/ '+id+ '/ ' + operation;
        var endPoint = 'http://afpub.cloudapp.net/agents/'+id;
        if (operation == "edit") {
            ReactDOM.render(
                <Application current={endPoint} location={window.loc} st={operation}/>,
                document.getElementById('application')
            );
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