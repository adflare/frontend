//var React = require('react');

var NavBar = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-full navbar-light bg-inverse app">
                <a href="/"><img src="img/logo-b.svg" /></a>
                <ul className="nav navbar-nav pull-sm-right">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">{this.props.location}</a>
                    </li>
                </ul>
            </nav>
        );
    }
});

