const React = require('react')
const Html = require('./layouts/default.jsx')


const Home = props => {
  return (
    <Html>
      <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="col-sm-6 mx-auto">
          <div className="row">
            <div className="col-4">
              <img src="./assets/images/logo_white.svg" alt="Puni.sh" className="punish"/>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="col-8">
              <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Boosting <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">FAQ</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Contact Us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
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
      <div className="toast float-right" id="notSelectedToast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000">
        <div className="toast-header">
          <strong className="mr-auto">You need to select an account before pricing or ordering a boost.</strong>
          <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          Search for an account and click "This is my account".
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h1 className="text-muted">Create a boost package</h1>
            <br/>
            <div id="alerts">

            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-primary mb-3">
              <div className="card-header">Account</div>
              <div className="card-body">
                {/* <h4 className="card-title">Primary card title</h4> */}
                <div className="row">
                  <div className="col-sm-4">
                    <form className="needs-validate">
                      <div className="form-group">
                        <label htmlFor="lolUsername">Username</label>
                        <input type="text" className="form-control" id="lolUsername" placeholder="Enter your username" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lolRegion">Region/Server</label>
                        <select className="form-control" id="lolRegion">
                          <option value="br">Brazil (BR)</option>
                          <option value="eune">Europe (EUNE)</option>
                          <option value="euw" selected>Europe West (EUW)</option>
                          <option value="jp">Japan (JP)</option>
                          <option value="kr">Korea (kr)</option>
                          <option value="lan">Latin America North (LAN)</option>
                          <option value="las">Latin America South (LAS)</option>
                          <option value="na">North America (NA)</option>
                          <option value="oce">Oceania (OCE)</option>
                          <option value="ru">Russia (RU)</option>
                          <option value="tr">Turkey (TR)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-success float-right" id="search">Search</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-sm-1"></div>
                  <div className="col-sm-7">
                    <div className="spin"></div>
                    <div id="accountInfo" className="account">
                      <div className="row">
                        <div className="col-sm-4">
                          <img src="./assets/images/blank.png" alt="Profile Icon" className="img-thumbnail thumb" id="profileIcon" />
                          <h4 id="accName" className="text-muted mt-3 ml-2"></h4>
                          <h5 id="accLevel" className="text-muted mt-1 ml-2"></h5>
                        </div>
                        <div className="col-sm-8">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col"></th>
                                <th scope="col">Tier</th>
                                <th scope="col">Division</th>
                                <th scope="col">LP</th>
                              </tr>
                            </thead>
                            <tbody id="tiers">

                            </tbody>
                          </table>
                          <button type="button" className="btn btn-success float-right" id="selectAccount">This is my account</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 ">
          <div className="col-sm-4">
            <div className="card border-primary mb-3 maincard">
              <div className="card-header">Type</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="btn-group btn-group-toggle mt-2 ml-4" data-toggle="buttons">
                      <label className="btn btn-primary">
                        <input type="radio" name="options" id="winsBoost" autocomplete="off" checked /> Ranked Wins Boost
                          </label>
                      <label className="btn btn-primary">
                        <input type="radio" name="options" id="leagueBoost" autocomplete="off" /> Division Boost
                          </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card border-primary mb-3 maincard">
              <div className="card-header">Options</div>
              <div className="card-body">
                {/* Content */}
                <div id="wins">
                  <div className="row">
                    <div className="col-12">
                      <div className="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                        <label className="btn btn-primary">
                          <input type="radio" name="options" id="soloWins" autocomplete="off" checked /> Solo/Duo
                                </label>
                        <label className="btn btn-primary">
                          <input type="radio" name="options" id="flexWins" autocomplete="off" /> Flex 5v5
                                </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <form>
                        <fieldset className="form-group">
                          <span><legend className="text-muted">Number of Wins: <span id="winCount" className="badge badge-success ml-5">1</span></legend> </span>
                          <input type="range" className="custom-range" min="1" max="10" value="1" id="winSlider" />
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
                <div id="league">
                  <div className="row">
                    <div className="col-12">
                      <div className="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                        <label className="btn btn-primary">
                          <input type="radio" name="options" id="soloLeague" autocomplete="off" checked /> Solo/Duo
                                </label>
                        <label className="btn btn-primary">
                          <input type="radio" name="options" id="flexLeague" autocomplete="off" /> Flex 5v5
                                </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <form>
                        <div className="form-group">
                          <label for="desiredTier">Desired Tier</label>
                          <select className="form-control" id="desiredTier">

                          </select>
                        </div>
                        <div className="form-group">
                          <label for="desiredDivision" id="divLabel">Desired Division</label>
                          <select className="form-control" id="desiredDivision">

                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card border-primary mb-3 maincard">
              <div className="card-header">Price</div>
              <div className="card-body">
                {/* Content */}
                <div className="row">
                  <div className="col-sm-6">
                    <form>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customChampions" />
                          <label className="custom-control-label" for="customChampions">Custom Champions (+0% Cost)</label>
                        </div>
                      </div>
                      <h2 className="text-success" id="priceCalculation">€0</h2>
                      {/* <button type="button" className="btn btn-warning" id="priceCalculate">Calculate</button> */}
                      <div id="formError">
                        <p className="text-danger">Invalid form options. Desired tier is lower than current tier.</p>
                      </div>
                    </form>
                  </div>
                  <div className="col-sm-6 mx-auto">
                    <button type="button" id="orderBoost" className="btn btn-success btn-lg mt-4">Boost Me</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12" id="cChamps">
            <div className="card border-primary mb-3">
              <div className="card-header">Custom Champions and Roles</div>
              <div className="card-body">
                {/* Content */}
                <div className="row">
                  <div className="col-12">
                    <h4 className="text-muted mt-3">Select Roles</h4>
                    <hr className="my-4" />
                    <div className="row">
                      <div className="col-sm-1"></div>
                      <div className="col-sm-2 text-center">
                        <h5 className="text-muted">Top Lane</h5>
                        <img src="./assets/images/top.png" alt="Top Lane" className="img-thumbnail thumb mb-3"/>
                        <input type="checkbox" id="toplane"/>
                      </div>
                      <div className="col-sm-2 text-center">
                        <h5 className="text-muted">Mid Lane</h5>
                        <img src="./assets/images/mid.png" alt="Mid Lane" className="img-thumbnail thumb mb-3" />
                        <input type="checkbox" id="midlane" />
                      </div>
                      <div className="col-sm-2 text-center">
                        <h5 className="text-muted">Marksman</h5>
                        <img src="./assets/images/marksman.png" alt="Marksman" className="img-thumbnail thumb mb-3" />
                        <input type="checkbox" id="marksman" />
                      </div>
                      <div className="col-sm-2 text-center">
                        <h5 className="text-muted">Jungle</h5>
                        <img src="./assets/images/jungle.png" alt="Jungle" className="img-thumbnail thumb mb-3" />
                        <input type="checkbox" id="jungle" />
                      </div>
                      <div className="col-sm-2 text-center">
                        <h5 className="text-muted">Support</h5>
                        <img src="./assets/images/suport.png" alt="Support" className="img-thumbnail thumb mb-3" />
                        <input type="checkbox" id="support" />
                      </div>
                      <div className="col-sm-1">
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                  <div className="col-12">
                    <form>
                      <div className="form-group">
                        <label htmlFor="champSearch">Select Champions</label>
                        <input type="text" className="form-control ml-5" id="champSearch" placeholder="Enter champion name" />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mx-auto">
                    <h4 className="text-muted mt-3">Selected Champions</h4>
                    <hr className="my-4" />
                    <div className="row" id="championStream">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" id="orderSentModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderTitle">Order Sent - (#)</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p id="orderMsg"></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Html >
  )
}

module.exports = Home
