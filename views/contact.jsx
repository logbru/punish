const React = require('react')
const Page = require('./layouts/page.jsx')


const Contact = props => {
  return (
    <Page>
      <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="col-sm-6 mx-auto">
          <div className="row">
            <div className="col-4">
              <img src="./assets/images/logo_white.svg" alt="Puni.sh" className="punish" />
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="col-8">
              <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/">Boosting</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/faq">FAQ</a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link" href="/contact">Contact Us <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">About</a>
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <button type="button" className="btn btn-warning" id="members">Members</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-5 mb-5">
            <h3 className="text-muted">
              Contact Us
            </h3>
            <h6 className="text-muted">If you have any questions or concerns please feel free to contact us.</h6>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1" className="text-muted">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="name" className="text-muted">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter your name"/>
              </div>
              <div class="form-group">
                <label for="ordernumber" className="text-muted">Order Number (optional)</label>
                <input type="text" class="form-control" id="ordernumber" placeholder="Ex. 1234567891"/>
              </div>
              <div class="form-group">
                <label for="msg" className="text-muted">Message</label>
                <textarea class="form-control" id="msg" rows="3"></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12"><div className="spacer"></div></div>
        </div>
      </div>
    </Page >
  )
}

module.exports = Contact
