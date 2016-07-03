var LoginBox = React.createClass({
  render : function () {
    return (
<div className="loginBox">
          <header className="col-xs-12 text-center">
            <img src="/resources/img/logo.jpg"/ className="img img-responsive login-logo">
          </header>
          <article className="col-xs-12  login-fields">
              <fieldset className="form-group">
                <input className="form-control" type="text" name="username" id="username" placeholder="Usuario"/>

              </fieldset>
              <fieldset className="form-group">
                <input className="form-control" type="password" name="password" id="password" placeholder="Senha" />
              </fieldset>

              <p className="error" id="error"></p>

              <button className="form-control" type="submit" value="Login" />

          </article>
        </div>
    );
 
  }
});


ReactDOM.render(<LoginBox />,
  document.getElementById("render-here");
);
     
